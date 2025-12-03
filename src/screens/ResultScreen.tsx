import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { summarizeText } from "../services/summarizer";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
  Home: undefined;
  Scan: undefined;
  Result: { text: string };
};

type Props = NativeStackScreenProps<RootStackParamList, "Result">;

export default function ResultScreen({ route }: Props) {
  const { text } = route.params;
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      const s = await summarizeText(text);
      setSummary(s);
      setLoading(false);
    };
    run();
  }, []);

  return (
    <ScrollView
      style={{
        flex: 1,
        padding: 22,
        backgroundColor: "#F8F9FB",
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <Text
        style={{
          fontSize: 28,
          fontWeight: "700",
          marginBottom: 10,
          color: "#111",
        }}
      >
        Hasil Pemindaian
      </Text>

      {/* Original Text Card */}
      <View
        style={{
          marginTop: 10,
          backgroundColor: "#fff",
          padding: 18,
          borderRadius: 16,
          shadowColor: "#000",
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 3,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 8 }}>
          Teks Asli
        </Text>

        <Text style={{ fontSize: 15, lineHeight: 22, color: "#333" }}>
          {text}
        </Text>
      </View>

      {/* AI Summary */}
      <Text
        style={{
          fontSize: 26,
          fontWeight: "700",
          marginTop: 30,
          marginBottom: 10,
          color: "#111",
        }}
      >
        Ringkasan AI
      </Text>

      <View
        style={{
          backgroundColor: "#fff",
          padding: 18,
          borderRadius: 16,
          shadowColor: "#000",
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 3,
          marginBottom: 20,
        }}
      >
        {loading ? (
          <View
            style={{
              paddingVertical: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size="large" />
            <Text style={{ marginTop: 10, color: "#666" }}>
              AI sedang merangkum...
            </Text>
          </View>
        ) : (
          <Text style={{ fontSize: 15, lineHeight: 22, color: "#333" }}>
            {summary}
          </Text>
        )}
      </View>
    </ScrollView>
  );
}
