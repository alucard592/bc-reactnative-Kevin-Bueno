import React, { useRef, useEffect, useLayoutEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
  StyleSheet,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useItems } from '../hooks/useItems';
import { Donante } from '../types';
import { RootStackParamList } from '../navigation/types';
import { COLORS, TYPOGRAPHY, SPACING } from '../theme';
import { ItemCard } from '../components/ItemCard';
import { useAuthStore } from '../store/authStore';

// Habilitar LayoutAnimation en Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

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

  // Animación de escala para el FAB
  const fabScale = useRef(new Animated.Value(1)).current;

  const handleFabPressIn = () => {
    Animated.spring(fabScale, {
      toValue: 0.88,
      useNativeDriver: true,
    }).start();
  };

  const handleFabPressOut = () => {
    Animated.spring(fabScale, {
      toValue: 1,
      friction: 3,
      tension: 200,
      useNativeDriver: true,
    }).start();
  };

  // LayoutAnimation cuando la lista de donantes cambia
  const prevCountRef = useRef<number | undefined>(undefined);
  useEffect(() => {
    if (prevCountRef.current !== undefined && prevCountRef.current !== data?.length) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
    prevCountRef.current = data?.length;
  }, [data?.length]);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
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
      {/* Botón de cerrar sesión en esquina superior derecha usando navigation header */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        refreshing={isFetching}
        onRefresh={refetch}
        contentContainerStyle={styles.lista}
        ItemSeparatorComponent={() => <View style={{ height: SPACING.md }} />}
        ListEmptyComponent={
          <Text style={styles.vacio}>No hay donantes registrados</Text>
        }
        renderItem={({ item, index }: { item: Donante; index: number }) => (
          <ItemCard
            donante={item}
            index={index}
            onPress={() => navigation.navigate('Detail', { id: item.id })}
          />
        )}
      />

      {/* FAB con animación de escala (rebote) */}
      <Animated.View style={[styles.fabWrapper, { transform: [{ scale: fabScale }] }]}>
        <Pressable
          style={styles.fab}
          onPress={() => navigation.navigate('Create')}
          onPressIn={handleFabPressIn}
          onPressOut={handleFabPressOut}
        >
          <Text style={styles.fabTexto}>+</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: SPACING.lg },
  lista: { padding: SPACING.lg, paddingBottom: 100 },
  vacio: { textAlign: 'center', color: COLORS.textSecondary, marginTop: SPACING.xl },
  errorText: { ...TYPOGRAPHY.body, color: COLORS.danger, marginBottom: SPACING.md },
  boton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    borderRadius: 10,
  },
  botonTexto: { color: '#fff', fontWeight: '600' },
  fabWrapper: {
    position: 'absolute',
    right: SPACING.lg,
    bottom: SPACING.lg + 56,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  fabTexto: { color: '#fff', fontSize: 28, lineHeight: 30 },
  logoutBtn: { paddingHorizontal: SPACING.sm, paddingVertical: SPACING.xs },
  logoutTexto: { color: '#fff', fontWeight: '600', fontSize: 14 },
});
