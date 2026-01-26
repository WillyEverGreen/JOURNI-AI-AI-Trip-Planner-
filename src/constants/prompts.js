export const generateTripPrompt = ({
  destination,
  noOfDays,
  travelers,
  budget,
}) => `
Create a ${noOfDays}-day trip plan to ${destination} for ${travelers} travelers with a ${budget} budget. 

IMPORTANT: 
1. You must generate an itinerary for EXACTLY ${noOfDays} days.
2. Each day must be its own object in the "days" array.
3. DO NOT include "imageUrl" fields. The application fetches images automatically based on name and location.
4. Keep descriptions concise to avoid hitting output limits.

Please provide the output in JSON format only following this structure:

{
  "tripName": "String",
  "days": [
    {
      "day": 1,
      "activities": [
        {
          "name": "Sightseeing spot or activity",
          "description": "Short description",
          "rating": "Average rating if available",
          "location": "Address or area",
          "time": "Must include time with proper range like this from 10:00 AM - 12:00 PM",
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
      ],
      "hotels": [
        {
          "name": "Hotel name",
          "rating": "Hotel rating",
          "priceRange": "Approximate price per night in Indian Rupees (₹)",
          "address": "Hotel address"
        }
      ]
    }
  ],
  "summary": "Short summary or tips for the trip"
}

Rules:
1. Every activity MUST have a "time" field
2. Every activity MUST have a "timeToTravel" field
3. Include 2-3 hotel options (can be same across days), 3 restaurants, and 3 activities per day
4. You MUST generate all ${noOfDays} days.
5. Output ONLY valid JSON.
6. DO NOT wrap the response in markdown code blocks.
7. All hotel prices MUST be in Indian Rupees (₹).
`;
