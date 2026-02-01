import { useRouter } from 'expo-router'; // <--- BUNU EKLE
import { Minus, Plus, Target, User } from 'lucide-react-native'; // İkonlar için
import React, { useState } from 'react';
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Home() {
  const [minutes, setMinutes] = useState(15);
  const router = useRouter();
  const increaseTime = () => setMinutes(prev => prev + 5);
  const decreaseTime = () => setMinutes(prev => (prev > 5 ? prev - 5 : 5));

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* HEADER ALANI (Sol Üst: Logo | Sağ Üst: Profil) */}
      <View style={styles.headerBar}>
        
        {/* Sol Üst: Logo ve İsim */}
        <View style={styles.brandContainer}>
          <View style={styles.logoBox}>
            <Target size={24} color="#FFF" />
          </View>
          <View>
            <Text style={styles.appName}>FocusRoom</Text>
            {/* Tagline'ı opsiyonel olarak küçük şekilde ekledim, istersen kaldırabilirsin */}
            <Text style={styles.tagline}>Deep work.</Text>
          </View>
        </View>

        {/* Sağ Üst: Profil Butonu */}
        <TouchableOpacity style={styles.profileButton} onPress={() => router.push('/profile')}>
          <User size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* ANA İÇERİK: Zamanlayıcı */}
      <View style={styles.contentContainer}>
        
        {/* Dakika Göstergesi */}
        <Text style={styles.timerText}>{minutes}</Text>
        <Text style={styles.timerSubText}>minutes</Text>

        {/* Artır / Azalt Kontrolleri */}
        <View style={styles.controlsRow}>
          <TouchableOpacity onPress={decreaseTime} style={styles.controlButton}>
            <Minus size={32} color="#FFF" />
          </TouchableOpacity>

          <View style={styles.dividerLine} />

          <TouchableOpacity onPress={increaseTime} style={styles.controlButton}>
            <Plus size={32} color="#FFF" />
          </TouchableOpacity>
        </View>

      </View>

      {/* ALT KISIM: Butonlar */}
      <View style={styles.footer}>
        {/* Kendin Çalış (Primary Style - Beyaz Dolu) */}
        <TouchableOpacity 
  style={styles.primaryButton} 
  onPress={() => {
    // Seçilen 'minutes' değerini parametre olarak gönderiyoruz
    router.push({ pathname: '/focusroom', params: { minutes: minutes } });
  }}
>
  <Text style={styles.primaryButtonText}>Kendin Çalış</Text>
</TouchableOpacity>

        {/* Arkadaşlarınla Çalış (Secondary Style - Koyu, Kenarlıklı) */}
        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Arkadaşlarınla Çalış</Text>
        </TouchableOpacity>
        
        <Text style={styles.brandMono}>● FOCUSROOM MONO ●</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Tam siyah arka plan
    paddingHorizontal: 24,
    justifyContent: 'space-between', // Header üstte, Footer altta
    paddingBottom: 40,
  },

  // --- HEADER STYLE ---
  headerBar: {
    marginTop: 60, // Safe area için boşluk
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoBox: {
    width: 44,
    height: 44,
    backgroundColor: '#1a1a1a', // Giriş ekranındaki kutu rengi
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    letterSpacing: 0.5,
  },
  tagline: {
    fontSize: 12,
    color: '#666',
  },
  profileButton: {
    width: 44,
    height: 44,
    backgroundColor: '#1a1a1a',
    borderRadius: 22, // Tam yuvarlak
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },

  // --- TIMER CONTENT ---
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1, // Ekranın ortasını kapla
  },
  timerText: {
    fontSize: 120, // Çok büyük font
    color: '#FFF',
    fontWeight: 'bold',
    letterSpacing: -2,
    lineHeight: 120,
  },
  timerSubText: {
    fontSize: 20,
    color: '#666',
    marginBottom: 40,
    fontWeight: '500',
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111', // Kontrol grubu arka planı
    borderRadius: 20,
    padding: 8,
    borderWidth: 1,
    borderColor: '#333',
    gap: 10,
  },
  controlButton: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#1a1a1a', // Buton rengi
  },
  dividerLine: {
    width: 1,
    height: 30,
    backgroundColor: '#333',
  },

  // --- FOOTER BUTTONS ---
  footer: {
    width: '100%',
    gap: 16,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#FFF', // Beyaz buton
    width: '100%',
    height: 56,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#000', // Siyah buton
    width: '100%',
    height: 56,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#333', // Gri çerçeve
  },
  secondaryButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  brandMono: {
    color: '#333',
    fontSize: 10,
    letterSpacing: 2,
    fontWeight: 'bold',
    marginTop: 10,
  },
});