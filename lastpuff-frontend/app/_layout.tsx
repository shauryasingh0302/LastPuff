import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import 'react-native-reanimated';
import FloatingChatButton from '../components/FloatingChatButton';
import { AuthContext, AuthProvider } from '../context/AuthContext';
import { GoalsProvider } from '../context/GoalsContext';

// Import geofencing service to register background task at app startup
import '../services/geofencing';

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
    const inOnboarding = segments[0] === 'onboarding';

    if (!token && !inAuthGroup && !inOnboarding) {
      // Not logged in and not in auth/onboarding screens → force to login
      router.replace('/auth/login');
    } else if (token && inAuthGroup && segments[1] !== 'signup') {
      // Logged in but on auth screen (but NOT signup) → send to app
      // We exclude signup because it handles its own redirect to onboarding
      router.replace('/(tabs)');
    }
    // Allow onboarding screens for both logged-in users and during signup flow
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

      {/* Onboarding */}
      <Stack.Screen name="onboarding/questionnaire" />

      {/* Main app */}
      <Stack.Screen name="(tabs)" />

      {/* AI Coach */}
      <Stack.Screen
        name="ai-coach"
        options={{
          presentation: 'card',
          animation: 'slide_from_bottom',
        }}
      />

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
          <View style={styles.container}>
            <ProtectedNavigation />
            <FloatingChatButton />
          </View>
          <StatusBar style="light" />
        </ThemeProvider>
      </GoalsProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
