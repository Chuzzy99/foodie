import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RECIPES } from './data';

const Ctx = createContext();
export const useApp = () => useContext(Ctx);

export function AppProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [myRecipes, setMyRecipes] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const f = await AsyncStorage.getItem('favorites');
        const m = await AsyncStorage.getItem('myRecipes');
        if (f) setFavorites(JSON.parse(f));
        if (m) setMyRecipes(JSON.parse(m));
      } catch (e) {}
      setLoaded(true);
    })();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem('favorites', JSON.stringify(favorites)).catch(() => {});
    AsyncStorage.setItem('myRecipes', JSON.stringify(myRecipes)).catch(() => {});
  }, [favorites, myRecipes, loaded]);

  const toggleFavorite = (id) =>
    setFavorites((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));

  const saveRecipe = (r) =>
    setMyRecipes((list) =>
      list.some((x) => x.id === r.id) ? list.map((x) => (x.id === r.id ? r : x)) : [r, ...list]
    );

  const deleteRecipe = (id) => {
    setMyRecipes((l) => l.filter((x) => x.id !== id));
    setFavorites((f) => f.filter((x) => x !== id));
  };

  const allRecipes = [...myRecipes, ...RECIPES];

  return (
    <Ctx.Provider value={{ favorites, myRecipes, allRecipes, toggleFavorite, saveRecipe, deleteRecipe }}>
      {children}
    </Ctx.Provider>
  );
}
