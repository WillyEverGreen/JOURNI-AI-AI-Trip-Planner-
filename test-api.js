import fetch from 'node-fetch';

const protectStructure = (data) => {
  if (!data || typeof data !== "object") return null;
  if (!data.tripName) data.tripName = "Your Trip Plan";
  if (!Array.isArray(data.hotels)) data.hotels = [];
  if (Array.isArray(data.days)) {
    data.days = data.days.map((dayObj, index) => {
      if (typeof dayObj.day === "string") {
        const num = parseInt(dayObj.day.replace(/\D/g, ""));
        dayObj.day = isNaN(num) ? index + 1 : num;
      }
      if (!dayObj.day) dayObj.day = index + 1;
      if (!Array.isArray(dayObj.activities)) dayObj.activities = [];
      if (!Array.isArray(dayObj.restaurants)) dayObj.restaurants = [];
      return dayObj;
    });
  } else {
    data.days = [];
  }
  return data;
};

async function testItineraryDensity() {
  const destination = "Tokyo, Japan";
  const numDays = 5;
  
  const prompt = `Create a detailed JSON itinerary for ${numDays} days in ${destination}.
Travelers: 2, Budget: Moderate.

SCHEMA:
{
  "tripName": "string",
  "hotels": [{ "name": "string", "rating": "string", "priceRange": "string", "address": "string" }],
  "days": [{
    "day": number,
    "activities": [{ "name": "string", "description": "string", "rating": "string", "location": "string", "time": "string", "timeToTravel": "string" }],
    "restaurants": [{ "name": "string", "cuisine": "string", "rating": "string", "address": "string" }]
  }],
  "summary": "string"
}

STRICT CODE RULES:
1. DAY MUST BE AN INTEGER (1, 2, etc).
2. GENERATE ALL ${numDays} DAYS.
3. INCLUDE EXACTLY 3 ACTIVITIES AND 2-3 RESTAURANTS PER DAY.
4. OUTPUT RAW JSON OBJECT ONLY. NO INTRO TEXT.
5. NO IMAGEURL.`;

  console.log(`🚀 Starting Rigorous 5-Day Density Test for: ${destination}...`);
  try {
    const r = await fetch("http://localhost:3001/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "mistralai/Mistral-7B-Instruct-v0.3",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 5000,
        stream: true
      })
    });

    const data = await r.json();
    const rawContent = data.content;
    
    let parsed = null;
    const start = rawContent.indexOf("{");
    const end = rawContent.lastIndexOf("}");
    if (start !== -1 && end !== -1 && end > start) {
      parsed = JSON.parse(rawContent.substring(start, end + 1));
    } else {
      parsed = JSON.parse(rawContent);
    }

    const sanitized = protectStructure(parsed);

    console.log("\n--- TEST RESULTS ---");
    console.log("✅ Total Days Generated:", sanitized.days.length);
    
    let allDaysMetDensity = true;
    sanitized.days.forEach((day) => {
      const actCount = day.activities.length;
      const restCount = day.restaurants.length;
      console.log(`  Day ${day.day}: ${actCount} activities, ${restCount} restaurants`);
      if (actCount < 3) allDaysMetDensity = false;
    });

    if (sanitized.days.length === numDays && allDaysMetDensity) {
      console.log("\n✨ SUCCESS: Fully dense 5-day itinerary confirmed!");
    } else {
      console.error("\n❌ FAILED: Itinerary is missing days or lacks sufficient activity density.");
    }

  } catch (e) {
    console.error("\n❌ Test Error:", e.message);
  }
}

testItineraryDensity();
