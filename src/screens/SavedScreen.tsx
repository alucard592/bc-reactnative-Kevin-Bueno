import { View, Text, FlatList, StyleSheet } from 'react-native';
import { donantes } from '../data/mockData';
import { ItemCard } from '../components/ItemCard';
import { useSavedStore } from '../stores/savedStore';
import { COLORS, TYPOGRAPHY, SPACING } from '../theme';

export function SavedScreen() {
  const savedIds = useSavedStore((state) => state.savedIds);
  const guardados = donantes.filter((d) => savedIds.includes(d.id));

  return (
    <View style={styles.container}>
      <FlatList
        data={guardados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ItemCard donante={item} />}
        contentContainerStyle={styles.lista}
        ItemSeparatorComponent={() => <View style={{ height: SPACING.md }} />}
        ListEmptyComponent={
          <Text style={styles.vacio}>Aún no has guardado donantes</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  lista: { padding: SPACING.lg },
  vacio: { textAlign: 'center', color: COLORS.textSecondary, marginTop: SPACING.xl },
});