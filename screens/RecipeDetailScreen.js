import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../AppContext';

export default function RecipeDetailScreen({ route, navigation }) {
  const { allRecipes, favorites, toggleFavorite, deleteRecipe, colors } = useApp();
  const recipe = allRecipes.find((r) => r.id === route.params?.id);

  const bgColor = colors?.card || '#ffffff';
  const textColor = colors?.text || '#222222';
  const subtextColor = colors?.subtext || '#777777';
  const metaBg = colors?.bg || '#f6f6f6';

  if (!recipe) {
    return (
      <View style={[s.notFound, { backgroundColor: bgColor }]}>
        <Ionicons name="alert-circle-outline" size={48} color="#e63946" />
        <Text style={[s.notFoundText, { color: textColor }]}>Recipe not found.</Text>
        <TouchableOpacity style={s.backBtn} onPress={() => navigation.goBack()}>
          <Text style={s.backBtnText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const fav = favorites.includes(recipe.id);
  const meta = [
    ['Prep time', recipe.time],
    ['Servings', recipe.servings],
    ['Calories', recipe.calories ? `${recipe.calories} kcal` : null],
    ['Difficulty', recipe.difficulty],
  ].filter(([, v]) => v);

  return (
    <ScrollView style={{ backgroundColor: bgColor }}>
      {recipe.image ? (
        <Image source={{ uri: recipe.image }} style={s.img} />
      ) : (
        <View style={[s.img, s.placeholder]}>
          <Ionicons name="restaurant" size={60} color="#bbb" />
        </View>
      )}

      <View style={s.body}>
        <View style={s.row}>
          <View style={{ flex: 1, paddingRight: 10 }}>
            <Text style={[s.name, { color: textColor }]}>{recipe.name}</Text>
            {recipe.category ? (
              <Text style={[s.categoryTag, { color: subtextColor }]}>
                {recipe.category}
                {recipe.isApi ? ' • Online Recipe' : ''}
              </Text>
            ) : null}
          </View>
          <TouchableOpacity
            onPress={() => toggleFavorite(recipe.id)}
            style={s.heartTouch}
          >
            <Ionicons
              name={fav ? 'heart' : 'heart-outline'}
              size={32}
              color="#e63946"
            />
          </TouchableOpacity>
        </View>

        {meta.length > 0 && (
          <View style={[s.metaBox, { backgroundColor: metaBg }]}>
            {meta.map(([k, v]) => (
              <View key={k} style={s.metaItem}>
                <Text style={[s.metaLabel, { color: subtextColor }]}>{k}</Text>
                <Text style={[s.metaValue, { color: textColor }]}>{String(v)}</Text>
              </View>
            ))}
          </View>
        )}

        <Text style={[s.section, { color: textColor }]}>Ingredients</Text>
        {(recipe.ingredients || []).map((i, idx) => (
          <View key={idx} style={s.ingredientRow}>
            <Ionicons name="checkmark-circle" size={18} color="#2a9d8f" style={{ marginRight: 8, marginTop: 2 }} />
            <Text style={[s.line, { color: textColor, flex: 1 }]}>{i}</Text>
          </View>
        ))}

        <Text style={[s.section, { color: textColor, marginTop: 24 }]}>Instructions</Text>
        {(recipe.instructions || []).map((step, idx) => (
          <View key={idx} style={s.stepRow}>
            <View style={s.stepBadge}>
              <Text style={s.stepBadgeText}>{idx + 1}</Text>
            </View>
            <Text style={[s.line, { color: textColor, flex: 1 }]}>{step}</Text>
          </View>
        ))}

        {recipe.mine && (
          <View style={s.actions}>
            <TouchableOpacity
              style={[s.btn, { backgroundColor: '#457b9d' }]}
              onPress={() => navigation.navigate('AddRecipe', { id: recipe.id })}
            >
              <Ionicons name="pencil" size={18} color="#fff" style={{ marginRight: 6 }} />
              <Text style={s.btnText}>Edit Recipe</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[s.btn, { backgroundColor: '#d62828' }]}
              onPress={() => {
                deleteRecipe(recipe.id);
                navigation.goBack();
              }}
            >
              <Ionicons name="trash" size={18} color="#fff" style={{ marginRight: 6 }} />
              <Text style={s.btnText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  img: { width: '100%', height: 260 },
  placeholder: {
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: { padding: 18 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  name: { fontSize: 24, fontWeight: '700' },
  categoryTag: { fontSize: 14, marginTop: 4, fontWeight: '500' },
  heartTouch: { padding: 6 },
  metaBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 12,
    padding: 12,
    marginTop: 16,
  },
  metaItem: { width: '50%', paddingVertical: 6 },
  metaLabel: { fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5 },
  metaValue: { fontSize: 16, fontWeight: '700', marginTop: 2 },
  section: { fontSize: 20, fontWeight: '700', marginTop: 20, marginBottom: 12 },
  ingredientRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 },
  stepRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 14 },
  stepBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#e63946',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 2,
  },
  stepBadgeText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  line: { fontSize: 16, lineHeight: 24 },
  actions: { flexDirection: 'row', marginTop: 30, marginBottom: 20 },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 8,
    marginRight: 12,
  },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  notFoundText: { fontSize: 18, fontWeight: '600', marginTop: 12 },
  backBtn: {
    marginTop: 16,
    backgroundColor: '#e63946',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  backBtnText: { color: '#fff', fontWeight: '600' },
});
