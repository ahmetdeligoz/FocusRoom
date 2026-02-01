import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pause, Play, X } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Alert, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function FocusRoom() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const initialMinutes = params.minutes ? parseInt(params.minutes as string) : 25;
  const [secondsLeft, setSecondsLeft] = useState(initialMinutes * 60);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    // HATA ÇÖZÜMÜ: Burayı 'any' yaptık.
    let interval: any = null;

    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsActive(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, secondsLeft]);

  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
  };

  const handleExit = () => {
    Alert.alert(
      "Odadan Çık",
      "Odadak çıkmak istediğine emin misin? Odaklanma süren iptal edilecek.",
      [
        { text: "Vazgeç", style: "cancel" },
        { text: "Çık", style: "destructive", onPress: () => router.back() }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={handleExit}>
          <X size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.roomTitle}>Focus Mode</Text>
        <View style={{ width: 44 }} />
      </View>

      {/* TIMER */}
      <View style={styles.timerContainer}>
        <View style={styles.timerCircle}>
          <Text style={styles.timerText}>{formatTime(secondsLeft)}</Text>
          <Text style={styles.statusText}>{isActive ? "Focusing..." : "Paused"}</Text>
        </View>
      </View>

      {/* CONTROLS */}
      <View style={styles.footer}>
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
  timerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  timerCircle: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 2,
    borderColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#050505',
  },
  timerText: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#FFF',
    fontVariant: ['tabular-nums'],
  },
  statusText: {
    color: '#666',
    fontSize: 18,
    marginTop: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  footer: {
    alignItems: 'center',
    gap: 30,
  },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 180,
    height: 60,
    borderRadius: 30,
    gap: 10,
  },
  pauseBtn: {
    backgroundColor: '#FFF',
  },
  resumeBtn: {
    backgroundColor: '#333',
    borderWidth: 1,
    borderColor: '#555',
  },
  btnTextBlack: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  btnTextWhite: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quote: {
    color: '#333',
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'center',
  }
});