import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { LayoutGrid, PhoneOff, Video, VideoOff } from 'lucide-react-native'; // Mic ikonlarını sildik
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  // micOn state'ini SİLDİK, artık ihtiyacımız yok
  const [cameraOn, setCameraOn] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // --- KONTROL BUTONLARI (SADELEŞTİ) ---
  const ControlsComponent = ({ isFloating = false }) => (
    <BlurView 
      intensity={isFloating ? 40 : 0} 
      tint="dark" 
      style={[styles.buttonRow, isFloating && styles.floatingControls]}
    >
      {/* Kamera Butonu */}
      <TouchableOpacity 
        style={[styles.iconButton, !cameraOn && styles.iconButtonOff]} 
        onPress={() => setCameraOn(!cameraOn)}
      >
        {cameraOn ? <Video size={32} color="#000" /> : <VideoOff size={32} color="#FFF" />}
      </TouchableOpacity>

      {/* Mikrofon Butonu BURADAYDI - SİLDİK */}

      {/* Kapatma Butonu */}
      <TouchableOpacity style={[styles.iconButton, styles.endCallButton]}>
        <PhoneOff size={32} color="#FFF" />
      </TouchableOpacity>
    </BlurView>
  );

  // --- ODALAR BUTONU ---
  const RoomsButton = () => (
    <TouchableOpacity 
      style={styles.roomsButton} 
      onPress={() => router.push('/rooms')}
    >
      <LayoutGrid size={24} color="#FFF" />
      <Text style={styles.roomsButtonText}>Odalar</Text>
    </TouchableOpacity>
  );

  // === DİK MOD (PORTRAIT) ===
  if (!isLandscape) {
    return (
      <View style={styles.portraitContainer}>
        <SafeAreaView style={styles.portraitTopSection}>
          <View style={styles.topBar}>
            <RoomsButton />
          </View>
          <View style={styles.clockWrapper}>
            <Text style={styles.portraitClockText}>{formattedTime}</Text>
            <Text style={styles.portraitDateText}>Sessiz Oda • Focus 1/4</Text>
          </View>
        </SafeAreaView>

        <View style={styles.portraitBottomSection}>
          <View style={styles.portraitVideoCard}>
            {cameraOn ? (
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=600&auto=format&fit=crop' }} 
                style={styles.fullScreenVideo} 
              />
            ) : (
               <View style={[styles.fullScreenVideo, styles.videoOffPlaceholder]}>
                  <VideoOff size={60} color="#555" />
                  <Text style={{color: '#555', marginTop: 10}}>Kamera Kapalı</Text>
               </View>
            )}
            <View style={styles.nameTagFloating}>
               <Text style={styles.nameText}>Sen</Text>
            </View>
            <View style={styles.bottomFloatingContainer}>
              <ControlsComponent isFloating={true} />
            </View>
          </View>
        </View>
      </View>
    );
  }

  // === YAN MOD (LANDSCAPE) ===
  return (
    <SafeAreaView style={styles.landscapeContainer}>
      <View style={{position: 'absolute', top: 20, right: 20, zIndex: 10}}>
         <RoomsButton />
      </View>

      <View style={styles.cardContainerLandscape}>
        <BlurView intensity={20} tint="dark" style={styles.blurContainerRow}>
          <View style={styles.videoWrapperLandscape}>
            {cameraOn ? (
               <Image 
                 source={{ uri: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=400&auto=format&fit=crop' }} 
                 style={styles.fullScreenVideo} 
               />
            ) : (
               <View style={[styles.fullScreenVideo, styles.videoOffPlaceholder]}>
                 <VideoOff size={40} color="#555" />
               </View>
            )}
            <View style={styles.nameTag}>
              <Text style={styles.nameText}>Sen</Text>
            </View>
          </View>

          <View style={styles.landscapeControls}>
            <Text style={styles.clockTextLandscape}>{formattedTime}</Text>
            <ControlsComponent />
          </View>
        </BlurView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // YENİ STİLLER (Top Bar vb.)
  topBar: {
    position: 'absolute',
    top: 50,
    right: 30,
    zIndex: 10,
  },
  roomsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 25,
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  roomsButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  clockWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  
  // DİK MOD
  portraitContainer: { flex: 1, backgroundColor: '#000' },
  portraitTopSection: { flex: 0.35, justifyContent: 'center', alignItems: 'center' },
  portraitClockText: { color: '#FFF', fontSize: 90, fontWeight: 'bold', fontVariant: ['tabular-nums'] },
  portraitDateText: { color: '#888', fontSize: 18, marginTop: -5, fontWeight: '500', letterSpacing: 1 },
  portraitBottomSection: { flex: 0.65, backgroundColor: '#000', paddingHorizontal: 40, paddingBottom: 80, justifyContent: 'center' },
  portraitVideoCard: { 
    flex: 1, 
    borderRadius: 40, 
    overflow: 'hidden', 
    position: 'relative', 
    backgroundColor: '#1a1a1a', 
    borderWidth: 1, 
    borderColor: '#333', 
    marginBottom: 10 
  },
  
  // YAN MOD
  landscapeContainer: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
  cardContainerLandscape: { width: 820, height: 350, borderRadius: 35, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(0, 0, 0, 0.1)' },
  blurContainerRow: { flex: 1, flexDirection: 'row', padding: 30, alignItems: 'center', justifyContent: 'space-around' },
  videoWrapperLandscape: { width: 300, height: 290, borderRadius: 20, overflow: 'hidden', position: 'relative', backgroundColor: '#1a1a1a' },
  landscapeControls: { alignItems: 'center', gap: 20 },
  clockTextLandscape: { color: '#FFF', fontSize: 75, fontWeight: 'bold', fontVariant: ['tabular-nums'] },

  // ORTAK
  fullScreenVideo: { width: '100%', height: '100%', resizeMode: 'cover' },
  bottomFloatingContainer: { position: 'absolute', bottom: 30, width: '100%', alignItems: 'center' },
  floatingControls: { borderRadius: 40, paddingHorizontal: 30, paddingVertical: 20, overflow: 'hidden', backgroundColor: 'rgba(0,0,0,0.4)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  nameTagFloating: { position: 'absolute', top: 20, left: 20, backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  nameTag: { position: 'absolute', bottom: 10, left: 10, backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 },
  nameText: { color: '#FFF', fontSize: 14, fontWeight: '600' },
  buttonRow: { flexDirection: 'row', gap: 30 }, // Butonlar arası boşluğu biraz açtım
  iconButton: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center' }, // Butonları biraz büyüttüm
  iconButtonOff: { backgroundColor: '#333' },
  endCallButton: { backgroundColor: '#FF453A' },
  videoOffPlaceholder: { backgroundColor: '#1a1a1a', justifyContent: 'center', alignItems: 'center' },
});