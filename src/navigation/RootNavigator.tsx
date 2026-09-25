import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { HomeScreen } from '../screens/HomeScreen';
import { DetailScreen } from '../screens/DetailScreen';
import { SavedScreen } from '../screens/SavedScreen';
import { HomeStackParamList, RootTabParamList } from './saved';
import { useSavedStore } from '../stores/savedStore';
import { COLORS } from '../theme';

const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

const headerStyle = {
  headerStyle: { backgroundColor: COLORS.primary },
  headerTintColor: '#ffffff',
  headerTitleStyle: { fontWeight: 'bold' as const },
};

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={headerStyle}>
      <HomeStack.Screen
        name="HomeList"
        component={HomeScreen}
        options={{ title: '🩸 Banco de Sangre' }}
      />
      <HomeStack.Screen
        name="HomeDetail"
        component={DetailScreen}
        options={{ title: 'Detalle del donante' }}
      />
    </HomeStack.Navigator>
  );
}

export function RootNavigator() {
  const savedCount = useSavedStore((state) => state.savedIds.length);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#61DAFB',
        tabBarInactiveTintColor: '#999999',
        ...headerStyle,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Saved"
        component={SavedScreen}
        options={{
          title: 'Guardados',
          tabBarBadge: savedCount > 0 ? savedCount : undefined,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}