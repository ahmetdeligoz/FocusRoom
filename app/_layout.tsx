import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function Layout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#000' },
          animation: 'fade',
        }}
      >
        {/* Giriş Ekranı (index) */}
        <Stack.Screen name="index" />

        {/* YENİ: Ana Sayfa (Eski index, yeni home) - BUNU EKLE */}
        <Stack.Screen name="home" />

        {/* Odalar Sayfası */}
        <Stack.Screen 
          name="rooms" 
          options={{ 
            presentation: 'modal',
            animation: 'slide_from_bottom'
          }} 
        />
      </Stack>
    </>
  );
}