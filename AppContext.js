import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RECIPES } from './data';
import { getItem, setItem, STORAGE_KEYS } from './services/storage';
import { getSession, clearSession, authenticateUser, saveUser } from './services/authStorage';
import { fetchApiRecipes, getCachedApiRecipes } from './services/api';
import { initNotifications } from './services/notifications';

const Ctx = createContext();
export const useApp = () => useContext(Ctx);

export function AppProvider({ children }) {
  const [session, setSessionState] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [myRecipes, setMyRecipes] = useState([]);
  const [apiRecipes, setApiRecipes] = useState([]);
  const [loadingApi, setLoadingApi] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [settings, setSettings] = useState({
    darkMode: false,
    notificationsEnabled: true,
    reminderMinutes: 1,
  });
  const [loaded, setLoaded] = useState(false);

  // Initial load
  useEffect(() => {
    (async () => {
      try {
        initNotifications();

        // Load session
        const existingSession = await getSession();
        if (existingSession) setSessionState(existingSession);

        // Load favorites (with backward compatibility)
        let f = await getItem(STORAGE_KEYS.FAVORITES);
        if (!f) {
          const legacyF = await AsyncStorage.getItem('favorites');
          if (legacyF) f = JSON.parse(legacyF);
        }
        if (f && Array.isArray(f)) setFavorites(f);

        // Load myRecipes (with backward compatibility)
        let m = await getItem(STORAGE_KEYS.MY_RECIPES);
        if (!m) {
          const legacyM = await AsyncStorage.getItem('myRecipes');
          if (legacyM) m = JSON.parse(legacyM);
        }
        if (m && Array.isArray(m)) setMyRecipes(m);

        // Load settings
        const s = await getItem(STORAGE_KEYS.SETTINGS);
        if (s) setSettings((prev) => ({ ...prev, ...s }));

        // Load cached API recipes
        const cachedMeals = await getCachedApiRecipes();
        if (cachedMeals && cachedMeals.length > 0) {
          setApiRecipes(cachedMeals);
        }

        // Fetch fresh API recipes
        refreshApi();
      } catch (e) {
        console.warn('AppProvider initialization error:', e);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  // Save favorites & myRecipes whenever they change
  useEffect(() => {
    if (!loaded) return;
    setItem(STORAGE_KEYS.FAVORITES, favorites);
    AsyncStorage.setItem('favorites', JSON.stringify(favorites)).catch(() => {});
  }, [favorites, loaded]);

  useEffect(() => {
    if (!loaded) return;
    setItem(STORAGE_KEYS.MY_RECIPES, myRecipes);
    AsyncStorage.setItem('myRecipes', JSON.stringify(myRecipes)).catch(() => {});
  }, [myRecipes, loaded]);

  useEffect(() => {
    if (!loaded) return;
    setItem(STORAGE_KEYS.SETTINGS, settings);
  }, [settings, loaded]);

  const refreshApi = async () => {
    setLoadingApi(true);
    setApiError(null);
    try {
      const meals = await fetchApiRecipes('chicken');
      setApiRecipes(meals);
    } catch (err) {
      setApiError(err.message || 'Unable to fetch online recipes.');
    } finally {
      setLoadingApi(false);
    }
  };

  const login = async (email, password) => {
    const sess = await authenticateUser(email, password);
    setSessionState(sess);
    return sess;
  };

  const signup = async (username, email, password) => {
    const user = await saveUser({ username, email, password });
    const sess = await authenticateUser(email, password);
    setSessionState(sess);
    return user;
  };

  const logout = async () => {
    await clearSession();
    setSessionState(null);
  };

  const updateSettings = (newPartial) => {
    setSettings((prev) => ({ ...prev, ...newPartial }));
  };

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

  const allRecipes = useMemo(() => {
    return [...myRecipes, ...RECIPES, ...apiRecipes];
  }, [myRecipes, apiRecipes]);

  const isDarkMode = !!settings.darkMode;

  const colors = useMemo(() => {
    return isDarkMode
      ? {
          bg: '#121212',
          card: '#1e1e1e',
          text: '#ffffff',
          subtext: '#aaaaaa',
          border: '#333333',
          chip: '#2a2a2a',
          chipActive: '#e63946',
          primary: '#e63946',
          secondary: '#457b9d',
          accent: '#2a9d8f',
        }
      : {
          bg: '#f6f6f6',
          card: '#ffffff',
          text: '#222222',
          subtext: '#777777',
          border: '#e0e0e0',
          chip: '#eeeeee',
          chipActive: '#e63946',
          primary: '#e63946',
          secondary: '#457b9d',
          accent: '#2a9d8f',
        };
  }, [isDarkMode]);

  return (
    <Ctx.Provider
      value={{
        session,
        user: session,
        loaded,
        login,
        signup,
        logout,
        favorites,
        myRecipes,
        apiRecipes,
        loadingApi,
        apiError,
        refreshApi,
        allRecipes,
        toggleFavorite,
        saveRecipe,
        deleteRecipe,
        settings,
        updateSettings,
        isDarkMode,
        colors,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}
