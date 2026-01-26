export const generateTripPrompt = ({
  destination,
  noOfDays,
  travelers,
  budget,
}) => {
  const isLongTrip = noOfDays > 5;
  return `
Create a ${noOfDays}-day trip plan to ${destination} for ${travelers} travelers with a ${budget} budget. 

IMPORTANT: 
1. You must generate an itinerary for EXACTLY ${noOfDays} days.
2. Each day must be its own object in the "days" array.
3. DO NOT include "imageUrl" fields.
4. Keep descriptions EXTREMELY concise${isLongTrip ? " (under 10 words per activity)" : ""}.
5. Provide EXACTLY 3 hotel recommendations in a root-level "hotels" array (NOT inside the days).

Please provide the output in JSON format only following this structure:

{
  "tripName": "String",
  "hotels": [
    {
      "name": "Hotel name",
      "rating": "Hotel rating",
      "priceRange": "Approximate price per night in Indian Rupees (₹)",
      "address": "Hotel address"
    }
  ],
  "days": [
    {
      "day": 1,
      "activities": [
        {
          "name": "Sightseeing spot or activity",
          "description": "Short description",
          "rating": "Average rating if available",
          "location": "Address or area",
          "time": "Must include time slot (e.g., 10:00 AM - 12:00 PM)",
          "timeToTravel": "Add travel time (e.g., '15 mins')"
        }
      ],
      "restaurants": [
        {
          "name": "Restaurant name",
          "cuisine": "Type of food",
          "rating": "Rating out of 5",
          "address": "Full address"
        }
      ]
    }
  ],
  "summary": "Short summary or tips for the trip"
}

Rules:
1. Every activity MUST have a "time" and "timeToTravel" field
2. Include 2-3 restaurants and 3 activities per day
3. You MUST generate all ${noOfDays} days. Do not truncate.
4. All hotel prices MUST be in Indian Rupees (₹).
5. ${isLongTrip ? "Since this is a long trip, keep the JSON as compact as possible." : ""}
`;
};
