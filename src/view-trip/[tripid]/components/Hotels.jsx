import React from "react";
import PlaceImage from "./PlaceImage";

const numbers = [1, 2, 3];

// // Using map
// const mapped = numbers.map(n => [n, n * 2]);
// console.log(mapped);
// // [[1, 2], [2, 4], [3, 6]]   → array of arrays

// // Using flatMap
// const flattened = numbers.flatMap(n => [n, n * 2]);
// console.log(flattened);
// // [1, 2, 2, 4, 3, 6]   → flattened into one array

function Hotels({ trip }) {
  // Collect all hotels from all days using flatMap
  const allHotels =
    trip?.tripPlan?.days?.flatMap((day) => day.hotels || []) || []; //as we always want allHotels to be an array therefore we use [];

  // Open hotel info page (prefer place_id if available)
  const handleNavigate = (address, name) => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${name}, ${address}`
    )}`;
    window.open(googleMapsUrl, "_blank");
  };

  return (
    <div className="w-full px-2 sm:px-4 md:px-10 lg:px-20 mx-auto ">
      <h2 className="font-bold text-xl mt-5 text-[#2b2d42] mb-3">
        Hotel Recommendation
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {allHotels.length > 0 &&
          allHotels.map((hotel, index) => (
            <div
              className="hover:scale-105 transition-all cursor-pointer  border border-gray-200 rounded-xl"
              key={index}
              onClick={() => handleNavigate(hotel?.address, hotel?.name)}
            >
              <div className="w-full h-44 overflow-hidden rounded-xl">
                <PlaceImage
                  text={`${hotel?.name} ${hotel?.address || ""}`}
                  alt={hotel?.name}
                  className="w-full h-44 object-cover"
                />
              </div>
              <div className=" m-2 ">
                <h2 className="font-bold text-[#2b2d42]">{hotel?.name}</h2>
                <h2 className="text-[#2b2d42] text-xs ">📍 {hotel?.address}</h2>
                <div className="flex justify-between">
                  <h2 className="text-[#2b2d42] text-sm">
                    💰{hotel?.priceRange}
                  </h2>
                  <h2 className="text-[#2b2d42] text-sm">⭐{hotel.rating}</h2>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Hotels;
