import { Camera } from "react-native-vision-camera";
import { Alert, PermissionsAndroid, Platform } from "react-native";

export async function requestPermissions() {
  // === VisionCamera Permissions ===
  const camPerm = await Camera.requestCameraPermission();
  const micPerm = await Camera.requestMicrophonePermission();

  if (camPerm !== "granted") {
    Alert.alert("Izin Kamera diperlukan untuk melanjutkan");
    return false;
  }

  // === OPTIONAL (untuk simpan foto) ===
  if (Platform.OS === "android" && Platform.Version >= 33) {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
    );
  } else if (Platform.OS === "android") {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    );
  }

  return true;
}
