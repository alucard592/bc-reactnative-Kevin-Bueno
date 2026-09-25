import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { HomeStackParamList } from '../navigation/saved';
import { donantes } from '../data/mockData';
import { useSavedStore } from '../stores/savedStore';
import { COLORS, TYPOGRAPHY, SPACING } from '../theme';

type DetailRouteProp = RouteProp<HomeStackParamList, 'HomeDetail'>;

export function DetailScreen() {
  const route = useRoute<DetailRouteProp>();
  const { id, nombre } = route.params;
  const donante = donantes.find((d) => d.id === id);

  const isSaved = useSavedStore((state) => state.isSaved(id));
  const toggleSaved = useSavedStore((state) => state.toggleSaved);

  if (!donante) {
    return (
      <View style={styles.container}>
        <Text>No encontrado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: donante.fotoUrl }} style={styles.image} />
      <Text style={styles.nombre}>{nombre}</Text>
      <Text style={styles.dato}>Tipo de sangre: {donante.tipoSangre}</Text>
      <Text style={styles.dato}>Última donación: {donante.ultimaDonacion}</Text>
      <Text style={styles.dato}>Teléfono: {donante.telefono}</Text>
      <Text style={donante.disponible ? styles.disponible : styles.noDisponible}>
        {donante.disponible ? 'Disponible' : 'No disponible'}
      </Text>

      <Pressable
        style={[styles.boton, isSaved && styles.botonQuitar]}
        onPress={() => toggleSaved(id)}
      >
        <Text style={styles.botonTexto}>
          {isSaved ? 'Quitar de guardados' : 'Guardar donante'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: SPACING.lg, backgroundColor: COLORS.background },
  image: { width: 120, height: 120, borderRadius: 60, marginBottom: SPACING.lg },
  nombre: { ...TYPOGRAPHY.title, color: COLORS.text, marginBottom: SPACING.sm },
  dato: { ...TYPOGRAPHY.body, color: COLORS.textSecondary, marginBottom: 4 },
  disponible: { ...TYPOGRAPHY.subtitle, color: COLORS.success, marginTop: SPACING.sm },
  noDisponible: { ...TYPOGRAPHY.subtitle, color: COLORS.danger, marginTop: SPACING.sm },
  boton: {
    marginTop: SPACING.lg,
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    borderRadius: 10,
  },
  botonQuitar: { backgroundColor: COLORS.textSecondary },
  botonTexto: { color: '#ffffff', fontWeight: '600' },
});