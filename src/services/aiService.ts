import { GoogleGenAI } from "@google/genai";

export interface InsightData {
  feasibility: {
    status: "safe" | "attention" | "danger";
    content: string;
  };
  diagnosis: {
    content: string;
  };
  suggestions: {
    items: string[];
  };
  investment: {
    items: string[];
  };
  motivation: {
    content: string;
  };
}

const API_KEY = String(import.meta.env.VITE_GEMINI_API_KEY);
const MODEL_NAME = "gemini-3.5-flash-lite";

const callGeminiAPI = async (prompt: string) => {
  const ai = new GoogleGenAI({
    apiKey: API_KEY,
  });

  const interaction = await ai.interactions.create({
    model: MODEL_NAME,
    input: prompt,
  });

  if (!interaction.output_text) {
    throw new Error("Failed to get response from Gemini API");
  }

  return interaction.output_text;
};

export const getInsight = async (prompt: string) => {
  const response = await callGeminiAPI(prompt);
  return JSON.parse(response) as InsightData;
};
