import { useRouter } from 'expo-router';
import { Target, User } from 'lucide-react-native';
import React, { useState } from 'react';
import { Dimensions, FlatList, NativeScrollEvent, NativeSyntheticEvent, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = 80;
const SPACING = (width - ITEM_WIDTH) / 2;

export default function Home() {
  const router = useRouter();
  
  // Başlangıç değerimiz 15
  const [minutes, setMinutes] = useState(5);
  
  const times = Array.from({ length: 60 }, (_, i) => (i + 1) * 5);

  // --- KRİTİK HESAPLAMA ---
  // 15 sayısının listede kaçıncı sırada olduğunu buluyoruz.
  // 5, 10, 15 -> Index 2 (yani 3. eleman)
  const initialIndex = times.indexOf(5); 

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / ITEM_WIDTH);
    if (index >= 0 && index < times.length) {
      setMinutes(times[index]);
    }
  };

  const getFormattedTime = (mins: number) => {
    if (mins < 60) return mins;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (m === 0) return `${h}h`;
    return `${h}h ${m}m`;
  };

  const isLongText = minutes >= 60; 

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

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
        <TouchableOpacity style={styles.profileButton} onPress={() => router.push('/profile')}>
          <User size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.timerWrapper}>
        
        <Text style={[styles.timerText, { fontSize: 90 }]}>
          {getFormattedTime(minutes)}
        </Text>
        
        <Text style={styles.timerSubText}>
          {minutes < 60 ? 'minutes' : 'duration'}
        </Text>

        <View style={styles.indicatorTriangle} />

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
            
            // --- DÜZELTME BAŞLANGICI ---
            // 1. Liste açılınca direkt hesapladığımız index'e (15 dk'ya) gitsin
            initialScrollIndex={initialIndex}

            // 2. Performans ve hatasız kaydırma için boyutları önceden bildiriyoruz
            getItemLayout={(data, index) => ({
              length: ITEM_WIDTH,
              offset: ITEM_WIDTH * index,
              index,
            })}
            // --- DÜZELTME BİTİŞİ ---

            renderItem={({ item }) => {
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

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.primaryButton} 
          onPress={() => {
            router.push({ pathname: '/focusroom', params: { minutes: minutes } });
          }}
        >
          <Text style={styles.primaryButtonText}>Kendin Çalış</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.secondaryButton} 
          onPress={() => {
             router.push({ pathname: '/invite', params: { minutes: minutes } });
          }}
        >
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

  timerWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  timerText: {
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