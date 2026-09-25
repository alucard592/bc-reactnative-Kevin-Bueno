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
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../store/authStore';
import { AuthStackParamList } from '../navigation/types';
import { COLORS, TYPOGRAPHY, SPACING } from '../theme';

type NavProp = NativeStackNavigationProp<AuthStackParamList, 'Register'>;

export function RegisterScreen() {
  const navigation = useNavigation<NavProp>();
  const login = useAuthStore((s) => s.login);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (!username.trim() || !email.trim() || !password.trim() || !confirm.trim()) {
      setError('Completa todos los campos');
      return;
    }
    if (password !== confirm) {
      setError('Las contraseñas no coinciden');
      return;
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    setError('');
    setLoading(true);

    // Simula registro y luego intenta login con credenciales mock
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLoading(false);

    // En un proyecto real aquí iría la llamada al API de registro.
    // Como es mock, mostramos éxito y redirigimos al login.
    Alert.alert(
      'Registro exitoso',
      `Bienvenido, ${username}. Ahora puedes iniciar sesión con tus credenciales.\n\n(Demo: usa admin / 123456)`,
      [{ text: 'Ir al login', onPress: () => navigation.navigate('Login') }]
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        {/* Cabecera */}
        <View style={styles.header}>
          <Text style={styles.logo}>🩸</Text>
          <Text style={styles.titulo}>Crear cuenta</Text>
          <Text style={styles.subtitulo}>Banco de Sangre</Text>
        </View>

        {/* Formulario */}
        <View style={styles.card}>
          <Text style={styles.label}>Nombre de usuario</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. enfermero1"
            placeholderTextColor={COLORS.textSecondary}
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Text style={styles.label}>Correo electrónico</Text>
          <TextInput
            style={styles.input}
            placeholder="correo@hospital.com"
            placeholderTextColor={COLORS.textSecondary}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="Mínimo 6 caracteres"
            placeholderTextColor={COLORS.textSecondary}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Text style={styles.label}>Confirmar contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="Repite tu contraseña"
            placeholderTextColor={COLORS.textSecondary}
            value={confirm}
            onChangeText={setConfirm}
            secureTextEntry
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Pressable
            style={[styles.boton, loading && styles.botonDisabled]}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.botonTexto}>Registrarse</Text>
            )}
          </Pressable>

          <Pressable style={styles.linkContainer} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>
              ¿Ya tienes cuenta? <Text style={styles.linkBold}>Inicia sesión</Text>
            </Text>
          </Pressable>
        </View>
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
});
