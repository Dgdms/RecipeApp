import AsyncStorage from '@react-native-async-storage/async-storage';

// Funktion zum Speichern der Rezepte
export const saveRecipes = async (recipes: any) => {
  try {
    await AsyncStorage.setItem('@recipes', JSON.stringify(recipes));
  } catch (e) {
    console.error('Fehler beim Speichern der Rezepte', e);
  }
};

// Funktion zum Laden der Rezepte
export const loadRecipes = async () => {
  try {
    const storedRecipes = await AsyncStorage.getItem('@recipes');
    if (storedRecipes !== null) {
      return JSON.parse(storedRecipes);
    }
  } catch (e) {
    console.error('Fehler beim Abrufen der Rezepte', e);
  }
};
