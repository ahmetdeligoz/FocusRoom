import { useRouter } from 'expo-router';
import { Target, User } from 'lucide-react-native';
import React, { useState } from 'react';
import { Dimensions, FlatList, NativeScrollEvent, NativeSyntheticEvent, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = 80; // Her bir zaman diliminin genişliği
const SPACING = (width - ITEM_WIDTH) / 2; // Ortalamak için boşluk

export default function Home() {
  const router = useRouter();
  const [minutes, setMinutes] = useState(15);
  
  // GÜNCELLEME 1: Maksimum süreyi 5 saate (300 dk) çıkardık
  const times = Array.from({ length: 60 }, (_, i) => (i + 1) * 5);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / ITEM_WIDTH);
    if (index >= 0 && index < times.length) {
      setMinutes(times[index]);
    }
  };

  // GÜNCELLEME 2: Süreyi Saat/Dakika formatına çeviren fonksiyon
  const getFormattedTime = (mins: number) => {
    if (mins < 60) return mins; // 60'tan küçükse direkt sayıyı dön
    
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    
    if (m === 0) return `${h}h`; // Tam saatsa (örn: 2h)
    return `${h}h ${m}m`; // Küsuratlıysa (örn: 1h 30m)
  };

  // Yazı uzunluğuna göre fontu ayarlayalım
  const isLongText = minutes >= 60; 

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.headerBar}>
        <View style={styles.brandContainer}>
          <View style={styles.logoBox}>
            <Target size={24} color="#FFF" />
          </View>
          <View>
            <Text style={styles.appName}>FocusRoom</Text>
            <Text style={styles.tagline}>Deep work.</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <User size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* ORTA ALAN: ZAMAN VE CETVEL */}
      <View style={styles.timerWrapper}>
        
        {/* GÜNCELLEME 3: Formatlı Zaman Göstergesi */}
        <Text style={[styles.timerText, { fontSize: isLongText ? 90 : 90}]}>
          {getFormattedTime(minutes)}
        </Text>
        
        {/* Alt metin: Dakika ise "minutes", saat ise "duration" */}
        <Text style={styles.timerSubText}>
          {minutes < 60 ? 'minutes' : 'duration'}
        </Text>

        {/* Mavi İmleç */}
        <View style={styles.indicatorTriangle} />

        {/* Kaydırılabilir Cetvel */}
        <View style={styles.rulerContainer}>
          <FlatList
            data={times}
            keyExtractor={(item) => item.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={ITEM_WIDTH}
            decelerationRate="fast"
            contentContainerStyle={{ paddingHorizontal: SPACING }}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            renderItem={({ item }) => {
              // Sadece saat başlarını (60, 120...) ve buçukları (30, 90...) belirgin yap
              const isMajor = item % 30 === 0; 
              
              return (
                <View style={[styles.rulerItem, { width: ITEM_WIDTH }]}>
                  <View style={[styles.rulerLine, isMajor ? styles.majorLine : styles.minorLine]} />
                  <Text style={[styles.rulerText, { opacity: isMajor ? 1 : 0.5 }]}>
                    {item}
                  </Text>
                </View>
              );
            }}
          />
        </View>
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.primaryButton} 
          onPress={() => {
            router.push({ pathname: '/focusroom', params: { minutes: minutes } });
          }}
        >
          <Text style={styles.primaryButtonText}>Kendin Çalış</Text>
        </TouchableOpacity>

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
    backgroundColor: '#000',
  },
  headerBar: {
    marginTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  brandContainer: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  logoBox: { width: 44, height: 44, backgroundColor: '#1a1a1a', borderRadius: 12, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#333' },
  appName: { fontSize: 20, fontWeight: 'bold', color: '#FFF' },
  tagline: { fontSize: 12, color: '#666' },
  profileButton: { width: 44, height: 44, backgroundColor: '#1a1a1a', borderRadius: 22, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#333' },

  // --- TIMER & RULER STYLES ---
  timerWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  timerText: {
    // fontSize dinamik olarak style prop içinde veriliyor
    color: '#FFF',
    fontWeight: 'bold',
    letterSpacing: -2,
    textAlign: 'center',
  },
  timerSubText: {
    fontSize: 18,
    color: '#666',
    fontWeight: '500',
    marginBottom: 40,
    marginTop: 5,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  
  indicatorTriangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 15,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#ffffff',
    marginBottom: 10,
    zIndex: 10,
  },

  rulerContainer: {
    height: 100,
    width: '100%',
  },
  rulerItem: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  rulerLine: {
    width: 2,
    backgroundColor: '#FFF',
    borderRadius: 2,
  },
  majorLine: {
    height: 40,
    backgroundColor: '#FFF',
  },
  minorLine: {
    height: 20,
    backgroundColor: '#333',
    marginTop: 0,
  },
  rulerText: {
    color: '#FFF',
    marginTop: 15,
    fontSize: 14,
    fontWeight: '600',
  },

  // --- FOOTER ---
  footer: {
    width: '100%',
    gap: 16,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  primaryButton: { backgroundColor: '#FFF', width: '100%', height: 56, borderRadius: 30, alignItems: 'center', justifyContent: 'center' },
  primaryButtonText: { color: '#000', fontSize: 16, fontWeight: 'bold' },
  secondaryButton: { backgroundColor: '#000', width: '100%', height: 56, borderRadius: 30, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#333' },
  secondaryButtonText: { color: '#FFF', fontSize: 16, fontWeight: '600' },
  brandMono: { color: '#333', fontSize: 10, letterSpacing: 2, fontWeight: 'bold', marginTop: 10 },
});