import { useLocalSearchParams, useRouter } from 'expo-router';
import { PhoneOff, Video, VideoOff } from 'lucide-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, PermissionsAndroid, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  ChannelProfileType,
  ClientRoleType,
  createAgoraRtcEngine,
  IRtcEngine,
  RtcSurfaceView,
} from 'react-native-agora';

const APP_ID = process.env.EXPO_PUBLIC_AGORA_APP_ID || '';
const CHANNEL_NAME = 'focus-room-shared';

export default function SharedRoom() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const agoraEngine = useRef<IRtcEngine | null>(null);
  
  const [isJoined, setIsJoined] = useState(false);
  const [remoteUids, setRemoteUids] = useState<number[]>([]);
  const [isCameraOn, setIsCameraOn] = useState(true);

  // Sayaç Ayarları
  const initialMinutes = params.minutes ? parseInt(params.minutes as string) : 25;
  const [secondsLeft, setSecondsLeft] = useState(initialMinutes * 60);
  const [isActive, setIsActive] = useState(true);

  // 1. useEffect: SADECE AGORA KURULUMU İÇİN (Bir kere çalışır)
  useEffect(() => {
    setupVideoSDKEngine();

    return () => {
      // Sayfadan çıkınca çalışır
      agoraEngine.current?.leaveChannel();
      agoraEngine.current?.release();
    };
  }, []); // <-- Burası boş array, yani sadece ilk girişte çalışır!

  // 2. useEffect: SADECE SAYAÇ İÇİN (Her saniye çalışır)
  useEffect(() => {
    let interval: any = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft(prev => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsActive(false);
      Alert.alert("Süre Bitti", "Odaklanma süresi tamamlandı!");
    }
    return () => clearInterval(interval);
  }, [isActive, secondsLeft]);

  const setupVideoSDKEngine = async () => {
    try {
      if (Platform.OS === 'android') {
        await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
      }

      agoraEngine.current = createAgoraRtcEngine();
      const agora = agoraEngine.current;
      
      agora.initialize({
        appId: APP_ID,
        channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
      });

      agora.enableVideo();
      agora.disableAudio(); // Ses kapalı
      agora.startPreview();

      agora.registerEventHandler({
        onJoinChannelSuccess: () => {
          console.log('Odaya başarıyla girildi');
          setIsJoined(true);
        },
        onUserJoined: (_connection, uid) => {
          console.log('Yeni kullanıcı geldi:', uid);
          setRemoteUids(prev => {
            // Eğer bu kişi zaten listede varsa tekrar ekleme (Hata Çözümü)
            if (prev.includes(uid)) return prev;
            return [...prev, uid];
          });
        },
        onUserOffline: (_connection, uid) => {
          console.log('Kullanıcı çıktı:', uid);
          setRemoteUids(prev => prev.filter(id => id !== uid));
        },
      });

      agora.joinChannel('', CHANNEL_NAME, 0, {
        clientRoleType: ClientRoleType.ClientRoleBroadcaster,
      });

    } catch (e) {
      console.error(e);
      Alert.alert("Hata", "Bağlantı kurulamadı.");
    }
  };

  const formatTime = (totalSeconds: number) => {
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
  };

  const toggleCamera = () => {
    agoraEngine.current?.muteLocalVideoStream(isCameraOn);
    setIsCameraOn(!isCameraOn);
  };

  const handleExit = () => {
    Alert.alert("Çıkış", "Odadan ayrılmak istiyor musun?", [
      { text: "Kal", style: "cancel" },
      { text: "Ayrıl", style: "destructive", onPress: () => router.back() }
    ]);
  };

  const renderVideos = () => {
    // Toplam kişi sayısı (Sen + Diğerleri)
    const totalUsers = 1 + remoteUids.length; 
    const isSingle = totalUsers === 1;

    return (
      <View style={styles.videoGrid}>
        {/* SENİN GÖRÜNTÜN (Local) */}
        <View style={[styles.videoContainer, isSingle ? styles.fullScreen : styles.halfScreen]}>
          {isCameraOn ? (
            <RtcSurfaceView canvas={{ uid: 0 }} style={styles.videoStream} />
          ) : (
            <View style={styles.videoPlaceholder}>
              <Text style={{color:'#555'}}>Kamera Kapalı</Text>
            </View>
          )}
          <View style={styles.nameTag}><Text style={styles.nameText}>Sen</Text></View>
        </View>

        {/* ARKADAŞLARIN GÖRÜNTÜSÜ (Remote) */}
        {remoteUids.map((uid) => (
          <View key={uid} style={[styles.videoContainer, styles.halfScreen]}>
            <RtcSurfaceView 
              canvas={{ uid: uid }} 
              style={styles.videoStream} 
              zOrderMediaOverlay={true} 
            />
            <View style={styles.nameTag}><Text style={styles.nameText}>Arkadaş</Text></View>
          </View>
        ))}
      </View>
    );
  };

  if (!isJoined) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2ecc71" />
        <Text style={{color:'#FFF', marginTop: 20}}>Odaya Bağlanılıyor...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {renderVideos()}

      <View style={styles.overlay}>
        
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>{formatTime(secondsLeft)}</Text>
          <View style={[styles.statusDot, isActive ? {backgroundColor: '#2ecc71'} : {backgroundColor: '#e74c3c'}]} />
        </View>

        <View style={styles.controlsArea}>
          <TouchableOpacity style={[styles.controlBtn, !isCameraOn && styles.btnOff]} onPress={toggleCamera}>
            {isCameraOn ? <Video size={24} color="#000" /> : <VideoOff size={24} color="#FFF" />}
          </TouchableOpacity>

          <TouchableOpacity style={[styles.controlBtn, styles.hangupBtn]} onPress={handleExit}>
            <PhoneOff size={28} color="#FFF" />
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  loadingContainer: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
  
  videoGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  videoContainer: {
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#1a1a1a',
    backgroundColor: '#111',
  },
  fullScreen: { width: '100%', height: '100%' },
  halfScreen: { width: '50%', height: '50%' }, // İki kişi yan yana veya alt alta
  
  videoStream: { flex: 1 },
  videoPlaceholder: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#222' },
  
  nameTag: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  nameText: { color: '#FFF', fontSize: 12 },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    paddingVertical: 60,
    paddingHorizontal: 20,
    pointerEvents: 'box-none', // Dokunmaları videoya geçirmek için (gerekirse)
  },
  
  timerContainer: {
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  timerText: { color: '#FFF', fontSize: 24, fontWeight: 'bold', fontVariant: ['tabular-nums'] },
  statusDot: { width: 8, height: 8, borderRadius: 4 },

  controlsArea: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20, 
  },
  controlBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  btnOff: { backgroundColor: '#333', borderWidth: 1, borderColor: '#555' },
  hangupBtn: { backgroundColor: '#FF453A' },
});