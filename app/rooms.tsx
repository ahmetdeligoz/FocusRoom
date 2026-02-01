import { StyleSheet, Text, View } from 'react-native';

export default function Rooms() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Odalar</Text>
      <Text style={styles.subtext}>Diğer odalar burada listelenecek</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
  text: { color: '#FFF', fontSize: 24, fontWeight: 'bold' },
  subtext: { color: '#888', marginTop: 10 }
});