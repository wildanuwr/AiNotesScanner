import React, { useRef, useState } from "react";
import { View, TouchableOpacity, Text, Alert } from "react-native";
import { Camera, useCameraDevices } from "react-native-vision-camera";
import { requestPermissions } from "../services/permissions";

type CameraViewProps = {
  onCapture: (path: string) => void;
};

export default function CameraView({ onCapture }: CameraViewProps) {
  const devices = useCameraDevices();
  const device = devices.find(d => d.position === "back");
  const camera = useRef<Camera>(null);
  const [flashOn, setFlashOn] = useState(false);

  if (!device) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#000" }}>
        <Text style={{ color: "#fff" }}>Loading Camera...</Text>
      </View>
    );
  }

const takePhoto = async () => {
  if (!camera.current) return;

  try {
    const photo = await camera.current.takePhoto({
      flash: flashOn ? 'on' : 'off',
    });

    // Path internal cache (TIDAK ke galeri)
    const filePath = `file://${photo.path}`;

    // Langsung kirim ke OCR
    onCapture(filePath);
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

      {/* FRAME SCAN */}
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
          }}
        >
          <View
            style={{
              width: 68,
              height: 68,
              borderRadius: 100,
              backgroundColor: "#eee",
            }}
          />
        </TouchableOpacity>
      </View>

      {/* FLASH BUTTON */}
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
