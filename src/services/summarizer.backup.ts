import nlp from "compromise";
import { GoogleGenAI } from "@google/genai";
import { GOOGLE_GENAI_API_KEY } from "@env";

const ai = new GoogleGenAI({ apiKey: GOOGLE_GENAI_API_KEY });

export const summarizeText = async (text: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: `Ringkas teks berikut secara singkat dan jelas, Jika Bahasa Arab Maka Ringkaslah apa yang dibahas , tapi output tetap bahasa indonesia:\n\n${text}` }],
        },
      ],
    });

    if (response.text?.trim()) return response.text.trim();
    throw new Error("Gemini returned empty");
  } catch (err) {
    console.warn("Gemini failed, fallback lokal:", err);
    const sentences = nlp(text).sentences().out("array");
    return sentences.slice(0, 3).join(" ") || "Gagal membuat ringkasan.";
  }
};
