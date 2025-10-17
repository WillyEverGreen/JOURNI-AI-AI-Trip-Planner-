import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { IoSend } from "react-icons/io5";
import { getPlacePhotoByText } from "@/service/GlobalApi";

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1000";

function InfoSection({ trip }) {
  const [photo, setPhoto] = useState(PLACEHOLDER_IMAGE);
  const [loadingPhoto, setLoadingPhoto] = useState(false);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      if (!trip?.destination) return;
      setLoadingPhoto(true);
      try {
        const url = await getPlacePhotoByText(trip.destination);
        if (mounted && url) setPhoto(url);
      } catch (e) {
        console.warn("Could not load place photo:", e);
      } finally {
        if (mounted) setLoadingPhoto(false);
      }
    };
    load();
    return () => (mounted = false);
  }, [trip]);

  // Show loading state while trip data is being fetched
  if (!trip) {
    return (
      <div className="w-full px-2 sm:px-4 md:px-10 lg:px-20 mx-auto">
        <div className="h-[340px] w-full bg-gray-200 animate-pulse rounded-xl"></div>
        <div className="my-5 flex flex-col gap-2">
          <div className="h-8 bg-gray-200 animate-pulse rounded w-1/3"></div>
          <div className="flex gap-2">
            <div className="h-6 bg-gray-200 animate-pulse rounded w-20"></div>
            <div className="h-6 bg-gray-200 animate-pulse rounded w-20"></div>
            <div className="h-6 bg-gray-200 animate-pulse rounded w-20"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-2 sm:px-4 md:px-10 lg:px-20 mx-auto">
      {/* Image */}
      <img
        src={photo}
        alt={trip.destination || "destination"}
        className="h-[340px] w-full object-cover rounded-xl"
      />

      <div className="flex items-center justify-between m">
        <div className="my-5 flex flex-col gap-2  w-full">
          <h2 className="text-[#2b2d42] font-bold text-3xl ">
            {trip.destination}
          </h2>
          {/* Badges + Send Button Row */}
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-700 text-xs md:text-sm flex-shrink-0">
              📅 {trip.noOfDays} Day
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-700  text-xs md:text-sm flex-shrink-0">
              💸 {trip.budget}
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-700  text-xs md:test-sm flex-shrink-0">
              🥂 {trip.travelers}
            </h2>

            {/* Send button aligned to the right */}
            <Button className="ml-auto bg-[#e63946] text-white p-2 rounded-full hover:bg-red-600 transition flex-shrink-0">
              <IoSend size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoSection;
