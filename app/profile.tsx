import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, BookOpen, BrainCircuit, CheckCircle2, Clock, Edit3, Settings, Sigma } from 'lucide-react-native';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* HEADER (Geri ve Ayarlar) */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
            <ArrowLeft size={24} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Settings size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* PROFIL BİLGİSİ */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=400&auto=format&fit=crop' }} 
              style={styles.avatar} 
            />
            <View style={styles.onlineIndicator} />
          </View>
          <Text style={styles.userName}>Ahmet Yılmaz</Text>
          <Text style={styles.userEmail}>ahmet.yilmaz@example.com</Text>
        </View>

        {/* İSTATİSTİK KARTLARI */}
        <View style={styles.statsRow}>
          {/* Kart 1 */}
          <View style={styles.statCard}>
            <View style={styles.statIconBox}>
              <Clock size={20} color="#a0c4ff" /> 
            </View>
            <Text style={styles.statNumber}>128</Text>
            <Text style={styles.statLabel}>HOURS FOCUSED</Text>
          </View>

          {/* Kart 2 */}
          <View style={styles.statCard}>
            <View style={[styles.statIconBox, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
              <CheckCircle2 size={20} color="#FFF" />
            </View>
            <Text style={styles.statNumber}>42</Text>
            <Text style={styles.statLabel}>SESSIONS DONE</Text>
          </View>
        </View>

        {/* SON AKTİVİTELER */}
        <Text style={styles.sectionTitle}>RECENT ACTIVITY</Text>

        <View style={styles.activityList}>
          {/* Aktivite 1 */}
          <View style={styles.activityItem}>
            <View style={styles.activityIconBox}>
              <BrainCircuit size={24} color="#FFF" />
            </View>
            <View style={styles.activityInfo}>
              <Text style={styles.activityTitle}>Deep Work</Text>
              <Text style={styles.activitySub}>Today, 2:30 PM</Text>
            </View>
            <View style={styles.tagBadge}>
              <Text style={styles.tagText}>45m</Text>
            </View>
          </View>

          {/* Aktivite 2 */}
          <View style={styles.activityItem}>
            <View style={styles.activityIconBox}>
              <Sigma size={24} color="#FFF" />
            </View>
            <View style={styles.activityInfo}>
              <Text style={styles.activityTitle}>Math Study</Text>
              <Text style={styles.activitySub}>Yesterday</Text>
            </View>
            <View style={styles.tagBadge}>
              <Text style={styles.tagText}>120m</Text>
            </View>
          </View>

          {/* Aktivite 3 */}
          <View style={styles.activityItem}>
            <View style={styles.activityIconBox}>
              <BookOpen size={24} color="#FFF" />
            </View>
            <View style={styles.activityInfo}>
              <Text style={styles.activityTitle}>Reading</Text>
              <Text style={styles.activitySub}>2 days ago</Text>
            </View>
            <View style={styles.tagBadge}>
              <Text style={styles.tagText}>30m</Text>
            </View>
          </View>
        </View>

        {/* EDIT BUTONU */}
        <TouchableOpacity style={styles.editButton}>
          <Edit3 size={18} color="#FFF" style={{ marginRight: 10 }} />
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 30,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Profil
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#1a1a1a',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#2ecc71', // Yeşil nokta
    borderWidth: 3,
    borderColor: '#000',
  },
  userName: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    color: '#666',
    fontSize: 14,
  },

  // İstatistikler
  statsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#0a0a0a', // Çok koyu gri
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#222',
  },
  statIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(160, 196, 255, 0.2)', // Timer ikonunun arkasındaki hafif mavi
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  statNumber: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    color: '#666',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },

  // Aktivite Listesi
  sectionTitle: {
    color: '#666',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 16,
    marginTop: 10,
  },
  activityList: {
    gap: 12,
    marginBottom: 30,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0a0a0a',
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#222',
  },
  activityIconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  activitySub: {
    color: '#666',
    fontSize: 12,
  },
  tagBadge: {
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  tagText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },

  // Edit Butonu
  editButton: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  editButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});