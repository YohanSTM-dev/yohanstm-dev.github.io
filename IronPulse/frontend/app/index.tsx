import React from 'react';
import { Redirect } from 'expo-router';
import { useAuthStore } from '../src/store/authStore';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default function Index() {
  const { session, initialized } = useAuthStore();

  if (!initialized) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#10B981" />
      </View>
    );
  }

  if (session) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/(auth)/login" />;
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
