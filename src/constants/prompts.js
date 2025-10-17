export const generateTripPrompt = ({
  destination,
  noOfDays,
  travelers,
  budget,
}) => `
Create a ${noOfDays}-day trip plan to ${destination} for ${travelers} travelers with a ${budget} budget. 

IMPORTANT: You must include a "time" field for EVERY activity with a realistic time slot (e.g., "09:00 AM", "2:30 PM", etc.).

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
          "imageUrl": "URL of the place",
          "rating": "Average rating if available",
          "location": "Address or area",
          "time": "Must include time with proper range like this from 10:00 AM - 12:00 PM",
          "timeToTravel": "Add how much time will it take to travel (e.g., '15 mins', '30 mins')"
        }
      ],
      "restaurants": [
        {
          "name": "Restaurant name",
          "cuisine": "Type of food",
          "rating": "Rating out of 5",
          "address": "Full address",
          "imageUrl": "Image URL"
        }
      ],
      "hotels": [
        {
          "name": "Hotel name",
          "rating": "Hotel rating",
          "priceRange": "Approximate price per night",
          "address": "Hotel address",
          "imageUrl": "Hotel image URL"
        }
      ]
    }
  ],
  "summary": "Short summary or tips for the trip"
}

Rules:
1. Every activity MUST have a "time" field with a realistic time of day
2. Every activity MUST have a "timeToTravel" field indicating travel time
3. Schedule activities chronologically throughout the day (morning to evening)
4. Include 3 hotel options, 3 restaurants, and 3 activities per day if possible
5. Output ONLY valid JSON without any extra text or markdown formatting
6. Do not wrap the response in markdown code blocks
.
`;
