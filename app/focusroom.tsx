import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pause, Play, X } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Alert, StatusBar, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';

export default function FocusRoom() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { width, height } = useWindowDimensions();
  
  const isLandscape = width > height;

  const initialMinutes = params.minutes ? parseInt(params.minutes as string) : 25;
  const [secondsLeft, setSecondsLeft] = useState(initialMinutes * 60);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval: any = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsActive(false);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [isActive, secondsLeft]);

  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    if (h > 0) {
      return `${h}:${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
    }
    return `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
  };

  const handleExit = () => {
    Alert.alert(
      "Odadan Çık",
      "Odaklanma süren iptal edilecek.",
      [
        { text: "Vazgeç", style: "cancel" },
        { text: "Çık", style: "destructive", onPress: () => router.back() }
      ]
    );
  };

  // --- ORTAK BİLEŞENLER ---
  
  const TimerComponent = () => {
    const hasHours = secondsLeft >= 3600;
    const dynamicFontSize = hasHours ? 90 : 120;

    return (
      <View style={styles.timerContainerNoBorder}>
        <Text style={[styles.timerText, { fontSize: isLandscape ? 80 : dynamicFontSize }]}>
          {formatTime(secondsLeft)}
        </Text>
        <Text style={styles.statusText}>{isActive ? "Focusing..." : "Paused"}</Text>
      </View>
    );
  };

  const ControlButton = () => (
    <TouchableOpacity 
      style={[styles.controlButton, isActive ? styles.pauseBtn : styles.resumeBtn]} 
      onPress={() => setIsActive(!isActive)}
    >
      {isActive ? (
        <>
          <Pause size={24} color="#000" />
          <Text style={styles.btnTextBlack}>Pause</Text>
        </>
      ) : (
        <>
          <Play size={24} color="#FFF" />
          <Text style={styles.btnTextWhite}>Resume</Text>
        </>
      )}
    </TouchableOpacity>
  );

  const ExitButton = () => (
    <TouchableOpacity style={styles.iconButton} onPress={handleExit}>
      <X size={24} color="#FFF" />
    </TouchableOpacity>
  );

  // --- LAYOUT ---

  if (isLandscape) {
    return (
      <View style={[styles.container, { flexDirection: 'row', paddingBottom: 20 }]}>
        <StatusBar hidden /> 
        
        {/* SOL: Sayaç */}
        <View style={styles.landscapeLeft}>
          <TimerComponent />
        </View>

        {/* SAĞ: Kontroller */}
        <View style={styles.landscapeRight}>
          
          {/* HEADER: DÜZELTME BURADA YAPILDI */}
          <View style={styles.landscapeHeader}>
             {/* Sağdaki buton kadar boşluk bırak ki başlık tam ortaya gelsin */}
             <View style={{ width: 44 }} />
             
             <Text style={styles.roomTitle}>Focus Mode</Text>
             
             <ExitButton />
          </View>
          
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <ControlButton />
          </View>
          
          <Text style={styles.quote}>"Deep work is a superpower."</Text>
        </View>
      </View>
    );
  }

  // DİKEY MOD
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <ExitButton />
        <Text style={styles.roomTitle}>Focus Mode</Text>
        {/* Dikey modda dengelemek için zaten boş kutu koymuştuk */}
        <View style={{ width: 44 }} />
      </View>

      <View style={styles.timerContainer}>
        <TimerComponent />
      </View>

      <View style={styles.footer}>
        <ControlButton />
        <Text style={styles.quote}>"Deep work is the superpower of the 21st century."</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingBottom: 50,
  },
  header: {
    marginTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  roomTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  timerContainer: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  timerContainerNoBorder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    fontWeight: 'bold',
    color: '#FFF',
    fontVariant: ['tabular-nums'],
    textAlign: 'center',
  },
  statusText: {
    color: '#666',
    fontSize: 18,
    marginTop: 0,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  footer: { alignItems: 'center', gap: 30 },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 180,
    height: 60,
    borderRadius: 30,
    gap: 10,
  },
  pauseBtn: { backgroundColor: '#FFF' },
  resumeBtn: { backgroundColor: '#333', borderWidth: 1, borderColor: '#555' },
  btnTextBlack: { color: '#000', fontSize: 18, fontWeight: 'bold' },
  btnTextWhite: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  quote: { color: '#333', fontSize: 12, fontStyle: 'italic', textAlign: 'center' },
  
  // Landscape Styles
  landscapeLeft: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  landscapeRight: { flex: 1, justifyContent: 'space-between', alignItems: 'center', paddingVertical: 20 },
  landscapeHeader: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20 },
});