import { getItem, setItem, STORAGE_KEYS } from './storage';

const MEALDB_SEARCH_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=chicken';
const MEALDB_CATEGORIES_URL = 'https://www.themealdb.com/api/json/v1/1/categories.php';

const parseMealToRecipe = (meal) => {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      const cleanMeasure = measure && measure.trim() ? `${measure.trim()} ` : '';
      ingredients.push(`${cleanMeasure}${ingredient.trim()}`);
    }
  }

  const rawInstructions = meal.strInstructions || '';
  const instructions = rawInstructions
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && !s.match(/^STEP\s*\d+/i));

  return {
    id: `api-${meal.idMeal}`,
    apiId: meal.idMeal,
    name: meal.strMeal,
    category: meal.strCategory || 'Explore',
    image: meal.strMealThumb,
    time: '35 min',
    servings: 4,
    calories: 420,
    difficulty: 'Medium',
    ingredients: ingredients.length > 0 ? ingredients : ['Chicken and seasonings'],
    instructions: instructions.length > 0 ? instructions : [rawInstructions || 'Cook thoroughly.'],
    isApi: true,
  };
};

export const fetchApiRecipes = async (query = 'chicken') => {
  const url = query
    ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`
    : MEALDB_SEARCH_URL;

  try {
    const response = await fetch(url, { method: 'GET' });
    if (!response.ok) {
      throw new Error(`Server returned HTTP ${response.status}`);
    }

    const data = await response.json();
    if (!data || !data.meals) {
      const cached = await getItem(STORAGE_KEYS.API_CACHE, []);
      return cached;
    }

    const recipes = data.meals.map(parseMealToRecipe);
    await setItem(STORAGE_KEYS.API_CACHE, recipes);
    return recipes;
  } catch (err) {
    const cached = await getItem(STORAGE_KEYS.API_CACHE, null);
    if (cached && cached.length > 0) {
      return cached;
    }
    throw new Error(err.message || 'Failed to fetch recipes from TheMealDB.');
  }
};

export const fetchApiCategories = async () => {
  try {
    const response = await fetch(MEALDB_CATEGORIES_URL);
    if (!response.ok) throw new Error('Failed to load categories');
    const data = await response.json();
    return data.categories || [];
  } catch (err) {
    console.warn('TheMealDB categories fetch error:', err.message);
    return [];
  }
};

export const getCachedApiRecipes = async () => {
  return await getItem(STORAGE_KEYS.API_CACHE, []);
};
