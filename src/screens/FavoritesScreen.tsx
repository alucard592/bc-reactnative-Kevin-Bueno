import { View, Text, FlatList, StyleSheet } from 'react-native';
import { donantes } from '../data/mockData';
import { ItemCard } from '../components/ItemCard';
import { COLORS, TYPOGRAPHY, SPACING } from '../theme';

const favoritosIds = ['1', '4', '8'];

export function FavoritesScreen() {
  const favoritos = donantes.filter((d) => favoritosIds.includes(d.id));

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Donantes favoritos</Text>
      <FlatList
        data={favoritos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ItemCard donante={item} />}
        contentContainerStyle={styles.lista}
        ItemSeparatorComponent={() => <View style={{ height: SPACING.md }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  titulo: { ...TYPOGRAPHY.title, color: COLORS.text, padding: SPACING.lg },
  lista: { paddingHorizontal: SPACING.lg, paddingBottom: SPACING.lg },
});