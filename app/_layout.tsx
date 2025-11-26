import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export const unstable_settings = {
  anchor: '(tabs)',
};

// Custom dark theme for LastPuff
const LastPuffTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#0E6B8A',
    background: '#10283B',
    card: '#1A2B34',
    text: '#fff',
    border: '#2E7D7A',
    notification: '#0E6B8A',
  },
};

export default function RootLayout() {
  return (
    <ThemeProvider value={LastPuffTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="light" />
    </ThemeProvider>
  );
}
