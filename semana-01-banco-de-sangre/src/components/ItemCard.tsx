import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Donante } from '../types';

interface ItemCardProps {
  donante: Donante;
  onPress: (id: string) => void;
}

export function ItemCard({ donante, onPress }: ItemCardProps) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: donante.fotoUrl }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.nombre}>{donante.nombre}</Text>
        <Text style={styles.subtitulo}>
          {donante.tipoSangre} · Última donación: {donante.ultimaDonacion}
        </Text>
        <Text style={donante.disponible ? styles.disponible : styles.noDisponible}>
          {donante.disponible ? 'Disponible' : 'No disponible'}
        </Text>
      </View>
      <Pressable
        style={({ pressed }) => [styles.boton, pressed && styles.botonPresionado]}
        onPress={() => onPress(donante.id)}
      >
        <Text style={styles.botonTexto}>Contactar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  nombre: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  subtitulo: {
    fontSize: 13,
    color: '#666666',
    marginTop: 2,
  },
  disponible: {
    fontSize: 12,
    color: '#2e7d32',
    marginTop: 4,
  },
  noDisponible: {
    fontSize: 12,
    color: '#c62828',
    marginTop: 4,
  },
  boton: {
    backgroundColor: '#d32f2f',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  botonPresionado: {
    opacity: 0.6,
  },
  botonTexto: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 12,
  },
});