import React from 'react';
import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { AppProvider } from './AppContext';
import HomeScreen from './screens/HomeScreen';
import RecipeDetailScreen from './screens/RecipeDetailScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import AddRecipeScreen from './screens/AddRecipeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={({ navigation }) => ({
              title: 'Foodie',
              headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
                  <Ionicons name="heart" size={26} color="#e63946" />
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen name="Detail" component={RecipeDetailScreen} options={{ title: 'Recipe' }} />
          <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'Favorites' }} />
          <Stack.Screen name="AddRecipe" component={AddRecipeScreen} options={{ title: 'Recipe Form' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
