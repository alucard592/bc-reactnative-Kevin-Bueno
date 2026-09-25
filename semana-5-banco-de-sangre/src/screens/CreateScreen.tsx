import { useState } from 'react';
import { View, TextInput, Pressable, Text, Switch, StyleSheet, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCreateItem } from '../hooks/useCreateItem';
import { COLORS, TYPOGRAPHY, SPACING } from '../theme';

const TIPOS_SANGRE = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export function CreateScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [tipoSangre, setTipoSangre] = useState('O+');
  const [ultimaDonacion, setUltimaDonacion] = useState('');
  const [disponible, setDisponible] = useState(true);
  const { mutate, isPending } = useCreateItem();

  const handleSubmit = () => {
    if (!name.trim() || !ultimaDonacion.trim()) {
      Alert.alert('Faltan datos', 'Completa nombre y fecha de última donación');
      return;
    }
    mutate(
      { name, tipoSangre, ultimaDonacion, disponible },
      { onSuccess: () => navigation.goBack() }
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del donante"
        placeholderTextColor={COLORS.textSecondary}
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Tipo de sangre</Text>
      <View style={styles.chips}>
        {TIPOS_SANGRE.map((tipo) => (
          <Pressable
            key={tipo}
            style={[styles.chip, tipoSangre === tipo && styles.chipActivo]}
            onPress={() => setTipoSangre(tipo)}
          >
            <Text style={[styles.chipTexto, tipoSangre === tipo && styles.chipTextoActivo]}>
              {tipo}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.label}>Última donación (AAAA-MM-DD)</Text>
      <TextInput
        style={styles.input}
        placeholder="2026-09-19"
        placeholderTextColor={COLORS.textSecondary}
        value={ultimaDonacion}
        onChangeText={setUltimaDonacion}
      />

      <View style={styles.switchRow}>
        <Text style={styles.label}>Disponible para donar</Text>
        <Switch value={disponible} onValueChange={setDisponible} trackColor={{ true: COLORS.primary }} />
      </View>

      <Pressable style={styles.boton} onPress={handleSubmit} disabled={isPending}>
        <Text style={styles.botonTexto}>{isPending ? 'Guardando...' : 'Guardar donante'}</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.lg },
  label: { ...TYPOGRAPHY.subtitle, color: COLORS.text, marginBottom: SPACING.xs, marginTop: SPACING.md },
  input: {
    backgroundColor: COLORS.card, borderRadius: 10, borderWidth: 1, borderColor: COLORS.border,
    padding: SPACING.md, color: COLORS.text,
  },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm },
  chip: {
    borderWidth: 1, borderColor: COLORS.border, borderRadius: 20,
    paddingVertical: SPACING.xs, paddingHorizontal: SPACING.md, backgroundColor: COLORS.card,
  },
  chipActivo: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  chipTexto: { color: COLORS.text, fontWeight: '600' },
  chipTextoActivo: { color: '#fff' },
  switchRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginTop: SPACING.lg,
  },
  boton: {
    backgroundColor: COLORS.primary, padding: SPACING.md, borderRadius: 10,
    alignItems: 'center', marginTop: SPACING.xl, marginBottom: SPACING.xl,
  },
  botonTexto: { color: '#fff', fontWeight: '600' },
});