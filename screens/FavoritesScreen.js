import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../AppContext';
import RecipeCard from '../components/RecipeCard';

export default function FavoritesScreen({ navigation }) {
  const { allRecipes, favorites, colors } = useApp();
  const data = allRecipes.filter((r) => favorites.includes(r.id));

  const bgColor = colors?.bg || '#f6f6f6';
  const textColor = colors?.text || '#222222';
  const subtextColor = colors?.subtext || '#777777';

  return (
    <View style={[s.container, { backgroundColor: bgColor }]}>
      <FlatList
        data={data}
        keyExtractor={(r) => r.id}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
          <View style={s.emptyBox}>
            <Ionicons name="heart-dislike-outline" size={56} color="#bbb" />
            <Text style={[s.emptyTitle, { color: textColor }]}>No Favorites Yet</Text>
            <Text style={[s.emptySubtitle, { color: subtextColor }]}>
              Tap the heart icon on any recipe to add it to your personal favorites list.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <RecipeCard
            recipe={item}
            onPress={() => navigation.navigate('Detail', { id: item.id })}
          />
        )}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  emptyBox: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
    paddingHorizontal: 30,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 16,
  },
  emptySubtitle: {
    textAlign: 'center',
    marginTop: 8,
    fontSize: 15,
    lineHeight: 22,
  },
});
