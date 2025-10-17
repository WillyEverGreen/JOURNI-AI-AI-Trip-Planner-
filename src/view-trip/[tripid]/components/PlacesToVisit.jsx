import React from "react";
import PlaceCard from "./PlaceCard";

function PlacesToVisit({ trip }) {
  // Open place info page in Google Maps

  const days = trip?.tripPlan?.days || [];

  const handleNavigate = (location, name) => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${name}, ${location}`
    )}`;
    window.open(googleMapsUrl, "_blank");
  };

  return (
    <div className="w-full px-2 sm:px-4 md:px-10 lg:px-20 mx-auto ">
      <h2 className="font-bold text-xl mt-10 text-[#2b2d42] mb-5 ">
        Places To Visit
      </h2>
      <div>
        {days.map((item, index) => (
          <div key={index} className="mb-8">
            <h2 className="font-medium text-lg text-[#2b2d42]">
              Day: {item.day}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 ">
              {item.activities.map((activity, actIndex) => (
                <div
                  key={actIndex}
                  onClick={() =>
                    handleNavigate(activity.location, activity.name)
                  }
                  className="cursor-pointer"
                >
                  <h2 className="text-amber-600 font-bold"> {activity.time}</h2>
                  <div>
                    <PlaceCard activity={activity} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;
