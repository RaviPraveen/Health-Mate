
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { setupDatabase } from './src/database/database';

export default function App() {
  const [msg, setMsg] = useState('Connecting...');

  useEffect(() => {
    setupDatabase()
      .then(() => {
        setMsg('Database Connected Successfully');
      })
      .catch(() => {
        setMsg('Database Connection Failed');
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>HealthMate</Text>
      <Text>{msg}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#168C76',
    marginBottom: 15,
  },
});
