import React from "react";
import PlaceImage from "./PlaceImage";

function PlaceCard({ activity }) {
  return (
    <div className=" border-1 rounded-xl p-3 m-2 shadow-xl flex gap-2 text-[#2b2d42]  hover:scale-105 transition-all">
      <div className="w-[130px] h-[130px] flex-shrink-0">
        <PlaceImage
          text={`${activity.name} ${activity.location || ""}`}
          alt={activity.name}
          className="w-[130px] h-[130px] rounded-xl object-cover"
        />
      </div>
      <div>
        <h2 className="font-bold text-lg">{activity.name}</h2>
        <p className="text-[#8d99ae] mb-1.5">{activity.description}</p>
        <span className=" text-[#2b2d42]">🕛{activity.timeToTravel}</span>
      </div>
    </div>
  );
}

export default PlaceCard;
