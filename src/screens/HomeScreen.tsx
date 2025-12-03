import React, { useRef, useEffect } from 'react';
import {
  Text,
  TouchableOpacity,
  Animated,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { requestPermissions } from "../services/permissions";

type RootStackParamList = {
  Home: undefined;
  Scan: undefined;
  Result: { text: string };
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 900,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: false,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const handleStart = async () => {
    const granted = await requestPermissions();
    if (granted) navigation.navigate("Scan");
  };

  return (
    <LinearGradient
      colors={['#6a11cb', '#2575fc']}
      style={{ flex: 1, padding: 30, justifyContent: 'center' }}
    >
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
      >
        {/* ICON */}
        <Text
          style={{
            fontSize: 60,
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          📄✨
        </Text>

        {/* TITLE */}
        <Text
          style={{
            fontSize: 38,
            fontWeight: '800',
            color: 'white',
            textAlign: 'center',
            marginBottom: 10,
          }}
        >
          Notes Scanner
        </Text>

        {/* TAGLINE */}
        <Text
          style={{
            fontSize: 16,
            color: "#e9e9e9",
            textAlign: "center",
            marginBottom: 30,
          }}
        >
          Scan, ekstrak, dan ringkas catatan Anda hanya dalam hitungan detik.
        </Text>

        {/* GLASS BOX */}
        <View
            style={{
              padding: 20,
              borderRadius: 18,
              marginBottom: 40,
              backgroundColor: "rgba(255,255,255,0.12)",
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.2)",
            }}
          >
            <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
              Apa itu Notes Scanner?
            </Text>

            <Text
              style={{
                color: "#eaeaea",
                fontSize: 14,
                marginTop: 10,
                lineHeight: 20,
              }}
            >
              Notes Scanner adalah aplikasi berbasis AI yang dapat:
              {"\n"}• Mengambil teks dari foto (OCR)
              {"\n"}• Meringkas isi teks secara otomatis
              {"\n"}• Mempermudah membaca catatan panjang
              {"\n"}• Membantu tugas sekolah & pekerjaan
            </Text>
          </View>

        {/* START BUTTON */}
        <Animated.View
          style={{
            shadowColor: "#fff",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: glowAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0.3, 1],
            }) as unknown as number,
            shadowRadius: glowAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [8, 20],
            }) as unknown as number,
          }}
        >
          <TouchableOpacity
            onPress={handleStart}
            style={{
              backgroundColor: "white",
              paddingVertical: 18,
              borderRadius: 20,
              alignItems: "center",
              elevation: 10,
            }}
          >
            <Text style={{ color: "#2575fc", fontSize: 18, fontWeight: "700" }}>
              Mulai Scan
            </Text>
          </TouchableOpacity>
        </Animated.View>

      </Animated.View>
    </LinearGradient>
  );
}
