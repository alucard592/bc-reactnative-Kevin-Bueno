import { View, Text, Image, Pressable, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useItems } from '../hooks/useItems';
import { useDeleteItem } from '../hooks/useDeleteItem';
import { RootStackParamList } from '../navigation/types';
import { COLORS, TYPOGRAPHY, SPACING } from '../theme';

type DetailRouteProp = RouteProp<RootStackParamList, 'Detail'>;
type NavProp = NativeStackNavigationProp<RootStackParamList, 'Detail'>;

export function DetailScreen() {
  const { params } = useRoute<DetailRouteProp>();
  const navigation = useNavigation<NavProp>();
  const { data, isLoading } = useItems();
  const { mutate: eliminar, isPending } = useDeleteItem();
  const donante = data?.find((d) => d.id === params.id);

  if (isLoading) {
    return <View style={styles.center}><ActivityIndicator size="large" color={COLORS.primary} /></View>;
  }

  if (!donante) {
    return <View style={styles.center}><Text>No encontrado</Text></View>;
  }

  const confirmarEliminar = () => {
    Alert.alert(
      'Eliminar donante',
      `¿Seguro que quieres eliminar a ${donante.name}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: () => eliminar(donante.id, { onSuccess: () => navigation.goBack() }) },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: donante.avatar }} style={styles.image} />
      <Text style={styles.nombre}>{donante.name}</Text>
      <Text style={styles.dato}>Tipo de sangre: {donante.tipoSangre}</Text>
      <Text style={styles.dato}>Última donación: {donante.ultimaDonacion}</Text>
      <Text style={donante.disponible ? styles.disponible : styles.noDisponible}>
        {donante.disponible ? 'Disponible' : 'No disponible'}
      </Text>

      <Pressable style={styles.botonEditar} onPress={() => navigation.navigate('Edit', { id: donante.id })}>
        <Text style={styles.botonTexto}>Editar donante</Text>
      </Pressable>

      <Pressable style={styles.botonEliminar} onPress={confirmarEliminar} disabled={isPending}>
        <Text style={styles.botonTexto}>{isPending ? 'Eliminando...' : 'Eliminar donante'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: SPACING.lg, backgroundColor: COLORS.background },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  image: { width: 120, height: 120, borderRadius: 60, marginBottom: SPACING.lg },
  nombre: { ...TYPOGRAPHY.title, color: COLORS.text, marginBottom: SPACING.sm },
  dato: { ...TYPOGRAPHY.body, color: COLORS.textSecondary, marginBottom: 4 },
  disponible: { ...TYPOGRAPHY.subtitle, color: COLORS.success, marginTop: SPACING.sm },
  noDisponible: { ...TYPOGRAPHY.subtitle, color: COLORS.danger, marginTop: SPACING.sm },
  botonEditar: { marginTop: SPACING.xl, backgroundColor: COLORS.primary, paddingVertical: SPACING.sm, paddingHorizontal: SPACING.lg, borderRadius: 10 },
  botonEliminar: { marginTop: SPACING.sm, backgroundColor: COLORS.danger, paddingVertical: SPACING.sm, paddingHorizontal: SPACING.lg, borderRadius: 10 },
  botonTexto: { color: '#fff', fontWeight: '600' },
});