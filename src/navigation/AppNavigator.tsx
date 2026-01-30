import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ScanScreen from '../screens/ScanScreen';
import ResultScreen from '../screens/ResultScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Scan" component={ScanScreen} options={{ title: "Scan Dokumen" }}/>
      <Stack.Screen name="Result" component={ResultScreen} options={{ title: "Hasil Scan" }}/>
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: "Pengaturan" }} />
    </Stack.Navigator>
  );
}
