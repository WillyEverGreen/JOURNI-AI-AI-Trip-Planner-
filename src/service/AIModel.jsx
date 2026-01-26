// src/components/AIModel.jsx
import { generateTripPrompt } from "@/constants/prompts";

// Call Grok API (xAI) with given prompt
// Call Qubrid AI (NVIDIA Nemotron) with given prompt
// Call Qubrid AI (Mistral 7B) with given prompt
// Helper to repair truncated JSON
const repairJson = (text) => {
    let json = text.trim();
    
    // Check if it starts with { but doesn't end with }
    if (json.startsWith("{") && !json.endsWith("}")) {
        // Find deepest open structures
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

export async function callGemini(prompt) {
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
                    content: "You are an expert AI Trip Planner. Generate detailed travel itineraries in JSON format. IMPORTANT: Output ONLY standard JSON. Do not output reasoning, thinking, or markdown code blocks. Just valid JSON."
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

    // Remove triple backticks if present
    const jsonMatch = fullText.match(/```(?:json)?\s*([\s\S]*?)```/);
    let jsonText = jsonMatch ? jsonMatch[1].trim() : fullText.trim();
    
    // Robust parsing
    try {
      return JSON.parse(jsonText);
    } catch (err) {
      console.warn("Initial JSON parse failed, attempting repair...", err);
      try {
        const repaired = repairJson(jsonText);
        return JSON.parse(repaired);
      } catch (repairErr) {
        console.error("JSON repair failed", repairErr);
        // Last resort: if it's a string that looks like JSON, return it, 
        // but the UI likely expects an object.
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
