import { FontAwesome } from '@expo/vector-icons'; // Google logosu için
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Eye, EyeOff, Target } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView, Platform, ScrollView,
  StyleSheet, Text,
  TextInput, TouchableOpacity,
  View
} from 'react-native';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // Burada normalde backend kontrolü yapılır
    // Şimdilik direkt ana sayfaya (home) yönlendiriyoruz
    router.replace('/home');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* LOGO ALANI */}
        <View style={styles.header}>
          <View style={styles.logoBox}>
            <Target size={40} color="#FFF" />
          </View>
          <Text style={styles.appName}>FocusRoom</Text>
          <Text style={styles.tagline}>Birlikte derin çalışma.</Text>
        </View>

        {/* FORM ALANI */}
        <View style={styles.form}>
          
          {/* E-posta Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>E-posta</Text>
            <TextInput
              style={styles.input}
              placeholder="name@example.com"
              placeholderTextColor="#666"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Şifre Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Şifre</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Şifrenizi girin"
                placeholderTextColor="#666"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? 
                  <Eye size={20} color="#666" /> : 
                  <EyeOff size={20} color="#666" />
                }
              </TouchableOpacity>
            </View>
          </View>

          {/* Şifremi Unuttum */}
          <TouchableOpacity style={styles.forgotButton} onPress={() => router.push('/forgot-password')}>
            <Text style={styles.forgotText}>Şifremi Unuttum?</Text>
          </TouchableOpacity>

          {/* Giriş Yap Butonu */}
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Giriş Yap</Text>
          </TouchableOpacity>

          {/* Bölücü Çizgi */}
          <View style={styles.dividerContainer}>
            <View style={styles.line} />
            <Text style={styles.orText}>VEYA ŞUNUNLA DEVAM ET</Text>
            <View style={styles.line} />
          </View>

          {/* Sosyal Medya Butonları */}
          <View style={styles.socialRow}>
            {/* Google */}
            <TouchableOpacity style={styles.socialButton}>
              <FontAwesome name="google" size={20} color="#FFF" />
              <Text style={styles.socialText}>Google</Text>
            </TouchableOpacity>

            {/* Apple */}
            <TouchableOpacity style={styles.socialButton}>
              <FontAwesome name="apple" size={22} color="#FFF" />
              <Text style={styles.socialText}>Apple</Text>
            </TouchableOpacity>
          </View>

        </View>

        {/* Alt Bilgi (Footer) */}
       <View style={styles.footer}>
            <TouchableOpacity onPress={() => router.push('/signup')}>
              <Text style={styles.footerText}>
                Hesabınız yok mu? <Text style={styles.signUpText}>Kayıt Ol</Text>
              </Text>
            </TouchableOpacity>
            <Text style={styles.brandMono}>● FOCUSROOM MONO ●</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    paddingVertical: 60,
  },
  
  // Header
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoBox: {
    width: 64,
    height: 64,
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: '#888',
  },

  // Form
  form: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: '#FFF',
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 12,
    padding: 16,
    color: '#FFF',
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 16,
    color: '#FFF',
    fontSize: 16,
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotText: {
    color: '#888',
    fontSize: 14,
  },

  // Butonlar
  loginButton: {
    backgroundColor: '#FFF',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 30,
  },
  loginButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Bölücü
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#333',
  },
  orText: {
    color: '#666',
    paddingHorizontal: 16,
    fontSize: 10, // Biraz küçülttüm sığması için
    fontWeight: '600',
    letterSpacing: 1,
  },

  // Sosyal Medya
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: '#333',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 10,
  },
  socialText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },

  // Footer
  footer: {
    marginTop: 40,
    alignItems: 'center',
    gap: 20,
  },
  footerText: {
    color: '#888',
    fontSize: 14,
  },
  signUpText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  brandMono: {
    color: '#333',
    fontSize: 10,
    letterSpacing: 2,
    fontWeight: 'bold',
    marginTop: 10,
  },
});