// src/components/AIModel.jsx
import { generateTripPrompt } from "@/constants/prompts";

// Call Grok API (xAI) with given prompt
// Call Qubrid AI (NVIDIA Nemotron) with given prompt
// Call Qubrid AI (Mistral 7B) with given prompt
// Helper to repair truncated or commented JSON
const repairJson = (text) => {
    let json = text.trim();
    
    // Remove potential markdown blocks
    json = json.replace(/```(?:json)?/g, "").replace(/```/g, "");

    // Remove single line comments that might be at the end or inside
    json = json.split("\n").map(line => {
      const commentIndex = line.indexOf("//");
      if (commentIndex !== -1) {
        // Only strip if not inside a string (naive check)
        const quoteBasis = line.substring(0, commentIndex).match(/"/g);
        if (!quoteBasis || quoteBasis.length % 2 === 0) {
          return line.substring(0, commentIndex).trim();
        }
      }
      return line;
    }).join("\n").trim();

    // Check if it starts with { but doesn't end with }
    if (json.startsWith("{") && !json.endsWith("}")) {
        const stack = [];
        for (let i = 0; i < json.length; i++) {
            if (json[i] === "{") stack.push("}");
            else if (json[i] === "[") stack.push("]");
            else if (json[i] === "}") stack.pop();
            else if (json[i] === "]") stack.pop();
        }
        while (stack.length > 0) {
            json += stack.pop();
        }
    }
    return json;
};

/**
 * Generates a trip itinerary using the Qubrid AI backend proxy.
 */
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
                    content: "You are an expert AI Trip Planner. Generate detailed travel itineraries in JSON format. IMPORTANT: Output ONLY standard JSON. NEVER include comments, notes, or markdown. Output must be raw JSON only."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.7,
            max_tokens: 4096,
            stream: true 
        })
    });

    if (!response.ok) {
        const errText = await response.text();
        console.error("Backend Proxy Error:", response.status, errText);
        return null;
    }

    const data = await response.json();
    const fullText = (data.content || "").trim();
    
    console.log("Qubrid (via Proxy) Full Text:", fullText);

    // Robust parsing
    try {
      // Try to find the first '{' and last '}' to strip AI chatter
      const start = fullText.indexOf("{");
      const end = fullText.lastIndexOf("}");
      if (start !== -1 && end !== -1 && end > start) {
          const stripped = fullText.substring(start, end + 1);
          return JSON.parse(stripped);
      }
      return JSON.parse(fullText);
    } catch (err) {
      console.warn("Initial JSON parse failed, attempting repair...", err);
      try {
        const repaired = repairJson(fullText);
        return JSON.parse(repaired);
      } catch (repairErr) {
        console.error("JSON repair failed", repairErr);
        return null; 
      }
    }
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
