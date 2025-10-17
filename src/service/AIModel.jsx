// src/components/AIModel.jsx
import { generateTripPrompt } from "@/constants/prompts";

// Call Gemini API with given prompt
export async function callGemini(prompt) {
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY; // Your API key from .env.local

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            responseMimeType: "application/json", // Force JSON response
          },
        }),
      }
    );

    const result = await response.json(); // Full API response
    console.log("Gemini Response:", result); // For debugging

    // Robust extraction: try multiple paths
    const rawText =
      result?.candidates?.[0]?.content?.parts?.[0]?.text ||
      result?.candidates?.[0]?.content?.[0]?.text ||
      result?.output_text;

    if (!rawText) {
      console.error("No text in AI response", JSON.stringify(result, null, 2));
      return null;
    }

    // Remove triple backticks ```json if present
    const jsonMatch = rawText.match(/```(?:json)?\s*([\s\S]*?)```/);
    const jsonText = jsonMatch ? jsonMatch[1].trim() : rawText.trim();

    // Try parsing JSON, fallback to plain text
    try {
      const parsed = JSON.parse(jsonText);
      console.log("Parsed trip data:", parsed); // Debug: check if time fields exist
      return parsed;
    } catch (err) {
      console.warn("AI returned non-JSON text, returning as string.");
      return jsonText;
    }
  } catch (err) {
    console.error("Error calling Gemini:", err);
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
