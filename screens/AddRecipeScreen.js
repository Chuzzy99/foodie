import React, { useState } from 'react';
import { ScrollView, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useApp } from '../AppContext';

export default function AddRecipeScreen({ route, navigation }) {
  const { myRecipes, saveRecipe } = useApp();
  const existing = route.params?.id ? myRecipes.find((r) => r.id === route.params.id) : null;

  const [name, setName] = useState(existing?.name || '');
  const [image, setImage] = useState(existing?.image || null);
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
      ingredients: lines(ingredients),
      instructions: lines(instructions),
    });
    navigation.goBack();
  };

  return (
    <ScrollView style={{ backgroundColor: '#fff' }} contentContainerStyle={{ padding: 16 }}>
      <Text style={s.label}>Recipe name</Text>
      <TextInput style={s.input} value={name} onChangeText={setName} placeholder="e.g. Grandma's stew" />

      <Text style={s.label}>Image</Text>
      <TouchableOpacity style={s.pick} onPress={pickImage}>
        <Text style={s.pickText}>{image ? 'Change Image' : 'Upload Image'}</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={s.preview} />}

      <Text style={s.label}>Ingredients (one per line)</Text>
      <TextInput style={[s.input, s.multi]} value={ingredients} onChangeText={setIngredients} multiline placeholder={'2 eggs\n1 cup flour'} />

      <Text style={s.label}>Step-by-step instructions (one step per line)</Text>
      <TextInput style={[s.input, s.multi]} value={instructions} onChangeText={setInstructions} multiline placeholder={'Mix the ingredients\nBake for 20 minutes'} />

      {!!error && <Text style={s.error}>{error}</Text>}

      <TouchableOpacity style={s.save} onPress={onSave}>
        <Text style={s.saveText}>Save Recipe</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  label: { fontWeight: '600', marginTop: 16, marginBottom: 6, fontSize: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, fontSize: 16 },
  multi: { minHeight: 110, textAlignVertical: 'top' },
  pick: { backgroundColor: '#457b9d', padding: 12, borderRadius: 8, alignItems: 'center' },
  pickText: { color: '#fff', fontWeight: '600' },
  preview: { width: '100%', height: 180, borderRadius: 8, marginTop: 10 },
  error: { color: '#d62828', marginTop: 12 },
  save: { backgroundColor: '#2a9d8f', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 24 },
  saveText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
