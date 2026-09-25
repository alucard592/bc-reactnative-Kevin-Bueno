import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { DetailScreen } from '../screens/DetailScreen';
import { CreateScreen } from '../screens/CreateScreen';
import { EditScreen } from '../screens/EditScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { RootStackParamList, AuthStackParamList } from './types';
import { useAuthStore } from '../stores/authStore';
import { COLORS } from '../theme';

const AppStack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();

function AuthNavigator() {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: '🩸 Banco de Sangre', headerBackVisible: false }}
      />
      <AuthStack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: 'Crear cuenta' }}
      />
    </AuthStack.Navigator>
  );
}

function AppNavigator() {
  return (
    <AppStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <AppStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: '🩸 Banco de Sangre' }}
      />
      <AppStack.Screen
        name="Detail"
        component={DetailScreen}
        options={{ title: 'Detalle del donante' }}
      />
      <AppStack.Screen
        name="Create"
        component={CreateScreen}
        options={{ title: 'Nuevo donante' }}
      />
      <AppStack.Screen
        name="Edit"
        component={EditScreen}
        options={{ title: 'Editar donante' }}
      />
    </AppStack.Navigator>
  );
}

export function RootNavigator() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return isAuthenticated ? <AppNavigator /> : <AuthNavigator />;
}
