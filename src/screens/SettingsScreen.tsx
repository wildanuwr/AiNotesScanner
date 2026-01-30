import React, { useEffect, useState } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { getAutoSummary, setAutoSummary } from "../services/settings";

export default function SettingsScreen() {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    getAutoSummary().then(setEnabled);
  }, []);

  const toggle = async () => {
    const value = !enabled;
    setEnabled(value);
    await setAutoSummary(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Ringkasan Otomatis</Text>
      <Switch value={enabled} onValueChange={toggle} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontSize: 16, marginBottom: 10 },
});
