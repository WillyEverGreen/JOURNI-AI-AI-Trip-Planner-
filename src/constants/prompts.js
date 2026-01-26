export const generateTripPrompt = ({
  destination,
  noOfDays,
  travelers,
  budget,
}) => `
Create a ${noOfDays}-day trip plan to ${destination} for ${travelers} travelers with a ${budget} budget. 

IMPORTANT: 
1. You MUST generate an itinerary for ALL ${noOfDays} days.
2. Each day must be a separate object in the "days" array.
3. DO NOT include "imageUrl" fields. The app handles images automatically.
4. Keep activity descriptions brief.
5. Provide 3 hotel recommendations in a root-level "hotels" array.

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
          "time": "Time slot (e.g., 10:00 AM - 12:00 PM)",
          "timeToTravel": "Travel time (e.g., '15 mins')"
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
1. Every activity MUST have "time" and "timeToTravel"
2. Include 2-3 restaurants and 3 activities per day
3. NEVER include comments, placeholders like "// ...", or extra text. Output RAW JSON only.
4. All hotel prices MUST be in Indian Rupees (₹).
`;
