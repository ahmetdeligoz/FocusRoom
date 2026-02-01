import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function Layout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false, // Üstteki beyaz başlıkları gizle
          contentStyle: { backgroundColor: '#000' }, // Genel arka plan siyah
          animation: 'fade', // Sayfa geçişi yumuşak olsun
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen 
          name="rooms" 
          options={{ 
            presentation: 'modal', // Odalar sayfası aşağıdan yukarı havalı bir şekilde kaysın
            animation: 'slide_from_bottom'
          }} 
        />
      </Stack>
    </>
  );
}