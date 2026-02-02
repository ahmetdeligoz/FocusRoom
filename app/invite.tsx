import { useRouter } from 'expo-router';
import { Check, Copy, Plus, Search, Share2, X } from 'lucide-react-native';
import React, { useState } from 'react';
import { FlatList, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// --- GELECEK İÇİN VERİ YAPISI (MOCK DATA) ---
// İleride bu veriyi veritabanından (Firebase/Supabase vb.) çekeceksin.
// 'avatar' kısmı null ise isminin baş harflerini gösteririz.
const MOCK_FRIENDS = [
  { id: '1', name: 'Yusuf Deligöz', username: '@yusuf', avatar: null },
  { id: '2', name: 'Ahmet Yılmaz', username: '@ahmet', avatar: null },
  { id: '3', name: 'Ayşe Demir', username: '@ayse', avatar: null },
  { id: '4', name: 'Mehmet Kaya', username: '@mehmet', avatar: null },
  { id: '5', name: 'Zeynep Çelik', username: '@zeynep', avatar: null },
];

export default function InviteScreen() {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);

  // Arama filtresi
  const filteredFriends = MOCK_FRIENDS.filter(friend => 
    friend.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Arkadaş seçme/çıkarma fonksiyonu
  const toggleSelection = (id: string) => {
    if (selectedFriends.includes(id)) {
      setSelectedFriends(prev => prev.filter(friendId => friendId !== id));
    } else {
      setSelectedFriends(prev => [...prev, id]);
    }
  };

  const handleStartWorking = () => {
    // Seçilen arkadaşların ID listesini string'e çevirip parametre olarak gönderiyoruz
    router.push({
      pathname: '/sharedroom', // ARTIK FOCUSROOM DEĞİL, SHAREDROOM
      params: { 
        friends: JSON.stringify(selectedFriends) 
      }
    }); 
  };

  const renderFriendItem = ({ item }: { item: typeof MOCK_FRIENDS[0] }) => {
    const isSelected = selectedFriends.includes(item.id);

    return (
      <TouchableOpacity 
        style={[styles.friendItem, isSelected && styles.friendItemActive]} 
        onPress={() => toggleSelection(item.id)}
        activeOpacity={0.7}
      >
        {/* Avatar Alanı */}
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {item.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
          </Text>
        </View>

        {/* İsim Alanı */}
        <View style={styles.friendInfo}>
          <Text style={styles.friendName}>{item.name}</Text>
          <Text style={styles.friendUsername}>{item.username}</Text>
        </View>

        {/* Ekle Butonu / İkonu */}
        <View style={[styles.actionIcon, isSelected ? styles.iconSelected : styles.iconUnselected]}>
          {isSelected ? <Check size={20} color="#000" /> : <Plus size={20} color="#FFF" />}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Modal olduğu için StatusBar stilini değiştirebiliriz */}
      <StatusBar barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Odaya Ekle</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Copy size={20} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Share2 size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* ARAMA ÇUBUĞU */}
      <View style={styles.searchContainer}>
        <Search size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Ara..."
          placeholderTextColor="#666"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* ARKADAŞ LİSTESİ */}
      <FlatList
        data={filteredFriends}
        keyExtractor={item => item.id}
        renderItem={renderFriendItem}
        contentContainerStyle={styles.listContent}
        style={styles.list}
      />

      {/* FOOTER (Butonlar) */}
      <View style={styles.footer}>
        {/* Kapatma Butonu (Kırmızı) */}
        <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
          <X size={24} color="#FFF" />
        </TouchableOpacity>

        {/* Başlama Butonu */}
        <TouchableOpacity style={styles.startButton} onPress={handleStartWorking}>
          <Text style={styles.startButtonText}>
            {selectedFriends.length > 0 ? `${selectedFriends.length} Kişiyle Başla` : 'Çalışmaya Başla'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Modal olduğu için ana sayfadan bir tık açık olabilir veya aynı (#000) kalabilir
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 15,
  },
  iconButton: {
    padding: 5,
  },
  
  // Search
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    marginHorizontal: 20,
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#FFF',
    fontSize: 16,
    height: '100%',
  },

  // List Item
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100, // Footer için boşluk
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000', // Liste elemanları daha koyu
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  friendItemActive: {
    borderColor: '#304ffe', // Seçilince mavi çerçeve
    backgroundColor: '#0a0a1a',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#304ffe', // Profil resmi yoksa mavi arka plan
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
  friendInfo: {
    flex: 1,
  },
  friendName: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  friendUsername: {
    color: '#888',
    fontSize: 14,
  },
  actionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconUnselected: {
    borderWidth: 2,
    borderColor: '#666',
  },
  iconSelected: {
    backgroundColor: '#FFF', // Seçilince içi dolu beyaz
  },

  // Footer
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  closeButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#ef4444', // Gönderdiğin resimdeki kırmızıya yakın ton
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButton: {
    flex: 1,
    height: 56,
    backgroundColor: '#1a1a1a', // Resimdeki gibi koyu arka plan
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  startButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});