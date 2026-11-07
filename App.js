import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { AppProvider, useApp } from './AppContext';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import RecipeDetailScreen from './screens/RecipeDetailScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import AddRecipeScreen from './screens/AddRecipeScreen';
import SettingsMenuScreen from './screens/SettingsMenuScreen';
import SettingsScreen from './screens/SettingsScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import StoredDataScreen from './screens/StoredDataScreen';

const Stack = createNativeStackNavigator();

function RootNavigator() {
  const { session, loaded, colors, isDarkMode } = useApp();

  if (!loaded) {
    return (
      <View style={s.splash}>
        <View style={s.splashLogo}>
          <Ionicons name="restaurant" size={48} color="#fff" />
        </View>
        <Text style={s.splashText}>Foodie</Text>
        <ActivityIndicator size="large" color="#e63946" style={{ marginTop: 20 }} />
      </View>
    );
  }

  const headerBg = colors?.card || '#ffffff';
  const headerTextColor = colors?.text || '#222222';
  const iconColor = isDarkMode ? '#ffffff' : '#333333';

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={session ? 'Home' : 'Login'}
        screenOptions={{
          headerStyle: { backgroundColor: headerBg },
          headerTintColor: headerTextColor,
          headerTitleStyle: { fontWeight: '700' },
          headerShadowVisible: false,
        }}
      >
        {/* Auth Screens */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ title: 'Create Account' }}
        />

        {/* Main Home Screen with Logo & Action Buttons */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            headerTitle: () => (
              <View style={s.headerLogoRow}>
                <View style={s.logoMini}>
                  <Ionicons name="restaurant" size={18} color="#fff" />
                </View>
                <Text style={[s.brandTitle, { color: headerTextColor }]}>Foodie</Text>
              </View>
            ),
            headerRight: () => (
              <View style={s.headerRightIcons}>
                <TouchableOpacity
                  style={s.headerIconBtn}
                  onPress={() => navigation.navigate('Favorites')}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Ionicons name="heart" size={24} color="#e63946" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={s.headerIconBtn}
                  onPress={() => navigation.navigate('SettingsMenu')}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Ionicons name="settings-outline" size={24} color={iconColor} />
                </TouchableOpacity>
              </View>
            ),
          })}
        />

        {/* Recipe Detail, Favorites & Recipe Management */}
        <Stack.Screen
          name="Detail"
          component={RecipeDetailScreen}
          options={{ title: 'Recipe Details' }}
        />
        <Stack.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{ title: 'My Favorites' }}
        />
        <Stack.Screen
          name="AddRecipe"
          component={AddRecipeScreen}
          options={{ title: 'Recipe Form' }}
        />

        {/* Settings, Notifications & Storage Screens */}
        <Stack.Screen
          name="SettingsMenu"
          component={SettingsMenuScreen}
          options={{ title: 'Settings Menu' }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: 'Profile & Settings' }}
        />
        <Stack.Screen
          name="Notifications"
          component={NotificationsScreen}
          options={{ title: 'Notifications' }}
        />
        <Stack.Screen
          name="StoredData"
          component={StoredDataScreen}
          options={{ title: 'Stored Data (AsyncStorage)' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AppProvider>
      <RootNavigator />
    </AppProvider>
  );
}

const s = StyleSheet.create({
  splash: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  splashLogo: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#e63946',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#e63946',
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  splashText: {
    fontSize: 32,
    fontWeight: '800',
    color: '#222',
    marginTop: 16,
    letterSpacing: 1,
  },
  headerLogoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoMini: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#e63946',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  headerRightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIconBtn: {
    marginLeft: 14,
    padding: 2,
  },
});
