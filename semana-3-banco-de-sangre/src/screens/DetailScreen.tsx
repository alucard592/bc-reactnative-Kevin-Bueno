import { View, Text, Image, StyleSheet } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { HomeStackParamList } from '../navigation/types';
import { donantes } from '../data/mockData';
import { COLORS, TYPOGRAPHY, SPACING } from '../theme';

type DetailRouteProp = RouteProp<HomeStackParamList, 'HomeDetail'>;

export function DetailScreen() {
  const route = useRoute<DetailRouteProp>();
  const { id, nombre } = route.params;
  const donante = donantes.find((d) => d.id === id);

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
});