import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function Layout() {
  useEffect(() => {
    // Supabase bağlantı kontrolü
    if (supabase) {
      console.log("Supabase Bağlantısı: Başarılı ✅");
    } else {
      console.log("Supabase Bağlantısı: Devre Dışı (Mock Mode) ⚠️");
    }
  }, []);

  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#000' }, // Tüm sayfalar varsayılan siyah
          animation: 'fade',
        }}
      >
        {/* 1. Giriş Ekranı */}
        <Stack.Screen name="index" />

        {/* 2. Ana Sayfa */}
        <Stack.Screen name="home" />

        {/* 3. Tek Kişilik Odaklanma Odası */}
        <Stack.Screen name="focusroom" />

        {/* 4. Ortak Çalışma Odası */}
        <Stack.Screen name="sharedroom" />

        {/* 5. Arkadaş Davet Etme (DÜZELTİLDİ: Modal kaldırıldı, normal sayfa oldu) */}
        <Stack.Screen name="invite" />

        {/* 6. Odalar Listesi */}
        <Stack.Screen name="rooms" />
      </Stack>
    </>
  );
}