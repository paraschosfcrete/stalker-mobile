import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

export const unstable_settings = {
  anchor: 'Main Menu',
};

export default function RootLayout() {
  const appTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: '#0c1116',
      card: '#11181f',
      border: '#22303a',
      primary: '#7ea66a',
      text: '#edf3ee',
      notification: '#7ea66a',
    },
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={appTheme}>
        <Stack>
          <Stack.Screen name="main-menu" options={{ headerShown: false }} />
          <Stack.Screen name="new-campaign" options={{ headerShown: false }} />
          <Stack.Screen name="zone-navigation" options={{ headerShown: false }} />
          <Stack.Screen name="campaign" options={{ headerShown: false }} />
          <Stack.Screen name="stash" options={{ headerShown: false }} />
          <Stack.Screen name="load-game" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <StatusBar style="light" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
