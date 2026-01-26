// src/components/AIModel.jsx
import { generateTripPrompt } from "@/constants/prompts";

// Call Grok API (xAI) with given prompt
// Call Qubrid AI (NVIDIA Nemotron) with given prompt
// Call Qubrid AI (Mistral 7B) with given prompt
// Helper to repair truncated or commented JSON
// Helper to repair truncated or malformed JSON
const repairJson = (text) => {
  let json = text.trim();

  // 1. Remove markdown blocks
  json = json.replace(/```(?:json)?/g, "").replace(/```/g, "");

  // 2. Strip comments (non-string //)
  json = json
    .split("\n")
    .map((line) => {
      const commentIndex = line.indexOf("//");
      if (commentIndex !== -1) {
        const quoteBasis = line.substring(0, commentIndex).match(/"/g);
        if (!quoteBasis || quoteBasis.length % 2 === 0) {
          return line.substring(0, commentIndex).trim();
        }
      }
      return line;
    })
    .join("\n")
    .trim();

  // 3. Ensure we start with a '{'
  const firstBrace = json.indexOf("{");
  if (firstBrace === -1) return null;
  json = json.substring(firstBrace);

  // 4. Handle trailing commas before closing brackets (often causes SyntaxError)
  json = json.replace(/,\s*([\]}])/g, "$1");

  // 5. Balance braces and brackets, ignoring characters inside strings
  const stack = [];
  let inString = false;
  for (let i = 0; i < json.length; i++) {
    const char = json[i];
    if (char === '"' && (i === 0 || json[i - 1] !== "\\")) {
      inString = !inString;
    } else if (!inString) {
      if (char === "{") stack.push("}");
      else if (char === "[") stack.push("]");
      else if (char === "}") {
        if (stack[stack.length - 1] === "}") stack.pop();
      } else if (char === "]") {
        if (stack[stack.length - 1] === "]") stack.pop();
      }
    }
  }

  // 6. If we are stuck inside a string, close it
  if (inString) json += '"';

  // 7. Close all remaining opened structures
  while (stack.length > 0) {
    json += stack.pop();
  }

  return json;
};

// Helper to fix common AI formatting mistakes
const protectStructure = (data) => {
  if (!data || typeof data !== "object") return null;

  // 1. Ensure tripName exists
  if (!data.tripName) data.tripName = "Your Trip Plan";

  // 2. Ensure hotels is an array
  if (!Array.isArray(data.hotels)) data.hotels = [];

  // 3. Fix Days array
  if (Array.isArray(data.days)) {
    data.days = data.days.map((dayObj, index) => {
      // Fix string-formatted days: "Day 1" -> 1
      if (typeof dayObj.day === "string") {
        const num = parseInt(dayObj.day.replace(/\D/g, ""));
        dayObj.day = isNaN(num) ? index + 1 : num;
      }
      // Ensure day is at least index + 1 if missing
      if (!dayObj.day) dayObj.day = index + 1;

      // Ensure activities and restaurants are arrays
      if (!Array.isArray(dayObj.activities)) dayObj.activities = [];
      if (!Array.isArray(dayObj.restaurants)) dayObj.restaurants = [];

      return dayObj;
    });
  } else {
    data.days = [];
  }

  return data;
};

export async function generateTrip(prompt) {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mistralai/Mistral-7B-Instruct-v0.3",
        messages: [
          {
            role: "system",
            content:
              "You are an expert AI Trip Planner. Generate detailed travel itineraries in JSON format only. IMPORTANT: Your response must START with '{' and END with '}'. NEVER include any text, comments, placeholders (like // ...), or notes outside or inside the JSON object.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 5000,
        stream: true,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Backend Proxy Error:", response.status, errText);
      return null;
    }

    const data = await response.json();
    const fullText = (data.content || "").trim();

    console.log("Qubrid (via Proxy) Full Text:", fullText);

    let parsed = null;
    // Robust parsing strategy:
    try {
      parsed = JSON.parse(fullText);
    } catch (e) {
      // Try to find the first '{' and the last '}' to strip AI chatter
      try {
        const start = fullText.indexOf("{");
        const end = fullText.lastIndexOf("}");
        if (start !== -1 && end !== -1 && end > start) {
          parsed = JSON.parse(fullText.substring(start, end + 1));
        }
      } catch (e2) {}

      if (!parsed) {
        console.warn("Standard parse failed, attempting repair...");
        try {
          const repaired = repairJson(fullText);
          if (repaired) parsed = JSON.parse(repaired);
        } catch (repairErr) {
          console.error("JSON repair failed", repairErr);
        }
      }
    }

    // Apply structure protection to fix AI hallucinations
    return protectStructure(parsed);
  } catch (err) {
    console.error("Error calling Backend Proxy:", err);
    return null;
  }
}

// Helper function to generate prompt from form data
export function getTripPrompt(formData) {
  return generateTripPrompt({
    destination: formData.destination,
    noOfDays: formData.noOfDays,
    travelers: formData.travelers,
    budget: formData.budget,
  });
}

