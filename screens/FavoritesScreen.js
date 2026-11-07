import React from 'react';
import { FlatList, Text } from 'react-native';
import { useApp } from '../AppContext';
import RecipeCard from '../components/RecipeCard';

export default function FavoritesScreen({ navigation }) {
  const { allRecipes, favorites } = useApp();
  const data = allRecipes.filter((r) => favorites.includes(r.id));

  return (
    <FlatList
      data={data}
      keyExtractor={(r) => r.id}
      contentContainerStyle={{ padding: 16 }}
      ListEmptyComponent={
        <Text style={{ textAlign: 'center', color: '#777', marginTop: 40 }}>
          No favorites yet. Tap the heart on a recipe to add it.
        </Text>
      }
      renderItem={({ item }) => (
        <RecipeCard recipe={item} onPress={() => navigation.navigate('Detail', { id: item.id })} />
      )}
    />
  );
}
