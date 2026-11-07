import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEYS = {
  USERS: 'foodie_users',
  SESSION: 'foodie_session',
  FAVORITES: 'foodie_favorites',
  MY_RECIPES: 'foodie_my_recipes',
  SETTINGS: 'foodie_settings',
  API_CACHE: 'foodie_cached_api_recipes',
};

export const getItem = async (key, defaultValue = null) => {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? JSON.parse(raw) : defaultValue;
  } catch (error) {
    console.warn(`Error reading key "${key}":`, error);
    return defaultValue;
  }
};

export const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn(`Error setting key "${key}":`, error);
    return false;
  }
};

export const removeItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.warn(`Error removing key "${key}":`, error);
    return false;
  }
};

export const getAllStoredData = async () => {
  try {
    const result = {};
    for (const [name, key] of Object.entries(STORAGE_KEYS)) {
      const raw = await AsyncStorage.getItem(key);
      try {
        result[name] = { key, parsed: raw ? JSON.parse(raw) : null, rawString: raw || 'null' };
      } catch {
        result[name] = { key, parsed: raw, rawString: raw || 'null' };
      }
    }
    return result;
  } catch (error) {
    console.warn('Error reading all stored data:', error);
    return {};
  }
};

export const clearAllData = async () => {
  try {
    const keys = Object.values(STORAGE_KEYS);
    await AsyncStorage.multiRemove(keys);
    return true;
  } catch (error) {
    console.warn('Error clearing storage:', error);
    return false;
  }
};
