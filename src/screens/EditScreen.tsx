import { useState, useEffect } from 'react';
import { View, TextInput, Pressable, Text, Switch, StyleSheet, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useItems } from '../hooks/useItems';
import { useUpdateItem } from '../hooks/useUpdateItem';
import { RootStackParamList } from '../navigation/types';
import { COLORS, TYPOGRAPHY, SPACING } from '../theme';

const TIPOS_SANGRE = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
type EditRouteProp = RouteProp<RootStackParamList, 'Edit'>;

export function EditScreen() {
  const navigation = useNavigation();
  const { params } = useRoute<EditRouteProp>();
  const { data, isLoading } = useItems();
  const donante = data?.find((d) => d.id === params.id);
  const { mutate, isPending } = useUpdateItem();

  const [name, setName] = useState('');
  const [tipoSangre, setTipoSangre] = useState('O+');
  const [ultimaDonacion, setUltimaDonacion] = useState('');
  const [disponible, setDisponible] = useState(true);

 useEffect(() => {
  if (donante) {
    setName(donante.name ?? '');
    setTipoSangre(donante.tipoSangre ?? 'O+');
    setUltimaDonacion(String(donante.ultimaDonacion ?? ''));
    setDisponible(donante.disponible ?? true);
  }
}, [donante]);

  if (isLoading || !donante) {
    return <View style={styles.center}><ActivityIndicator size="large" color={COLORS.primary} /></View>;
  }

  const handleSubmit = () => {
  if (!name?.trim() || !ultimaDonacion?.trim()) {
    Alert.alert('Faltan datos', 'Completa nombre y fecha de última donación');
    return;
  }
  mutate(
    { ...donante, name, tipoSangre, ultimaDonacion, disponible },
    { onSuccess: () => navigation.goBack() }
  );
};
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.label}>Nombre</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholderTextColor={COLORS.textSecondary} />

      <Text style={styles.label}>Tipo de sangre</Text>
      <View style={styles.chips}>
        {TIPOS_SANGRE.map((tipo) => (
          <Pressable
            key={tipo}
            style={[styles.chip, tipoSangre === tipo && styles.chipActivo]}
            onPress={() => setTipoSangre(tipo)}
          >
            <Text style={[styles.chipTexto, tipoSangre === tipo && styles.chipTextoActivo]}>{tipo}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.label}>Última donación (AAAA-MM-DD)</Text>
      <TextInput style={styles.input} value={ultimaDonacion} onChangeText={setUltimaDonacion} placeholderTextColor={COLORS.textSecondary} />

      <View style={styles.switchRow}>
        <Text style={styles.label}>Disponible para donar</Text>
        <Switch value={disponible} onValueChange={setDisponible} trackColor={{ true: COLORS.primary }} />
      </View>

      <Pressable style={styles.boton} onPress={handleSubmit} disabled={isPending}>
        <Text style={styles.botonTexto}>{isPending ? 'Guardando...' : 'Guardar cambios'}</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  content: { padding: SPACING.lg },
  label: { ...TYPOGRAPHY.subtitle, color: COLORS.text, marginBottom: SPACING.xs, marginTop: SPACING.md },
  input: { backgroundColor: COLORS.card, borderRadius: 10, borderWidth: 1, borderColor: COLORS.border, padding: SPACING.md, color: COLORS.text },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm },
  chip: { borderWidth: 1, borderColor: COLORS.border, borderRadius: 20, paddingVertical: SPACING.xs, paddingHorizontal: SPACING.md, backgroundColor: COLORS.card },
  chipActivo: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  chipTexto: { color: COLORS.text, fontWeight: '600' },
  chipTextoActivo: { color: '#fff' },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: SPACING.lg },
  boton: { backgroundColor: COLORS.primary, padding: SPACING.md, borderRadius: 10, alignItems: 'center', marginTop: SPACING.xl, marginBottom: SPACING.xl },
  botonTexto: { color: '#fff', fontWeight: '600' },
});