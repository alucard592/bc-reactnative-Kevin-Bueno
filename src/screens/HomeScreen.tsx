import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { donantes } from '../data/mockData';
import { ItemCard } from '../components/ItemCard';

export function HomeScreen() {
  const handleContactar = (id: string) => {
    console.log('Contactar donante:', id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitulo}>🩸 Banco de Sangre</Text>
        <Text style={styles.headerSubtitulo}>Donantes</Text>
      </View>
      <ScrollView contentContainerStyle={styles.lista}>
        {donantes.map((donante) => (
          <ItemCard key={donante.id} donante={donante} onPress={handleContactar} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#d32f2f',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  headerTitulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headerSubtitulo: {
    fontSize: 14,
    color: '#ffe0e0',
    marginTop: 2,
  },
  lista: {
    padding: 16,
  },
});