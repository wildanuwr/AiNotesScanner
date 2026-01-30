import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet
} from 'react-native';
import { getAllNotes } from '../database/noteRepository';
import { useFocusEffect } from '@react-navigation/native';

export default function HistoryScreen() {
  const [notes, setNotes] = useState<any[]>([]);

  useFocusEffect(
    useCallback(() => {
      // 🔁 Refresh data setiap screen ini aktif
      const data = getAllNotes();
      setNotes(data || []);
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Riwayat Scan</Text>

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.content}>{item.content}</Text>
            <Text style={styles.date}>{item.created_at}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            Belum ada data
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: '600', marginBottom: 12 },
  card: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 3,
  },
  content: { fontSize: 16 },
  date: { fontSize: 12, color: '#666', marginTop: 6 },
});
