import { GoogleGenAI } from "@google/genai";

const MODEL_NAME = "gemini-3.5-flash-lite";

export default {
  async fetch(request: Request): Promise<Response> {
    if (request.method !== "POST") {
      return Response.json({ error: "Method not allowed" }, { status: 405 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return Response.json(
        { error: "Gemini API key is not configured" },
        { status: 500 },
      );
    }

    try {
      const body = await request.json();

      if (
        typeof body !== "object" ||
        body === null ||
        !("prompt" in body) ||
        typeof body.prompt !== "string" ||
        !body.prompt.trim()
      ) {
        return Response.json(
          { error: "A valid prompt is required" },
          { status: 400 },
        );
      }

      const ai = new GoogleGenAI({ apiKey });

      const interaction = await ai.interactions.create({
        model: MODEL_NAME,
        input: body.prompt,
      });

      if (!interaction.output_text) {
        throw new Error("Empty response from Gemini");
      }

      return Response.json({
        result: interaction.output_text,
      });
    } catch {
      return Response.json(
        { error: "Failed to generate insight" },
        { status: 502 },
      );
    }
  },
};
