import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../AppContext';

export default function RecipeCard({ recipe, onPress, showActions, onEdit, onDelete }) {
  const { favorites, toggleFavorite } = useApp();
  const fav = favorites.includes(recipe.id);

  return (
    <TouchableOpacity style={s.card} onPress={onPress} activeOpacity={0.85}>
      {recipe.image ? (
        <Image source={{ uri: recipe.image }} style={s.img} />
      ) : (
        <View style={[s.img, s.placeholder]}>
          <Ionicons name="restaurant" size={40} color="#bbb" />
        </View>
      )}
      <View style={s.row}>
        <Text style={s.name}>{recipe.name}</Text>
        <TouchableOpacity onPress={() => toggleFavorite(recipe.id)}>
          <Ionicons name={fav ? 'heart' : 'heart-outline'} size={28} color="#e63946" />
        </TouchableOpacity>
      </View>
      {showActions && (
        <View style={s.actions}>
          <TouchableOpacity style={[s.btn, { backgroundColor: '#457b9d' }]} onPress={onEdit}>
            <Text style={s.btnText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[s.btn, { backgroundColor: '#d62828' }]} onPress={onDelete}>
            <Text style={s.btnText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 12, marginBottom: 16, overflow: 'hidden', elevation: 3, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 6 },
  img: { width: '100%', height: 180 },
  placeholder: { backgroundColor: '#eee', alignItems: 'center', justifyContent: 'center' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12 },
  name: { fontSize: 18, fontWeight: '600', flex: 1, paddingRight: 8 },
  actions: { flexDirection: 'row', paddingHorizontal: 12, paddingBottom: 12 },
  btn: { paddingVertical: 8, paddingHorizontal: 20, borderRadius: 6, marginRight: 10 },
  btnText: { color: '#fff', fontWeight: '600' },
});
