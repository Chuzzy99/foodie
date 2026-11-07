import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../AppContext';

export default function RecipeDetailScreen({ route, navigation }) {
  const { allRecipes, favorites, toggleFavorite, deleteRecipe } = useApp();
  const recipe = allRecipes.find((r) => r.id === route.params?.id);

  if (!recipe) return <Text style={{ padding: 20 }}>Recipe not found.</Text>;

  const fav = favorites.includes(recipe.id);
  const meta = [
    ['Prep time', recipe.time],
    ['Servings', recipe.servings],
    ['Calories', recipe.calories ? `${recipe.calories} kcal` : null],
    ['Difficulty', recipe.difficulty],
  ].filter(([, v]) => v);

  return (
    <ScrollView style={{ backgroundColor: '#fff' }}>
      {recipe.image ? <Image source={{ uri: recipe.image }} style={s.img} /> : null}
      <View style={s.body}>
        <View style={s.row}>
          <Text style={s.name}>{recipe.name}</Text>
          <TouchableOpacity onPress={() => toggleFavorite(recipe.id)}>
            <Ionicons name={fav ? 'heart' : 'heart-outline'} size={30} color="#e63946" />
          </TouchableOpacity>
        </View>

        {meta.length > 0 && (
          <View style={s.metaBox}>
            {meta.map(([k, v]) => (
              <View key={k} style={s.metaItem}>
                <Text style={s.metaLabel}>{k}</Text>
                <Text style={s.metaValue}>{String(v)}</Text>
              </View>
            ))}
          </View>
        )}

        <Text style={s.section}>Ingredients</Text>
        {(recipe.ingredients || []).map((i, idx) => (
          <Text key={idx} style={s.line}>• {i}</Text>
        ))}

        <Text style={s.section}>Instructions</Text>
        {(recipe.instructions || []).map((step, idx) => (
          <Text key={idx} style={s.line}>{idx + 1}. {step}</Text>
        ))}

        {recipe.mine && (
          <View style={s.actions}>
            <TouchableOpacity
              style={[s.btn, { backgroundColor: '#457b9d' }]}
              onPress={() => navigation.navigate('AddRecipe', { id: recipe.id })}
            >
              <Text style={s.btnText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[s.btn, { backgroundColor: '#d62828' }]}
              onPress={() => { deleteRecipe(recipe.id); navigation.goBack(); }}
            >
              <Text style={s.btnText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  img: { width: '100%', height: 240 },
  body: { padding: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 24, fontWeight: '700', flex: 1 },
  metaBox: { flexDirection: 'row', flexWrap: 'wrap', backgroundColor: '#f6f6f6', borderRadius: 10, padding: 10, marginTop: 12 },
  metaItem: { width: '50%', paddingVertical: 6 },
  metaLabel: { color: '#777', fontSize: 12 },
  metaValue: { fontSize: 16, fontWeight: '600' },
  section: { fontSize: 20, fontWeight: '700', marginTop: 20, marginBottom: 6 },
  line: { fontSize: 16, lineHeight: 24, marginBottom: 4 },
  actions: { flexDirection: 'row', marginTop: 24 },
  btn: { paddingVertical: 10, paddingHorizontal: 26, borderRadius: 8, marginRight: 12 },
  btnText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});
