
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY not found in environment variables. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateTedxIdea = async (topic: string): Promise<{ title: string; abstract: string }> => {
  if (!API_KEY) {
    throw new Error("API Key is not configured.");
  }
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Based on the topic "${topic}", generate a catchy, thought-provoking TEDx talk title and a brief, compelling one-paragraph abstract for it. The abstract should be around 50-70 words.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.STRING,
              description: "The catchy, thought-provoking TEDx talk title."
            },
            abstract: {
              type: Type.STRING,
              description: "A brief, compelling one-paragraph abstract for the talk."
            }
          },
          required: ["title", "abstract"]
        }
      }
    });

    const text = response.text.trim();
    // In case the response is wrapped in markdown code block
    const cleanedText = text.replace(/^```json\n?/, '').replace(/\n?```$/, '');
    const idea = JSON.parse(cleanedText);
    return idea;
  } catch (error) {
    console.error("Error generating TEDx idea:", error);
    throw new Error("Failed to generate an idea. Please try again.");
  }
};