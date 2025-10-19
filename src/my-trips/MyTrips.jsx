import { useAuth0 } from "@auth0/auth0-react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { db } from "../service/firebase";

function MyTrips() {
  const { user, isAuthenticated, loginWithRedirect, isLoading } = useAuth0();

  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  // State to handle loading indicator while fetching trips
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoading) return; // Wait for Auth0 to finish loading
    if (!isAuthenticated) {
      loginWithRedirect();
      return;
    }
    fetchUserTrips();
  }, [isAuthenticated, isLoading]);

  const fetchUserTrips = async () => {
    try {
      const tripRef = collection(db, "trips");

      //we are sending a query to make a object that fetches trips based on the user id
      const q = query(
        tripRef,
        where("userId", "==", user.sub),
        orderBy("createdAt", "desc") // order by creation time descending
      );

      // Execute the query, i.e fetches all mmatched document from query q
      const querySnapshot = await getDocs(q);

      const userTrip = [];
      querySnapshot.forEach((doc) => {
        userTrip.push({ id: doc.id, ...doc.data() });
        //doc.id is the unique firestore id
        //doc.data() is he actual data of the trip (desitination, budget, etc..)
      });
      setTrips(userTrip);
    } catch (err) {
      console.error("Error fetching trips: ", err);
      toast.error("Failed to load trips 😔");
    } finally {
      // Stop loading indicator
      setLoading(false);
    }
  };
  // Show loading message while trips are being fetched
  if (loading) {
    return (
      <div className="text-center mt-20 text-xl">Loading your trips...</div>
    );
  }

  // Show message if user has no trips
  if (trips.length === 0) {
    return (
      <div className="text-center mt-20 text-xl">
        You have no trips yet. Create your first trip! 😃
      </div>
    );
  }
  // Render the list of trips
  return (
    <div className="px-4 sm:px-10 md:px-20 lg:px-32 py-10">
      <div className="flex justify-center items-center ">
        <h1
          style={{ fontSize: "32px" }}
          className="font-bold text-[#2b2d42] mb-6"
        >
          My Trips
        </h1>
      </div>

      {/* Grid to show trips in cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {trips.map((trip) => (
          <div
            key={trip.id}
            className="border border-gray-300 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
            onClick={() => navigate(`/view-trip/${trip.id}`)} // navigate to view-trip page on click
          >
            <div className="p-4">
              <h2 className="font-bold text-xl text-[#2b2d42]">
                {trip.destination}
              </h2>
              <p className="text-gray-600 mt-2">
                Duration: {trip.noOfDays} day{trip.noOfDays > 1 ? "s" : ""}
              </p>
              <p className="text-gray-600 mt-1">Budget: {trip.budget}</p>
              <p className="text-gray-600 mt-1">Travelers: {trip.travelers}</p>
              <p className="text-gray-400 text-sm mt-2">
                Created on: {trip.createdAt.toDate().toLocaleDateString()}{" "}
                {/* convert Firestore timestamp to readable date */}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default MyTrips;
