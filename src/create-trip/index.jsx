import React, { useState, useEffect } from "react";
import LocationSearch from "../components/custom/LocationSearch";
import { SelectBudget, SelectTravelerList } from "@/constants/options";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { generateTrip, getTripPrompt } from "@/service/AIModel";
import { useAuth0 } from "@auth0/auth0-react";
import { db } from "@/service/firebase";

import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    destination: "",
    noOfDays: "",
    budget: "",
    travelers: "",
  });
  const [formKey, setFormKey] = useState(0); //only for LocationSearch so that it rerenders when clear button is pressed
  const [tripPlan, setTripPlan] = useState("");
  const [loading, setLoading] = useState(false);

  const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();

  const [savedTripId, setSavedTripId] = useState(null);

  useEffect(() => {
    //this is so because after login the page re-redners and if user had filled any info in form, then he dont need to fill again
    if (isAuthenticated) {
      const savedForm = localStorage.getItem("tripFormData");
      if (savedForm) {
        setFormData(JSON.parse(savedForm));
      }
    }
  }, [isAuthenticated]);

  //Everytime value is changed or added in any of input of form we deal it with handleInputChange
  const handleInputChange = (name, value) => {
    const updatedData = {
      ...formData, //this stores the old data
      [name]: value, //for new data
    };
    setFormData(updatedData);
    localStorage.setItem("tripFormData", JSON.stringify(updatedData)); //as local storage can only store data in string format
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      localStorage.setItem("userData", JSON.stringify(user));
    }
  }, [isAuthenticated, user]);
  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);

  const clearForm = () => {
    setFormData({
      destination: "",
      noOfDays: "",
      budget: "",
      travelers: "",
    });
    setFormKey((prev) => prev + 1); //to clear LocationSearch, we increase the value of key as then the component will rerender
    localStorage.removeItem("tripFormData");
  };

  const OnGenerateTrip = async () => {
    const { destination, noOfDays, budget, travelers } = formData;

    if (isAuthenticated) {
      console.log(user);
    }
    if (!isAuthenticated) {
      console.log("User is not logged in:");

      loginWithRedirect(); //redirects user to login page
      return;
    }

    if (!destination || !noOfDays || !budget || !travelers) {
      toast.error(
        "Please fill in all the fields before generating your trip!🥺"
      );
      return;
    }

    if (noOfDays > 10) {
      toast.error("Number of days can't be more than 10!😠");
      return;
    }

    const toastId = toast.loading("Generating your trip plan...🎃");
    console.log("Generating trip with data:", formData);

    setLoading(true);

    try {
      const prompt = getTripPrompt(formData);
      const tripText = await generateTrip(prompt);

      let tripData = tripText;
      if (!tripData) {
        toast.error("AI returned invalid data 😔");
        setLoading(false);
        return;
      }

      setTripPlan(tripData);

      saveTripToFirebase(tripData); //will save all data to firebase
      console.log(tripData);

      toast.success("Trip generated successfully! 🥳", { id: toastId });
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate trip 😔", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  //SAVING DATA TO FIREBASE
  const saveTripToFirebase = async (tripData) => {
    if (!user) {
      toast.error("User not logged in, cannot save trip!");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "trips"), {
        userId: user.sub, // Auth0 user ID
        userName: user.name, // Auth0 user name
        destination: formData.destination,
        noOfDays: formData.noOfDays,
        budget: formData.budget,
        travelers: formData.travelers,
        tripPlan: tripData,
        createdAt: new Date(),
      });
      toast.success("Trip saved successfully to Firebase!");
      setSavedTripId(docRef.id);
    } catch (err) {
      console.error("Error saving trip: ", err);
      toast.error("Failed to save trip 😔");
    }
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 px-5 mt-10">
      <Toaster position="top-right" />;
      <h2 className="font-bold text-3xl text-[#2b2d42]">
        Tell us about your travel preferences
      </h2>
      <p className="mt-3 text-[#2b2d42] text-xl">
        Just provide us basic information and our trip planner will generate a
        customized plan based on your preferences 😋
      </p>
      <div className="mt-16">
        <h2 className="font-bold text-xl my-3 text-[#2b2d42]">
          What is destination of your choice?
        </h2>

        <LocationSearch
          key={formKey}
          value={formData.destination || ""}
          onSelect={(value) => {
            handleInputChange("destination", value);
          }}
          className="w-full"
        />
        <h2 className="font-bold text-xl my-3 text-[#2b2d42] mt-7">
          How many days is your trip?
        </h2>
        <input
          value={formData.noOfDays || ""}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e63946]"
          type="number"
          placeholder="Enter number of days"
          //onchange is triggered whenever the element is changed
          onChange={(e) => {
            handleInputChange("noOfDays", e.target.value);
          }}
        />
        <h2 className="font-bold text-xl my-3 text-[#2b2d42] mt-7">
          What is your budget?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          {SelectBudget.map((item) => (
            <div
              key={item.id}
              //onlclik triggers the arrow function when the element is triggered
              onClick={() => handleInputChange("budget", item.label)}
              className={`p-4 border border-gray-300 rounded-lg hover:shadow-xl hover:border-gray-500 cursor-pointer
        ${
          formData?.budget === item.label
            ? "shadow-lg border-black bg-[#ffe6e6]"
            : ""
        }`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg text-[#2b2d42]">{item.label}</h2>
              <h2 className="text-[#2b2d42]">{item.description}</h2>
            </div>
          ))}
        </div>

        {/* SelectTravelerList */}
        <h2 className="font-bold text-xl my-3 text-[#2b2d42] mt-7">
          Who do you plan to travel with ?
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          {SelectTravelerList.map((item, index) => (
            <div
              key={item.id}
              onClick={() => handleInputChange("travelers", item.label)}
              className={`p-4 border border-gray-300 rounded-lg hover:shadow-xl hover:border-gray-500 cursor-pointer
        ${
          formData?.travelers === item.label
            ? "shadow-lg border-black bg-[#ffe6e6]"
            : ""
        }`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg text-[#2b2d42]">{item.label}</h2>
              <h2 className="text-[#2b2d42]">{item.description}</h2>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="mt-12 flex justify-center">
          <Button
            onClick={clearForm}
            variant="secondary"
            className=" bg-[#2b2d42] w-30 text-white rounded-lg m-2 cursor-pointer mb-10"
          >
            Clear Form
          </Button>

          {/* <Button
            onClick={OnGenerateTrip}
            variant="secondary"
            className=" bg-[#e63946] w-30 text-white rounded-lg m-2 cursor-pointer mb-10"
          >
            Generate Trip
          </Button> */}
          {loading ? (
            <Button className=" bg-[#e63946] w-30 text-white rounded-lg m-2 cursor-pointer mb-10">
              Generating...
            </Button>
          ) : tripPlan && savedTripId ? (
            <Button
              className=" bg-[#e63946] w-30 text-white rounded-lg m-2 cursor-pointer mb-10"
              onClick={() => navigate("/view-trip/" + savedTripId)}
            >
              View Trips
            </Button>
          ) : (
            <Button
              className=" bg-[#e63946] w-30 text-white rounded-lg m-2 cursor-pointer mb-10"
              onClick={OnGenerateTrip}
              variant="secondary"
            >
              Generate Trip
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateTrip;
