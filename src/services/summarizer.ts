import nlp from "compromise";

const API_URL = "http://192.168.1.9:3000/api/summarize";
// saat dev bisa:
// const API_URL = "http://IP-LOCAL:3000/api/summarize";

export const summarizeText = async (text: string): Promise<string> => {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text }),
      signal: controller.signal
    });

    clearTimeout(timeout);

    if (!res.ok) {
      throw new Error(`API error ${res.status}`);
    }

    const json = await res.json();

    if (json.summary?.trim()) {
      return json.summary.trim();
    }

    throw new Error("Empty summary");
  } catch (err) {
    console.warn("API gagal, fallback lokal:", err);

    // ⬇️ fallback tetap dipakai
    const sentences = nlp(text).sentences().out("array");
    return sentences.slice(0, 3).join(" ") || "Gagal membuat ringkasan.";
  }
};
