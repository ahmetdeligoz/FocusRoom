import { useLocalSearchParams, useRouter } from 'expo-router'; // DÜZELTME BURADA YAPILDI
import { Check, Copy, Plus, Search, Share2, X } from 'lucide-react-native';
import React, { useState } from 'react';
import { FlatList, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// --- MOCK DATA ---
const MOCK_FRIENDS = [
  { id: '1', name: 'Yusuf Deligöz', username: '@yusuf', avatar: null },
  { id: '2', name: 'Ahmet Yılmaz', username: '@ahmet', avatar: null },
  { id: '3', name: 'Ayşe Demir', username: '@ayse', avatar: null },
  { id: '4', name: 'Mehmet Kaya', username: '@mehmet', avatar: null },
  { id: '5', name: 'Zeynep Çelik', username: '@zeynep', avatar: null },
];

export default function InviteScreen() {
  const router = useRouter();
  
  // DÜZELTME: Import ettikten sonra burada kullanıyoruz
  const params = useLocalSearchParams(); 

  const [searchText, setSearchText] = useState('');
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);

  // Arama filtresi
  const filteredFriends = MOCK_FRIENDS.filter(friend => 
    friend.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Arkadaş seçme/çıkarma
  const toggleSelection = (id: string) => {
    if (selectedFriends.includes(id)) {
      setSelectedFriends(prev => prev.filter(friendId => friendId !== id));
    } else {
      setSelectedFriends(prev => [...prev, id]);
    }
  };

  const handleStartWorking = () => {
    router.push({
      pathname: '/sharedroom',
      params: { 
        friends: JSON.stringify(selectedFriends),
        // Ana sayfadan gelen 'minutes' parametresini aynen iletiyoruz
        minutes: params.minutes 
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
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {item.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
          </Text>
        </View>

        <View style={styles.friendInfo}>
          <Text style={styles.friendName}>{item.name}</Text>
          <Text style={styles.friendUsername}>{item.username}</Text>
        </View>

        <View style={[styles.actionIcon, isSelected ? styles.iconSelected : styles.iconUnselected]}>
          {isSelected ? <Check size={20} color="#000" /> : <Plus size={20} color="#FFF" />}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
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

      {/* ARAMA */}
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

      {/* LİSTE */}
      <FlatList
        data={filteredFriends}
        keyExtractor={item => item.id}
        renderItem={renderFriendItem}
        contentContainerStyle={styles.listContent}
        style={styles.list}
      />

      {/* FOOTER */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
          <X size={24} color="#FFF" />
        </TouchableOpacity>

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
    backgroundColor: '#121212',
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
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  friendItemActive: {
    borderColor: '#304ffe',
    backgroundColor: '#0a0a1a',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#304ffe',
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
    backgroundColor: '#FFF',
  },
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
    backgroundColor: '#ef4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButton: {
    flex: 1,
    height: 56,
    backgroundColor: '#1a1a1a',
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