import React, { useState } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useApp } from '../AppContext';
import { categories } from '../data';
import RecipeCard from '../components/RecipeCard';

const CHIPS = ['All', ...categories, 'My Food'];

export default function HomeScreen({ navigation }) {
  const { allRecipes, myRecipes, deleteRecipe } = useApp();
  const [selected, setSelected] = useState('All');
  const isMine = selected === 'My Food';

  const data = isMine
    ? myRecipes
    : allRecipes.filter((r) => !r.mine && (selected === 'All' || r.category === selected));

  return (
    <View style={s.container}>
      <View style={s.chipBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 10 }}>
          {CHIPS.map((c) => (
            <TouchableOpacity
              key={c}
              style={[s.chip, selected === c && s.chipActive]}
              onPress={() => setSelected(c)}
            >
              <Text style={[s.chipText, selected === c && s.chipTextActive]}>{c}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {isMine && (
        <View style={s.myHeader}>
          <Text style={s.title}>My Recipes</Text>
          <TouchableOpacity style={s.addBtn} onPress={() => navigation.navigate('AddRecipe')}>
            <Text style={s.addText}>+ Add New Recipe</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={data}
        keyExtractor={(r) => r.id}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
          <Text style={s.empty}>
            {isMine ? 'No recipes yet. Tap "Add New Recipe" to create one.' : 'No recipes found.'}
          </Text>
        }
        renderItem={({ item }) => (
          <RecipeCard
            recipe={item}
            onPress={() => navigation.navigate('Detail', { id: item.id })}
            showActions={isMine}
            onEdit={() => navigation.navigate('AddRecipe', { id: item.id })}
            onDelete={() => deleteRecipe(item.id)}
          />
        )}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6f6f6' },
  chipBar: { height: 56, justifyContent: 'center', backgroundColor: '#fff' },
  chip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#eee', marginRight: 8 },
  chipActive: { backgroundColor: '#e63946' },
  chipText: { color: '#333', fontWeight: '500' },
  chipTextActive: { color: '#fff' },
  myHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 12 },
  title: { fontSize: 20, fontWeight: '700' },
  addBtn: { backgroundColor: '#2a9d8f', paddingVertical: 8, paddingHorizontal: 14, borderRadius: 8 },
  addText: { color: '#fff', fontWeight: '600' },
  empty: { textAlign: 'center', color: '#777', marginTop: 40 },
});
