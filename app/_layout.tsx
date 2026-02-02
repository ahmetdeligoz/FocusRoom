import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function Layout() {
  useEffect(() => {
    console.log("Supabase Bağlantısı:", supabase ? "Başarılı ✅" : "Başarısız ❌");
  }, []);
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