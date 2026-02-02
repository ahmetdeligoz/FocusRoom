import { useLocalSearchParams, useRouter } from 'expo-router';
import { Mic, MicOff, Pause, Play, VideoOff, X } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';

// Mock Data
const MOCK_FRIENDS_LOOKUP: Record<string, { name: string, color: string }> = {
  '1': { name: 'Yusuf', color: '#304ffe' },
  '2': { name: 'Ahmet', color: '#c0392b' },
  '3': { name: 'Ayşe', color: '#27ae60' },
  '4': { name: 'Mehmet', color: '#f39c12' },
  '5': { name: 'Zeynep', color: '#8e44ad' },
};

export default function SharedRoom() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const invitedFriendIds = params.friends ? JSON.parse(params.friends as string) : [];

  // Params'dan gelen dakikayı al, yoksa 25 yap
  const initialMinutes = params.minutes ? parseInt(params.minutes as string) : 25;
  
  const [secondsLeft, setSecondsLeft] = useState(initialMinutes * 60);
  const [isActive, setIsActive] = useState(true);
  const [isMicOn, setIsMicOn] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => setSecondsLeft(prev => prev - 1), 1000);
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
      "Odadan Ayrıl",
      "Ortak çalışma odasından çıkmak istediğine emin misin?",
      [
        { text: "Vazgeç", style: "cancel" },
        { text: "Çık", style: "destructive", onPress: () => router.push('/home') }
      ]
    );
  };

  const ParticipantsBar = () => (
    <View style={styles.participantsContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
        <View style={styles.participantBadge}>
           <View style={[styles.avatar, { backgroundColor: '#333' }]}>
             <Text style={styles.avatarText}>ME</Text>
           </View>
           <View style={styles.micIcon}>
             {isMicOn ? <Mic size={12} color="#FFF" /> : <MicOff size={12} color="#f00" />}
           </View>
        </View>
        {invitedFriendIds.map((id: string) => {
          const friend = MOCK_FRIENDS_LOOKUP[id] || { name: 'Guest', color: '#555' };
          return (
            <View key={id} style={styles.participantBadge}>
              <View style={[styles.avatar, { backgroundColor: friend.color }]}>
                <Text style={styles.avatarText}>{friend.name[0]}</Text>
              </View>
              <View style={styles.micIcon}>
                 <MicOff size={12} color="#f00" />
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );

  const TimerComponent = () => (
    <View style={styles.timerWrapper}>
      <Text style={[styles.timerText, { fontSize: isLandscape ? 80 : 100 }]}>
        {formatTime(secondsLeft)}
      </Text>
      <Text style={styles.statusText}>{isActive ? "Deep Work Together" : "Session Paused"}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <ParticipantsBar />
        <TouchableOpacity style={styles.exitButton} onPress={handleExit}>
          <X size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <TimerComponent />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => setIsMicOn(!isMicOn)}>
          {isMicOn ? <Mic size={24} color="#FFF" /> : <MicOff size={24} color="#666" />}
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.playButton, isActive ? { backgroundColor: '#FFF' } : { backgroundColor: '#333', borderWidth: 1, borderColor: '#555' }]} 
          onPress={() => setIsActive(!isActive)}
        >
          {isActive ? <Pause size={32} color="#000" /> : <Play size={32} color="#FFF" />}
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn}>
          <VideoOff size={24} color="#666" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  exitButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  participantsContainer: {
    flex: 1,
    marginRight: 20,
  },
  participantBadge: {
    position: 'relative',
    marginRight: 5,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#111',
  },
  avatarText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  micIcon: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#000',
    borderRadius: 8,
    padding: 2,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerWrapper: {
    alignItems: 'center',
  },
  timerText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontVariant: ['tabular-nums'],
  },
  statusText: {
    color: '#666',
    fontSize: 16,
    marginTop: 10,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  iconBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});