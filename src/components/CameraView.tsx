import React, { useRef, useState } from "react";
import { View, TouchableOpacity, Text, Alert } from "react-native";
import { Camera, useCameraDevices, CameraDevice } from "react-native-vision-camera";
import RNFS from "react-native-fs";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import { requestPermissions } from "../services/permissions";

type CameraViewProps = {
  onCapture: (path: string) => void;
};

export default function CameraView({ onCapture }: CameraViewProps) {
  const devices: CameraDevice[] = useCameraDevices();
  const [flashOn, setFlashOn] = useState(false);
  const device = devices.find((d) => d.position === "back");
  const camera = useRef<Camera>(null);

  if (!device)
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#000",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 16 }}>Loading Camera...</Text>
      </View>
    );

  const takePhoto = async () => {
    if (!camera.current) return;

    const granted = await requestPermissions();
    if (!granted) {
      Alert.alert("Permission Ditolak", "Aplikasi membutuhkan akses kamera.");
      return;
    }

    try {
      const photo = await camera.current.takePhoto({});
      setFlashOn(false);
      const destPath = `${RNFS.DocumentDirectoryPath}/scan_${Date.now()}.jpg`;

      await RNFS.copyFile(photo.path, destPath);
      await CameraRoll.save("file://" + destPath, {
        type: "photo",
        album: "NotesScanner",
      });

      onCapture(destPath);
    } catch (e) {
      console.log("Take Photo Error:", e);
      Alert.alert("Gagal mengambil foto");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      {/* CAMERA */}
      <Camera
        ref={camera}
        style={{ flex: 1 }}
        device={device}
        isActive={true}
        photo={true}
        torch={flashOn ? "on" : "off"}
      />

      {/* SCAN FRAME OVERLAY */}
      <View
        style={{
          position: "absolute",
          top: "18%",
          left: "10%",
          width: "80%",
          height: "50%",
          borderWidth: 2,
          borderColor: "rgba(255,255,255,0.6)",
          borderRadius: 18,
        }}
      />

      {/* DARK GRADIENT TOP */}
      <View
        style={{
          position: "absolute",
          top: 0,
          height: 160,
          width: "100%",
          backgroundColor: "rgba(0,0,0,0.45)",
          justifyContent: "flex-end",
          padding: 20,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 20, fontWeight: "600" }}>
          Arahkan kamera ke teks
        </Text>
        <Text style={{ color: "#ddd", fontSize: 14, marginTop: 4 }}>
          Sistem akan men-scan teks secara otomatis
        </Text>
      </View>

      {/* SHUTTER BUTTON */}
      <View
        style={{
          position: "absolute",
          bottom: 40,
          width: "100%",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={takePhoto}
          style={{
            width: 78,
            height: 78,
            backgroundColor: "#fff",
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center",
            elevation: 12,
            shadowColor: "#000",
            shadowOpacity: 0.3,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 4 },
          }}
        >
          <View
            style={{
              width: 68,
              height: 68,
                // backgroundColor: "#fafafa",
              borderRadius: 100,
            }}
          />
        </TouchableOpacity>
      </View>

      {/* FLASH & SETTINGS BUTTON */}
      <TouchableOpacity
        onPress={() => setFlashOn(!flashOn)}
        style={{
          position: "absolute",
          top: 35,
          right: 20,
          backgroundColor: "rgba(255,255,255,0.15)",
          padding: 10,
          borderRadius: 50,
        }}
      >
        <Text style={{ color: "white", fontSize: 20 }}>
          {flashOn ? "💡" : "⚡"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
