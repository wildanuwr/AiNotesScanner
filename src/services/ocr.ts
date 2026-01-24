import TextRecognition from '@react-native-ml-kit/text-recognition';

/**
 * Ekstraksi teks dari image lokal
 * @param internalPath path dari CameraView
 */
export const extractTextFromImage = async (
  internalPath: string
): Promise<string> => {
  try {
    const imageUri = internalPath.startsWith('file://')
      ? internalPath
      : `file://${internalPath}`;

    const result = await TextRecognition.recognize(imageUri);

    return result.text?.trim() ?? '';
  } catch (error) {
    console.warn('[OCR ERROR]', error);
    return '';
  }
};
