import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../stores/authStore';
import { AuthStackParamList } from '../navigation/types';
import { COLORS, TYPOGRAPHY, SPACING } from '../theme';

type NavProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

export function LoginScreen() {
  const navigation = useNavigation<NavProp>();
  const login = useAuthStore((s) => s.login);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      setError('Completa todos los campos');
      return;
    }
    setError('');
    setLoading(true);
    const result = await login(username, password);
    setLoading(false);
    if (!result.success) {
      setError(result.error ?? 'Error al iniciar sesión');
    }
    // Si success, el RootNavigator detecta isAuthenticated y navega solo
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        {/* Logo / cabecera */}
        <View style={styles.header}>
          <Text style={styles.logo}>🩸</Text>
          <Text style={styles.titulo}>Banco de Sangre</Text>
          <Text style={styles.subtitulo}>Inicia sesión para continuar</Text>
        </View>

        {/* Formulario */}
        <View style={styles.card}>
          <Text style={styles.label}>Usuario</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. admin"
            placeholderTextColor={COLORS.textSecondary}
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••"
            placeholderTextColor={COLORS.textSecondary}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Pressable
            style={[styles.boton, loading && styles.botonDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.botonTexto}>Ingresar</Text>
            )}
          </Pressable>

          <Pressable style={styles.linkContainer} onPress={() => navigation.navigate('Register')}>
            <Text style={styles.link}>¿No tienes cuenta? <Text style={styles.linkBold}>Regístrate</Text></Text>
          </Pressable>
        </View>

        <Text style={styles.hint}>Credenciales de prueba: admin / 123456</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: COLORS.background },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: SPACING.lg,
  },
  header: { alignItems: 'center', marginBottom: SPACING.xl },
  logo: { fontSize: 64 },
  titulo: { ...TYPOGRAPHY.title, color: COLORS.primary, marginTop: SPACING.sm },
  subtitulo: { ...TYPOGRAPHY.body, color: COLORS.textSecondary, marginTop: SPACING.xs },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: SPACING.lg,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  label: { ...TYPOGRAPHY.subtitle, color: COLORS.text, marginBottom: SPACING.xs, marginTop: SPACING.md },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: SPACING.md,
    fontSize: 14,
    color: COLORS.text,
    backgroundColor: '#fafafa',
  },
  error: {
    color: COLORS.danger,
    fontSize: 13,
    marginTop: SPACING.sm,
    textAlign: 'center',
  },
  boton: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    marginTop: SPACING.lg,
  },
  botonDisabled: { opacity: 0.6 },
  botonTexto: { color: '#fff', fontWeight: '700', fontSize: 15 },
  linkContainer: { alignItems: 'center', marginTop: SPACING.md },
  link: { color: COLORS.textSecondary, fontSize: 13 },
  linkBold: { color: COLORS.primary, fontWeight: '700' },
  hint: {
    textAlign: 'center',
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: SPACING.xl,
  },
});
