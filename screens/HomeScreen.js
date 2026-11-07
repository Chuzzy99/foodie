import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../AppContext';
import { categories } from '../data';
import RecipeCard from '../components/RecipeCard';

const CHIPS = ['All', 'Explore', ...categories, 'My Food'];

export default function HomeScreen({ navigation }) {
  const {
    allRecipes,
    myRecipes,
    apiRecipes,
    loadingApi,
    apiError,
    refreshApi,
    deleteRecipe,
    colors,
  } = useApp();

  const [selected, setSelected] = useState('All');
  const isMine = selected === 'My Food';
  const isExplore = selected === 'Explore';

  let data = [];
  if (isMine) {
    data = myRecipes;
  } else if (isExplore) {
    data = apiRecipes;
  } else if (selected === 'All') {
    data = allRecipes.filter((r) => !r.mine);
  } else {
    data = allRecipes.filter((r) => !r.mine && r.category === selected);
  }

  const bgColor = colors?.bg || '#f6f6f6';
  const cardColor = colors?.card || '#ffffff';
  const textColor = colors?.text || '#222222';
  const subtextColor = colors?.subtext || '#777777';
  const chipBg = colors?.chip || '#eeeeee';

  return (
    <View style={[s.container, { backgroundColor: bgColor }]}>
      {/* Category Chips Bar */}
      <View style={[s.chipBar, { backgroundColor: cardColor }]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10 }}
        >
          {CHIPS.map((c) => {
            const isActive = selected === c;
            return (
              <TouchableOpacity
                key={c}
                style={[
                  s.chip,
                  { backgroundColor: isActive ? '#e63946' : chipBg },
                ]}
                onPress={() => setSelected(c)}
              >
                {c === 'Explore' && (
                  <Ionicons
                    name="cloud-outline"
                    size={14}
                    color={isActive ? '#fff' : '#457b9d'}
                    style={{ marginRight: 4 }}
                  />
                )}
                <Text
                  style={[
                    s.chipText,
                    { color: isActive ? '#fff' : textColor },
                  ]}
                >
                  {c}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* "My Food" Header */}
      {isMine && (
        <View style={s.myHeader}>
          <Text style={[s.title, { color: textColor }]}>My Recipes</Text>
          <TouchableOpacity
            style={s.addBtn}
            onPress={() => navigation.navigate('AddRecipe')}
          >
            <Ionicons name="add" size={18} color="#fff" style={{ marginRight: 4 }} />
            <Text style={s.addText}>Add New Recipe</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* "Explore (API)" Header & Controls */}
      {isExplore && (
        <View style={s.exploreHeader}>
          <View>
            <Text style={[s.title, { color: textColor }]}>Explore Recipes</Text>
            <Text style={[s.subtitle, { color: subtextColor }]}>
              Live dishes fetched from TheMealDB API
            </Text>
          </View>
          <TouchableOpacity
            style={s.refreshBtn}
            onPress={refreshApi}
            disabled={loadingApi}
          >
            <Ionicons
              name="refresh"
              size={18}
              color="#fff"
              style={{ marginRight: 4 }}
            />
            <Text style={s.refreshText}>Sync API</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* API Loading / Error States */}
      {isExplore && loadingApi && (
        <View style={s.loaderBox}>
          <ActivityIndicator size="large" color="#e63946" />
          <Text style={[s.loaderText, { color: subtextColor }]}>
            Fetching delicious recipes from TheMealDB...
          </Text>
        </View>
      )}

      {isExplore && !loadingApi && !!apiError && (
        <View style={s.errorBox}>
          <Ionicons name="cloud-offline-outline" size={32} color="#d62828" />
          <Text style={s.errorTitle}>Unable to reach TheMealDB</Text>
          <Text style={s.errorMessage}>{apiError}</Text>
          <TouchableOpacity style={s.retryBtn} onPress={refreshApi}>
            <Text style={s.retryText}>Retry Fetch</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Recipe List */}
      <FlatList
        data={data}
        keyExtractor={(r) => r.id}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
          !loadingApi && (
            <View style={s.emptyBox}>
              <Ionicons
                name={isMine ? 'restaurant-outline' : 'search-outline'}
                size={48}
                color="#bbb"
              />
              <Text style={[s.empty, { color: subtextColor }]}>
                {isMine
                  ? 'No recipes yet. Tap "+ Add New Recipe" to create one.'
                  : isExplore
                  ? 'No online recipes available right now.'
                  : 'No recipes found for this category.'}
              </Text>
            </View>
          )
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
  container: { flex: 1 },
  chipBar: {
    height: 56,
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  chipText: { fontWeight: '600', fontSize: 14 },
  myHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 4,
  },
  exploreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: { fontSize: 20, fontWeight: '700' },
  subtitle: { fontSize: 13, marginTop: 2 },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a9d8f',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  addText: { color: '#fff', fontWeight: '600', fontSize: 14 },
  refreshBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#457b9d',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  refreshText: { color: '#fff', fontWeight: '600', fontSize: 13 },
  loaderBox: {
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderText: {
    marginTop: 10,
    fontSize: 14,
  },
  errorBox: {
    margin: 16,
    padding: 20,
    backgroundColor: '#ffeaea',
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ffcdd2',
  },
  errorTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#d62828',
    marginTop: 8,
  },
  errorMessage: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 12,
  },
  retryBtn: {
    backgroundColor: '#d62828',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 6,
  },
  retryText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
  emptyBox: {
    alignItems: 'center',
    marginTop: 60,
    paddingHorizontal: 20,
  },
  empty: {
    textAlign: 'center',
    marginTop: 12,
    fontSize: 15,
    lineHeight: 22,
  },
});
