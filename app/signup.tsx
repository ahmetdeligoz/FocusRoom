import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Check, ChevronDown, Eye, EyeOff, Target } from 'lucide-react-native';
import React, { useState } from 'react';
import {
    FlatList,
    KeyboardAvoidingView,
    Modal,
    Platform, ScrollView,
    StyleSheet, Text,
    TextInput, TouchableOpacity,
    View
} from 'react-native';

// TİP TANIMLAMASI (HATA BURADAN ÇIKIYORDU, BUNU EKLEDİK)
type Language = {
  id: string;
  label: string;
};

// Dil seçeneklerimiz
const LANGUAGES: Language[] = [
  { id: 'tr', label: 'Türkçe (Türkiye)' },
  { id: 'en', label: 'English (United States)' },
  { id: 'de', label: 'Deutsch' },
  { id: 'fr', label: 'Français' },
  { id: 'es', label: 'Español' },
  { id: 'it', label: 'Italiano' },
  { id: 'jp', label: '日本語' },
];

export default function SignupScreen() {
  const router = useRouter();
  
  // Form State'leri
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // UI State'leri
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  // DİL SEÇİMİ
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(LANGUAGES[0]);
  const [showLangModal, setShowLangModal] = useState(false);

  const handleSignup = () => {
    router.replace('/home');
  };

  // HATA VEREN YERİ DÜZELTTİK: (lang: Language) dedik
  const handleSelectLanguage = (lang: Language) => {
    setSelectedLanguage(lang);
    setShowLangModal(false);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.logoBox}>
            <Target size={32} color="#FFF" />
          </View>
          <Text style={styles.appName}>FocusRoom</Text>
          <Text style={styles.tagline}>Kendi alanını oluştur.</Text>
        </View>

        {/* FORM */}
        <View style={styles.form}>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Ad Soyad</Text>
            <TextInput
              style={styles.input}
              placeholder="Ali Yılmaz"
              placeholderTextColor="#666"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>E-posta</Text>
            <TextInput
              style={styles.input}
              placeholder="isim@ornek.com"
              placeholderTextColor="#666"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Şifre</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Şifre oluştur"
                placeholderTextColor="#666"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? <Eye size={20} color="#666" /> : <EyeOff size={20} color="#666" />}
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Şifreyi Onayla</Text>
            <TextInput
              style={styles.input}
              placeholder="Şifreyi tekrarla"
              placeholderTextColor="#666"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={true}
            />
          </View>

          {/* DİL SEÇİMİ */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Dil</Text>
            <TouchableOpacity 
              style={styles.dropdownButton} 
              onPress={() => setShowLangModal(true)}
            >
              <Text style={styles.dropdownText}>{selectedLanguage.label}</Text>
              <ChevronDown size={20} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.checkboxContainer}>
            <TouchableOpacity 
              style={[styles.checkbox, isChecked && styles.checkboxChecked]} 
              onPress={() => setIsChecked(!isChecked)}
            >
              {isChecked && <Check size={14} color="#000" />}
            </TouchableOpacity>
            <Text style={styles.checkboxText}>
              <Text style={{fontWeight: 'bold', color: '#FFF'}}>Gizlilik Sözleşmesi</Text>'ni kabul ediyorum
            </Text>
          </View>

          <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
            <Text style={styles.signupButtonText}>Kayıt Ol</Text>
          </TouchableOpacity>

        </View>

        <View style={styles.footer}>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.footerText}>Zaten hesabın var mı? <Text style={styles.loginText}>Giriş Yap</Text></Text>
            </TouchableOpacity>
        </View>

      </ScrollView>

      {/* MODAL */}
      <Modal
        visible={showLangModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowLangModal(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setShowLangModal(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Dil Seçin</Text>
            
            <FlatList
              data={LANGUAGES}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={[
                    styles.languageOption, 
                    selectedLanguage.id === item.id && styles.languageOptionSelected
                  ]}
                  onPress={() => handleSelectLanguage(item)}
                >
                  <Text style={[
                    styles.languageText,
                    selectedLanguage.id === item.id && styles.languageTextSelected
                  ]}>
                    {item.label}
                  </Text>
                  {selectedLanguage.id === item.id && <Check size={18} color="#000" />}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  scrollContainer: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 60, paddingBottom: 40 },
  header: { alignItems: 'center', marginBottom: 30 },
  logoBox: { width: 48, height: 48, backgroundColor: '#1a1a1a', borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 12, borderWidth: 1, borderColor: '#333' },
  appName: { fontSize: 24, fontWeight: 'bold', color: '#FFF', marginBottom: 4 },
  tagline: { fontSize: 14, color: '#888' },
  form: { width: '100%' },
  inputGroup: { marginBottom: 16 },
  label: { color: '#FFF', fontSize: 13, marginBottom: 8, fontWeight: '600', opacity: 0.8 },
  input: { backgroundColor: '#111', borderWidth: 1, borderColor: '#333', borderRadius: 12, padding: 14, color: '#FFF', fontSize: 15 },
  passwordContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#111', borderWidth: 1, borderColor: '#333', borderRadius: 12, paddingHorizontal: 14 },
  passwordInput: { flex: 1, paddingVertical: 14, color: '#FFF', fontSize: 15 },
  dropdownButton: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#111', borderWidth: 1, borderColor: '#333', borderRadius: 12, padding: 14 },
  dropdownText: { color: '#FFF', fontSize: 15 },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 24, marginTop: 8 },
  checkbox: { width: 20, height: 20, borderRadius: 6, borderWidth: 1, borderColor: '#666', marginRight: 10, justifyContent: 'center', alignItems: 'center' },
  checkboxChecked: { backgroundColor: '#FFF', borderColor: '#FFF' },
  checkboxText: { color: '#888', fontSize: 13 },
  signupButton: { backgroundColor: '#FFF', borderRadius: 30, paddingVertical: 16, alignItems: 'center', marginTop: 10, marginBottom: 30 },
  signupButtonText: { color: '#000', fontSize: 16, fontWeight: 'bold' },
  footer: { alignItems: 'center' },
  footerText: { color: '#888', fontSize: 14 },
  loginText: { color: '#FFF', fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '80%', backgroundColor: '#1a1a1a', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: '#333', maxHeight: '60%' },
  modalTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  languageOption: { paddingVertical: 15, paddingHorizontal: 10, borderBottomWidth: 1, borderBottomColor: '#333', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  languageOptionSelected: { backgroundColor: '#FFF', borderRadius: 10, borderBottomWidth: 0, marginTop: 5, marginBottom: 5 },
  languageText: { color: '#CCC', fontSize: 16 },
  languageTextSelected: { color: '#000', fontWeight: 'bold' },
});