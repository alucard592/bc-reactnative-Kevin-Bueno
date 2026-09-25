import React, { useEffect, useRef } from 'react';
import { View, Text, Image, Animated, StyleSheet, Pressable } from 'react-native';
import { Donante } from '../types';
import { COLORS, TYPOGRAPHY, SPACING } from '../theme';

interface ItemCardProps {
  donante: Donante;
  index?: number;
  onPress?: () => void;
}

export function ItemCard({ donante, index = 0, onPress }: ItemCardProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(30)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 350,
        delay: index * 60,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 350,
        delay: index * 60,
        useNativeDriver: true,
      }),
    ]).start();
  }, [index, opacity, translateY]);

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1.0,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View
        style={[
          styles.card,
          { opacity, transform: [{ translateY }, { scale }] },
        ]}
      >
        <Image source={{ uri: donante.avatar }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.nombre}>{donante.name}</Text>
          <Text style={styles.subtitulo}>
            {donante.tipoSangre} · {donante.ultimaDonacion}
          </Text>
          <Text style={donante.disponible ? styles.disponible : styles.noDisponible}>
            {donante.disponible ? 'Disponible' : 'No disponible'}
          </Text>
        </View>
      </Animated.View>
    </Pressable>
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
