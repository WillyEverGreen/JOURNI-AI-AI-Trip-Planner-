// src/components/AIModel.jsx
import { generateTripPrompt } from "@/constants/prompts";

// Call Grok API (xAI) with given prompt
// Call Qubrid AI (NVIDIA Nemotron) with given prompt
// Call Qubrid AI (Mistral 7B) with given prompt
export async function callGemini(prompt) {
  const API_KEY = import.meta.env.VITE_QUBRID_API_KEY; 
  if (!API_KEY) {
      console.error("VITE_QUBRID_API_KEY is missing! Please set it in .env.local");
      return null;
  }

  try {
    const response = await fetch("https://platform.qubrid.com/api/v1/qubridai/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
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
            max_tokens: 4096, // Mistral 7B context window
            stream: true // Explicitly handle as stream since API forces it
        })
    });

    if (!response.ok) {
        const errText = await response.text();
        console.error("Qubrid API Error:", response.status, errText);
        return null;
    }

    // Handle Streaming Response (API returns SSE events)
    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let fullText = "";
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunkText = decoder.decode(value, { stream: true });
      buffer += chunkText;

      const lines = buffer.split(/\r?\n/);
      // Keep successful lines, put the last partial line back in buffer
      buffer = lines.pop() || ""; 

      for (const line of lines) {
         const trimmedLine = line.trim();
         // Check for SSE data
         if (trimmedLine.startsWith("data:")) {
             const jsonStr = trimmedLine.replace("data:", "").trim();
             if (jsonStr === "[DONE]") continue;

             try {
                 const chunk = JSON.parse(jsonStr);
                 // Extract content from delta (standard streaming) or message (sometimes full)
                 const content = 
                    chunk.choices?.[0]?.delta?.content || 
                    chunk.choices?.[0]?.message?.content || 
                    chunk.choices?.[0]?.text || 
                    chunk.content || 
                    "";
                 
                 if (content) fullText += content;
             } catch (e) {
                 // console.warn("Error parsing chunk", e);
             }
         }
      }
    }
    
    // Process any remaining buffer
    buffer += decoder.decode(); 
    if (buffer.trim().startsWith("data:")) {
         try {
             const jsonStr = buffer.trim().replace("data:", "").trim();
             if (jsonStr !== "[DONE]") {
                const chunk = JSON.parse(jsonStr);
                const content = chunk.choices?.[0]?.delta?.content || "";
                if (content) fullText += content;
             }
         } catch(e) {}
    }
    
    console.log("Qubrid Full Text (Streamed):", fullText);

    // Remove triple backticks ```json if present
    const jsonMatch = fullText.match(/```(?:json)?\s*([\s\S]*?)```/);
    const jsonText = jsonMatch ? jsonMatch[1].trim() : fullText.trim();
    
    // Validate final JSON
    try {
      const parsed = JSON.parse(jsonText);
      console.log("Parsed trip data:", parsed);
      return parsed;
    } catch (err) {
      console.warn("AI returned non-JSON text", err);
      // Attempt to return raw text if parsing fails, but UI might break
      return jsonText; 
    }
  } catch (err) {
    console.error("Error calling Qubrid API:", err);
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
