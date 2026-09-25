import { View, Text, Image, StyleSheet } from 'react-native';
import { Donante } from '../types';
import { COLORS, TYPOGRAPHY, SPACING } from '../theme';

interface ItemCardProps {
  donante: Donante;
}

export function ItemCard({ donante }: ItemCardProps) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: donante.fotoUrl }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.nombre}>{donante.nombre}</Text>
        <Text style={styles.subtitulo}>
          {donante.tipoSangre} · {donante.ultimaDonacion}
        </Text>
        <Text style={donante.disponible ? styles.disponible : styles.noDisponible}>
          {donante.disponible ? 'Disponible' : 'No disponible'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: SPACING.md,
  },
  image: { width: 56, height: 56, borderRadius: 28, marginRight: SPACING.md },
  info: { flex: 1 },
  nombre: { ...TYPOGRAPHY.subtitle, color: COLORS.text },
  subtitulo: { ...TYPOGRAPHY.caption, color: COLORS.textSecondary, marginTop: 2 },
  disponible: { ...TYPOGRAPHY.caption, color: COLORS.success, marginTop: 4 },
  noDisponible: { ...TYPOGRAPHY.caption, color: COLORS.danger, marginTop: 4 },
});