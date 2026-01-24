import TextRecognition from '@react-native-ml-kit/text-recognition';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';

/**
 * Ambil teks dari foto
 * @param internalPath path internal dari CameraView (DocumentDirectoryPath)
 */
export const extractTextFromImage = async (internalPath: string): Promise<string> => {
  try {
    // 1️⃣ Simpan ke gallery/public storage agar ML Kit bisa akses
    // tambahkan "file://" prefix
    const savedUri = await CameraRoll.save("file://" + internalPath, { type: 'photo', album: 'NotesScanner' });

    // 2️⃣ Jalankan OCR dari URI publik
    const result = await TextRecognition.recognize(savedUri);

    // 3️⃣ Kembalikan teks yang terbaca
    return result.text || '';
  } catch (e) {
    console.warn("OCR failed:", e);
    return '';
  }
};
