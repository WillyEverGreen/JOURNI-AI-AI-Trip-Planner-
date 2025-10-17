{
  /* <Route path="/view-trip/:tripid" element={<Viewtrip />} />
Here:

:tripid → is a route parameter (dynamic value).

If the user visits /view-trip/abc123, then tripid = "abc123". */
}

import { doc } from "firebase/firestore";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { db } from "@/service/firebase";
import { getDoc } from "firebase/firestore";
import { useState } from "react";
import InfoSection from "./components/infoSection";
import Hotels from "./components/Hotels";
import PlacesToVisit from "./components/PlacesToVisit";
import Footer from "./components/Footer";

function Viewtrip() {
  const { tripid } = useParams(); //extracts "tripid" from URL

  const [trip, setTrip] = useState(null);

  useEffect(() => {
    tripid && GetTripData();
  }, [tripid]);

  //to retrive the insformation from firebase
  const GetTripData = async () => {
    const docRef = doc(db, "trips", tripid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document: ", docSnap.data());
      setTrip(docSnap.data());
    } else {
      console.log("No document was found");
      toast.error("No trip found");
    }
  };

  return (
    <div className="w-full">
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32 py-6 sm:py-8 lg:py-12 mx-auto">
        {/* Information Section */}
        <InfoSection trip={trip} />
        {/* Recommended Hotels */}
        <Hotels trip={trip} />
        {/* Daily Plan */}
        <PlacesToVisit trip={trip} />
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default Viewtrip;
