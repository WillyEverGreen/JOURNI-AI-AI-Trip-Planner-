export const generateTripPrompt = ({
  destination,
  noOfDays,
  travelers,
  budget,
}) => `
Create a detailed JSON itinerary for ${noOfDays} days in ${destination}.
Travelers: ${travelers}, Budget: ${budget}.

SCHEMA:
{
  "tripName": "string",
  "hotels": [{ "name": "string", "rating": "string", "priceRange": "string", "address": "string" }],
  "days": [{
    "day": number,
    "activities": [{ "name": "string", "description": "short description", "rating": "string", "location": "string", "time": "9:00 AM - 11:00 AM", "timeToTravel": "string" }],
    "restaurants": [{ "name": "string", "cuisine": "string", "rating": "string", "address": "string" }]
  }],
  "summary": "string"
}

STRICT CODE RULES:
1. DAY MUST BE AN INTEGER (1, 2, etc).
2. GENERATE ALL ${noOfDays} DAYS.
3. INCLUDE EXACTLY 3 HOTELS in root array.
4. INCLUDE EXACTLY 3 ACTIVITIES AND 2 RESTAURANTS PER DAY.
5. EVERY activity MUST have a specific "time" range (e.g., 10:00 AM - 12:00 PM).
6. SCHEDULE items in chronological order: Morning, Afternoon, Evening.
7. Keep descriptions VERY short (1 sentence).
8. OUTPUT RAW JSON OBJECT ONLY. NO IMAGEURL.
`;
