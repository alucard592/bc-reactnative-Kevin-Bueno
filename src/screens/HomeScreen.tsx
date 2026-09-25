import { View, Text, Image, FlatList, Pressable, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useLayoutEffect } from 'react';
import { useItems } from '../hooks/useItems';
import { Donante } from '../types';
import { RootStackParamList } from '../navigation/types';
import { useAuthStore } from '../stores/authStore';
import { COLORS, TYPOGRAPHY, SPACING } from '../theme';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export function HomeScreen() {
  const navigation = useNavigation<NavProp>();
  const { data, isLoading, isError, isFetching, refetch } = useItems();
  const logout = useAuthStore((s) => s.logout);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={logout} style={styles.logoutBtn} hitSlop={8}>
          <Text style={styles.logoutTexto}>Salir</Text>
        </Pressable>
      ),
    });
  }, [navigation, logout]);

  if (isLoading) {
    return <View style={styles.center}><ActivityIndicator size="large" color={COLORS.primary} /></View>;
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Error al cargar los donantes</Text>
        <Pressable style={styles.boton} onPress={() => refetch()}>
          <Text style={styles.botonTexto}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        refreshing={isFetching}
        onRefresh={refetch}
        contentContainerStyle={styles.lista}
        ItemSeparatorComponent={() => <View style={{ height: SPACING.md }} />}
        ListEmptyComponent={<Text style={styles.vacio}>No hay donantes registrados</Text>}
        renderItem={({ item }: { item: Donante }) => (
          <Pressable style={styles.card} onPress={() => navigation.navigate('Detail', { id: item.id })}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.info}>
              <Text style={styles.nombre}>{item.name}</Text>
              <Text style={styles.subtitulo}>{item.tipoSangre} · {item.ultimaDonacion}</Text>
              <Text style={item.disponible ? styles.disponible : styles.noDisponible}>
                {item.disponible ? 'Disponible' : 'No disponible'}
              </Text>
            </View>
          </Pressable>
        )}
      />
      <Pressable style={styles.fab} onPress={() => navigation.navigate('Create')}>
        <Text style={styles.fabTexto}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: SPACING.lg },
  lista: { padding: SPACING.lg },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.card, borderRadius: 12, padding: SPACING.md },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: SPACING.md },
  info: { flex: 1 },
  nombre: { ...TYPOGRAPHY.subtitle, color: COLORS.text },
  subtitulo: { ...TYPOGRAPHY.caption, color: COLORS.textSecondary, marginTop: 2 },
  disponible: { ...TYPOGRAPHY.caption, color: COLORS.success, marginTop: 4 },
  noDisponible: { ...TYPOGRAPHY.caption, color: COLORS.danger, marginTop: 4 },
  vacio: { textAlign: 'center', color: COLORS.textSecondary, marginTop: SPACING.xl },
  errorText: { ...TYPOGRAPHY.body, color: COLORS.danger, marginBottom: SPACING.md },
  boton: { backgroundColor: COLORS.primary, paddingVertical: SPACING.sm, paddingHorizontal: SPACING.lg, borderRadius: 10 },
  botonTexto: { color: '#fff', fontWeight: '600' },
  fab: {
    position: 'absolute', right: SPACING.lg, bottom: SPACING.lg,
    width: 56, height: 56, borderRadius: 28, backgroundColor: COLORS.primary,
    justifyContent: 'center', alignItems: 'center', elevation: 4,
  },
  fabTexto: { color: '#fff', fontSize: 28, lineHeight: 30 },
  logoutBtn: { paddingHorizontal: SPACING.sm, paddingVertical: SPACING.xs },
  logoutTexto: { color: '#fff', fontWeight: '600', fontSize: 14 },
});