import AsyncStorage from "@react-native-async-storage/async-storage";

const KEYS = {
  AUTO_SUMMARY: "AUTO_SUMMARY",
  OCR_LANGUAGE: "OCR_LANGUAGE",
};

/* =========================
   AUTO SUMMARY SETTING
========================= */
export const setAutoSummary = async (value: boolean) => {
  await AsyncStorage.setItem(KEYS.AUTO_SUMMARY, JSON.stringify(value));
};

export const getAutoSummary = async (): Promise<boolean> => {
  const value = await AsyncStorage.getItem(KEYS.AUTO_SUMMARY);
  return value ? JSON.parse(value) : true; // default ON
};

/* =========================
   OCR LANGUAGE (OPTIONAL)
========================= */
export const setOcrLanguage = async (lang: string) => {
  await AsyncStorage.setItem(KEYS.OCR_LANGUAGE, lang);
};

export const getOcrLanguage = async (): Promise<string> => {
  return (await AsyncStorage.getItem(KEYS.OCR_LANGUAGE)) || "id";
};
