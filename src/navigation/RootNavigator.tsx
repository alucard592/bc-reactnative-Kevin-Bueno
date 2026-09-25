import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { HomeScreen } from '../screens/HomeScreen';
import { DetailScreen } from '../screens/DetailScreen';
import { FavoritesScreen } from '../screens/FavoritesScreen';
import { HomeStackParamList, RootTabParamList } from './types';
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
        name="Favorites"
        component={FavoritesScreen}
        options={{
          title: 'Favoritos',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}