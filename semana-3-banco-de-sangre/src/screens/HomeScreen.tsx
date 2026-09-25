import { useState, useMemo, useCallback } from 'react';
import {
  View, Text, TextInput, FlatList, Pressable, StyleSheet,
  KeyboardAvoidingView, Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { donantes } from '../data/mockData';
import { ItemCard } from '../components/ItemCard';
import { Donante } from '../types';
import { HomeStackParamList } from '../navigation/types';
import { COLORS, TYPOGRAPHY, SPACING } from '../theme';

type HomeNavProp = NativeStackNavigationProp<HomeStackParamList, 'HomeList'>;

export function HomeScreen() {
  const navigation = useNavigation<HomeNavProp>();
  const [busqueda, setBusqueda] = useState('');

  const donantesFiltrados = useMemo(() => {
    const query = busqueda.trim().toLowerCase();
    if (!query) return donantes;
    return donantes.filter(
      (d) =>
        d.nombre.toLowerCase().includes(query) ||
        d.tipoSangre.toLowerCase().includes(query)
    );
  }, [busqueda]);

  const handlePress = useCallback((donante: Donante) => {
    navigation.navigate('HomeDetail', { id: donante.id, nombre: donante.nombre });
  }, [navigation]);

  const renderItem = useCallback(({ item }: { item: Donante }) => (
    <Pressable onPress={() => handlePress(item)}>
      <ItemCard donante={item} />
    </Pressable>
  ), [handlePress]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TextInput
        style={styles.input}
        placeholder="Buscar por nombre o tipo de sangre..."
        placeholderTextColor={COLORS.textSecondary}
        value={busqueda}
        onChangeText={setBusqueda}
      />

      <FlatList
        data={donantesFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.lista}
        ItemSeparatorComponent={() => <View style={{ height: SPACING.md }} />}
        ListEmptyComponent={
          <Text style={styles.vacio}>No se encontraron donantes</Text>
        }
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  input: {
    margin: SPACING.lg,
    marginBottom: SPACING.sm,
    backgroundColor: COLORS.card,
    borderRadius: 10,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    color: COLORS.text,
  },
  lista: { paddingHorizontal: SPACING.lg, paddingBottom: SPACING.lg },
  vacio: { textAlign: 'center', color: COLORS.textSecondary, marginTop: SPACING.xl },
});