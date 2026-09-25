import React, { useEffect } from 'react';
import { View, Pressable, Text, Switch, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useItems } from '../hooks/useItems';
import { useUpdateItem } from '../hooks/useUpdateItem';
import { RootStackParamList } from '../navigation/types';
import { COLORS, TYPOGRAPHY, SPACING } from '../theme';
import { donanteSchema, DonanteFormData } from '../schemas/donanteSchema';
import { FormField } from '../components/FormField';

const TIPOS_SANGRE = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
type EditRouteProp = RouteProp<RootStackParamList, 'Edit'>;

export function EditScreen() {
  const navigation = useNavigation();
  const { params } = useRoute<EditRouteProp>();
  const { data, isLoading } = useItems();
  const donante = data?.find((d) => d.id === params.id);
  const { mutate, isPending } = useUpdateItem();

  const { control, handleSubmit, reset } = useForm<DonanteFormData>({
    resolver: zodResolver(donanteSchema),
  });

  useEffect(() => {
    if (donante) {
      reset({
        name: donante.name,
        tipoSangre: donante.tipoSangre,
        ultimaDonacion: donante.ultimaDonacion,
        disponible: donante.disponible,
      });
    }
  }, [donante, reset]);

  if (isLoading || !donante) {
    return <View style={styles.center}><ActivityIndicator size="large" color={COLORS.primary} /></View>;
  }

  const onSubmit = (data: DonanteFormData) => {
    mutate(
      { ...donante, ...data },
      { onSuccess: () => navigation.goBack() }
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <FormField
        control={control}
        name="name"
        label="Nombre Completo"
      />

      <Text style={styles.label}>Tipo de sangre</Text>
      <Controller
        control={control}
        name="tipoSangre"
        render={({ field: { value, onChange } }) => (
          <View style={styles.chips}>
            {TIPOS_SANGRE.map((tipo) => (
              <Pressable
                key={tipo}
                style={[styles.chip, value === tipo && styles.chipActivo]}
                onPress={() => onChange(tipo)}
              >
                <Text style={[styles.chipTexto, value === tipo && styles.chipTextoActivo]}>
                  {tipo}
                </Text>
              </Pressable>
            ))}
          </View>
        )}
      />

      <FormField
        control={control}
        name="ultimaDonacion"
        label="Última donación (AAAA-MM-DD)"
      />

      <View style={styles.switchRow}>
        <Text style={styles.label}>Disponible para donar</Text>
        <Controller
          control={control}
          name="disponible"
          render={({ field: { value, onChange } }) => (
            <Switch 
              value={value} 
              onValueChange={onChange} 
              trackColor={{ true: COLORS.primary }} 
            />
          )}
        />
      </View>

      <Pressable 
        style={[styles.boton, isPending && styles.botonDisabled]} 
        onPress={handleSubmit(onSubmit)} 
        disabled={isPending}
      >
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
  botonDisabled: { opacity: 0.7 },
  botonTexto: { color: '#fff', fontWeight: '600' },
});
