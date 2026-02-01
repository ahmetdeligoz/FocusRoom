import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, Lock, User } from 'lucide-react-native';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView, Platform, ScrollView,
    StyleSheet, Text,
    TextInput, TouchableOpacity,
    View
} from 'react-native';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleSendCode = () => {
    // Şimdilik sadece uyarı gösterelim
    Alert.alert("Kod Gönderildi", "E-posta adresinizi kontrol edin.");
    // İleride buraya backend kodu gelecek
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* HEADER (Geri Butonu) */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* İÇERİK */}
        <View style={styles.content}>
          
          {/* Başlıklar */}
          <Text style={styles.title}>Şifremi Unuttum</Text>
          <Text style={styles.subtitle}>
            Hesabınıza bağlı e-posta adresinizi girerek şifre yenileme kodunuzu alabilirsiniz.
          </Text>

          {/* İkon Alanı (Yuvarlak Profil + Kilit) */}
          <View style={styles.iconContainer}>
            <View style={styles.userIconCircle}>
              <User size={40} color="#666" />
            </View>
            <View style={styles.lockBadge}>
              <Lock size={14} color="#000" />
            </View>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <Text style={styles.label}>E-POSTA ADRESİ</Text>
            <TextInput
              style={styles.input}
              placeholder="isim@mail.com"
              placeholderTextColor="#666"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TouchableOpacity style={styles.sendButton} onPress={handleSendCode}>
              <Text style={styles.sendButtonText}>Kod Gönder</Text>
            </TouchableOpacity>
          </View>

        </View>

        {/* Footer (Giriş Ekranına Dön) */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.returnButton} onPress={() => router.back()}>
            <ArrowLeft size={16} color="#FFF" style={{marginRight: 8}} />
            <Text style={styles.returnText}>Giriş ekranına dön</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  scrollContainer: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 60, paddingBottom: 40, justifyContent: 'space-between' },
  
  header: { alignItems: 'flex-start', marginBottom: 20 },
  backButton: { padding: 8, marginLeft: -8 },

  content: { alignItems: 'center', width: '100%' },
  
  title: { fontSize: 24, fontWeight: 'bold', color: '#FFF', marginBottom: 12, textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#888', textAlign: 'center', lineHeight: 20, marginBottom: 40, paddingHorizontal: 10 },

  // İkon Stilleri
  iconContainer: { position: 'relative', marginBottom: 40 },
  userIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFF', // Beyaz kilit rozeti
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#000', // Siyah çerçeve ile ayrım
  },

  // Form Stilleri
  form: { width: '100%' },
  label: { color: '#666', fontSize: 10, fontWeight: 'bold', marginBottom: 8, letterSpacing: 1 },
  input: {
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 12,
    padding: 16,
    color: '#FFF',
    fontSize: 16,
    marginBottom: 24,
  },
  sendButton: {
    backgroundColor: '#FFF',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
  },
  sendButtonText: { color: '#000', fontSize: 16, fontWeight: 'bold' },

  // Footer Stilleri
  footer: { alignItems: 'center', marginTop: 40 },
  returnButton: { flexDirection: 'row', alignItems: 'center', padding: 10 },
  returnText: { color: '#FFF', fontSize: 14 },
});