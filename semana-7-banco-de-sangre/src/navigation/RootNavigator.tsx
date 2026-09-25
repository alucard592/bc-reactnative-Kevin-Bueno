import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { DetailScreen } from '../screens/DetailScreen';
import { CreateScreen } from '../screens/CreateScreen';
import { EditScreen } from '../screens/EditScreen';
import { RootStackParamList } from './types';
import { COLORS } from '../theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: '🩸 Banco de Sangre' }} />
      <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Detalle del donante' }} />
      <Stack.Screen name="Create" component={CreateScreen} options={{ title: 'Nuevo donante' }} />
      <Stack.Screen name="Edit" component={EditScreen} options={{ title: 'Editar donante' }} />
    </Stack.Navigator>
  );
}