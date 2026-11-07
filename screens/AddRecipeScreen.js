import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useApp } from '../AppContext';

export default function AddRecipeScreen({ route, navigation }) {
  const { myRecipes, saveRecipe, colors } = useApp();
  const existing = route.params?.id ? myRecipes.find((r) => r.id === route.params.id) : null;

  const [name, setName] = useState(existing?.name || '');
  const [image, setImage] = useState(existing?.image || null);
  const [time, setTime] = useState(existing?.time || '20 min');
  const [servings, setServings] = useState(existing?.servings ? String(existing.servings) : '4');
  const [calories, setCalories] = useState(existing?.calories ? String(existing.calories) : '350');
  const [difficulty, setDifficulty] = useState(existing?.difficulty || 'Easy');
  const [ingredients, setIngredients] = useState(existing ? existing.ingredients.join('\n') : '');
  const [instructions, setInstructions] = useState(existing ? existing.instructions.join('\n') : '');
  const [error, setError] = useState('');

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions ? ImagePicker.MediaTypeOptions.Images : ['images'],
        quality: 0.5,
      });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImage(result.assets[0].uri);
      }
    } catch (e) {
      console.warn('Image picker error:', e);
    }
  };

  const lines = (t) => t.split('\n').map((l) => l.trim()).filter(Boolean);

  const onSave = () => {
    if (!name.trim() || !lines(ingredients).length || !lines(instructions).length) {
      setError('Please enter a name, at least one ingredient and at least one step.');
      return;
    }

    saveRecipe({
      ...(existing || {}),
      id: existing?.id || 'my-' + Date.now(),
      mine: true,
      category: 'My Food',
      name: name.trim(),
      image,
      time: time.trim() || '20 min',
      servings: parseInt(servings, 10) || 4,
      calories: parseInt(calories, 10) || 350,
      difficulty: difficulty.trim() || 'Easy',
      ingredients: lines(ingredients),
      instructions: lines(instructions),
    });

    navigation.goBack();
  };

  const bgColor = colors?.bg || '#f6f6f6';
  const cardColor = colors?.card || '#ffffff';
  const textColor = colors?.text || '#222222';
  const borderColor = colors?.border || '#cccccc';

  return (
    <ScrollView
      style={{ backgroundColor: bgColor }}
      contentContainerStyle={{ padding: 18, paddingBottom: 40 }}
    >
      <View style={[s.formCard, { backgroundColor: cardColor }]}>
        <Text style={[s.label, { color: textColor }]}>Recipe Name *</Text>
        <TextInput
          style={[s.input, { color: textColor, borderColor }]}
          value={name}
          onChangeText={setName}
          placeholder="e.g. Grandma's Special Stew"
          placeholderTextColor="#999"
        />

        <Text style={[s.label, { color: textColor }]}>Recipe Image</Text>
        <TouchableOpacity style={s.pick} onPress={pickImage} activeOpacity={0.85}>
          <Ionicons name="camera-outline" size={20} color="#fff" style={{ marginRight: 6 }} />
          <Text style={s.pickText}>{image ? 'Change Photo' : 'Upload Food Photo'}</Text>
        </TouchableOpacity>
        {image ? (
          <Image source={{ uri: image }} style={s.preview} />
        ) : (
          <View style={s.noImage}>
            <Ionicons name="image-outline" size={32} color="#aaa" />
            <Text style={{ color: '#aaa', fontSize: 13, marginTop: 4 }}>No photo selected</Text>
          </View>
        )}

        <View style={s.row}>
          <View style={{ flex: 1, marginRight: 8 }}>
            <Text style={[s.label, { color: textColor }]}>Prep Time</Text>
            <TextInput
              style={[s.input, { color: textColor, borderColor }]}
              value={time}
              onChangeText={setTime}
              placeholder="e.g. 25 min"
              placeholderTextColor="#999"
            />
          </View>
          <View style={{ flex: 1, marginLeft: 8 }}>
            <Text style={[s.label, { color: textColor }]}>Servings</Text>
            <TextInput
              style={[s.input, { color: textColor, borderColor }]}
              value={servings}
              onChangeText={setServings}
              keyboardType="numeric"
              placeholder="4"
              placeholderTextColor="#999"
            />
          </View>
        </View>

        <View style={s.row}>
          <View style={{ flex: 1, marginRight: 8 }}>
            <Text style={[s.label, { color: textColor }]}>Calories (kcal)</Text>
            <TextInput
              style={[s.input, { color: textColor, borderColor }]}
              value={calories}
              onChangeText={setCalories}
              keyboardType="numeric"
              placeholder="350"
              placeholderTextColor="#999"
            />
          </View>
          <View style={{ flex: 1, marginLeft: 8 }}>
            <Text style={[s.label, { color: textColor }]}>Difficulty</Text>
            <TextInput
              style={[s.input, { color: textColor, borderColor }]}
              value={difficulty}
              onChangeText={setDifficulty}
              placeholder="Easy / Medium / Hard"
              placeholderTextColor="#999"
            />
          </View>
        </View>

        <Text style={[s.label, { color: textColor }]}>Ingredients (one per line) *</Text>
        <TextInput
          style={[s.input, s.multi, { color: textColor, borderColor }]}
          value={ingredients}
          onChangeText={setIngredients}
          multiline
          placeholder={'2 eggs\n1 cup flour\n1 tbsp olive oil'}
          placeholderTextColor="#999"
        />

        <Text style={[s.label, { color: textColor }]}>
          Step-by-step instructions (one per line) *
        </Text>
        <TextInput
          style={[s.input, s.multi, { color: textColor, borderColor }]}
          value={instructions}
          onChangeText={setInstructions}
          multiline
          placeholder={'Mix the ingredients in a bowl\nPreheat oven to 180°C\nBake for 25 minutes'}
          placeholderTextColor="#999"
        />

        {!!error && (
          <View style={s.errorBox}>
            <Ionicons name="alert-circle" size={20} color="#d62828" style={{ marginRight: 6 }} />
            <Text style={s.errorText}>{error}</Text>
          </View>
        )}

        <TouchableOpacity style={s.save} onPress={onSave} activeOpacity={0.85}>
          <Ionicons name="save-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
          <Text style={s.saveText}>Save Recipe</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  formCard: {
    borderRadius: 14,
    padding: 18,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  label: { fontWeight: '600', marginTop: 14, marginBottom: 6, fontSize: 14 },
  input: { borderWidth: 1, borderRadius: 8, padding: 10, fontSize: 15 },
  row: { flexDirection: 'row' },
  multi: { minHeight: 100, textAlignVertical: 'top' },
  pick: {
    backgroundColor: '#457b9d',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  pickText: { color: '#fff', fontWeight: '600' },
  preview: { width: '100%', height: 180, borderRadius: 8, marginTop: 10 },
  noImage: {
    width: '100%',
    height: 100,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed',
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffe5e5',
    borderColor: '#d62828',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginTop: 14,
  },
  errorText: { color: '#d62828', fontSize: 13, fontWeight: '600', flex: 1 },
  save: {
    backgroundColor: '#2a9d8f',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 22,
  },
  saveText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
