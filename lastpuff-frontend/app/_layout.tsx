import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import 'react-native-reanimated';
import { AuthProvider, AuthContext } from '../context/AuthContext';
import { GoalsProvider } from '../context/GoalsContext';

import { LPColors } from '../constants/theme';

// Custom dark theme for LastPuff
const LastPuffTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: LPColors.primary,
    background: LPColors.bg,
    card: LPColors.surface,
    text: LPColors.text,
    border: LPColors.border,
    notification: LPColors.primary,
  },
};

function ProtectedNavigation() {
  const { token, loading } = useContext(AuthContext);
  const segments = useSegments();
  const router = useRouter();

  // 🔐 Redirect logic based on auth state
  useEffect(() => {
    if (loading) return; // wait until AsyncStorage loaded

    const inAuthGroup = segments[0] === 'auth';

    if (!token && !inAuthGroup) {
      // Not logged in → force to login
      router.replace('/auth/login');
    } else if (token && inAuthGroup) {
      // Logged in but on auth screen → send to app
      router.replace('/(tabs)');
    }
  }, [loading, token, segments]);

  // 🌓 While loading from storage, don't show tabs or login yet
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: LPColors.bg,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size="large" color={LPColors.primary} />
        <Text style={{ color: LPColors.text, marginTop: 12 }}>Loading...</Text>
      </View>
    );
  }

  // Normal navigation stack
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Auth screens */}
      <Stack.Screen name="auth/login" />
      <Stack.Screen name="auth/signup" />

      {/* Main app */}
      <Stack.Screen name="(tabs)" />

      {/* Optional modal */}
      <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <GoalsProvider>
        <ThemeProvider value={LastPuffTheme}>
          <ProtectedNavigation />
          <StatusBar style="light" />
        </ThemeProvider>
      </GoalsProvider>
    </AuthProvider>
  );
}
