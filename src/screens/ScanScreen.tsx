import React, { useState } from "react";
import { 
  View, 
  Text, 
  ActivityIndicator, 
  Alert, 
  StyleSheet 
} from "react-native";
import { useEffect } from "react";
import {
  registerNetworkListener,
  unregisterNetworkListener,
} from "../services/networkListener";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import RNFS from "react-native-fs";
import CameraView from "../components/CameraView";
import { extractTextFromImage } from "../services/ocr.backup";
import { summarizeText } from "../services/summarizer";


type RootStackParamList = {
  Home: undefined;
  Scan: undefined;
  Result: { text: string };
};

type Props = NativeStackScreenProps<RootStackParamList, "Scan">;

export default function ScanScreen({ navigation }: Props) {
  const [loading, setLoading] = useState(false);

  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    registerNetworkListener((connected) => {
      setIsOnline(connected);

      if (!connected) {
        Alert.alert(
          "Koneksi Terputus",
          "Tidak ada koneksi internet. Fitur ringkasan online akan dinonaktifkan."
        );
      }
    });

    return () => {
      unregisterNetworkListener();
    };
  }, []);

  const handleCapture = async (photoPath: string) => {
    setLoading(true);
    try {
      const extractedText = await extractTextFromImage(photoPath);

      if (!extractedText || extractedText.trim().length === 0) {
        return Alert.alert("OCR Gagal", "Tidak ada teks yang terbaca dari foto.");
      }

      // 🔹 Jika offline → langsung tampilkan hasil OCR
      if (!isOnline) {
        navigation.navigate("Result", { text: extractedText });
        return;
      }

      // 🔹 Jika online → lanjut summarize
      const summary = await summarizeText(extractedText);
      navigation.navigate("Result", { text: summary });
      
    } catch (error) {
      console.warn("ScanScreen handleCapture error:", error);
      Alert.alert("Error", "Terjadi kesalahan saat memproses foto.");
    } finally {
      // ✅ HAPUS FILE SETELAH OCR (AMAN)
      try {
        const path = photoPath.replace("file://", "");
        const exists = await RNFS.exists(path);
        if (exists) {
          await RNFS.unlink(path);
          console.log("Temp image deleted:", path);
        }
      } catch (err) {
        console.warn("Failed to delete temp file:", err);
      }
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* CAMERA */}
      <CameraView onCapture={handleCapture} />

      {/* LOADING OVERLAY */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={styles.loadingText}>
            Gambar sedang diproses...
            {"\n"}Silakan tunggu sebentar.
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },

  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    zIndex: 999,
  },

  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    lineHeight: 22,
  },
});
