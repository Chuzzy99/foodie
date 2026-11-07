import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../AppContext';

export default function RecipeCard({ recipe, onPress, showActions, onEdit, onDelete }) {
  const { favorites, toggleFavorite, colors, isDarkMode } = useApp();
  const fav = favorites.includes(recipe.id);

  const cardBg = colors?.card || '#fff';
  const textColor = colors?.text || '#222';
  const subtextColor = colors?.subtext || '#777';

  return (
    <TouchableOpacity
      style={[s.card, { backgroundColor: cardBg }]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      {recipe.image ? (
        <Image source={{ uri: recipe.image }} style={s.img} />
      ) : (
        <View style={[s.img, s.placeholder]}>
          <Ionicons name="restaurant" size={40} color="#bbb" />
        </View>
      )}

      {recipe.isApi && (
        <View style={s.apiBadge}>
          <Ionicons name="cloud-outline" size={14} color="#fff" style={{ marginRight: 4 }} />
          <Text style={s.apiBadgeText}>Online</Text>
        </View>
      )}

      <View style={s.row}>
        <View style={s.titleWrap}>
          <Text style={[s.name, { color: textColor }]} numberOfLines={1}>
            {recipe.name}
          </Text>
          {recipe.category ? (
            <Text style={[s.cat, { color: subtextColor }]}>{recipe.category}</Text>
          ) : null}
        </View>

        <View style={s.iconGroup}>
          <TouchableOpacity
            onPress={() => toggleFavorite(recipe.id)}
            style={s.heartBtn}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name={fav ? 'heart' : 'heart-outline'} size={26} color="#e63946" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onPress}
            style={s.chevronBtn}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="chevron-forward-circle" size={28} color="#457b9d" />
          </TouchableOpacity>
        </View>
      </View>

      {showActions && (
        <View style={s.actions}>
          <TouchableOpacity style={[s.btn, { backgroundColor: '#457b9d' }]} onPress={onEdit}>
            <Ionicons name="pencil" size={16} color="#fff" style={{ marginRight: 6 }} />
            <Text style={s.btnText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[s.btn, { backgroundColor: '#d62828' }]} onPress={onDelete}>
            <Ionicons name="trash" size={16} color="#fff" style={{ marginRight: 6 }} />
            <Text style={s.btnText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  card: {
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    position: 'relative',
  },
  img: { width: '100%', height: 180 },
  placeholder: { backgroundColor: '#eee', alignItems: 'center', justifyContent: 'center' },
  apiBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(42, 157, 143, 0.9)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  apiBadgeText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  titleWrap: { flex: 1, paddingRight: 8 },
  name: { fontSize: 18, fontWeight: '600' },
  cat: { fontSize: 13, marginTop: 2 },
  iconGroup: { flexDirection: 'row', alignItems: 'center' },
  heartBtn: { padding: 4, marginRight: 4 },
  chevronBtn: { padding: 4 },
  actions: { flexDirection: 'row', paddingHorizontal: 12, paddingBottom: 12 },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginRight: 10,
  },
  btnText: { color: '#fff', fontWeight: '600' },
});
