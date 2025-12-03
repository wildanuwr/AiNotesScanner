import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

type LoadingProps = {
  label?: string; // boleh optional
};

export default function Loading({ label }: LoadingProps) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
      <Text style={{ marginTop: 20 }}>{label}</Text>
    </View>
  );
}
