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

// Funktion zum Speichern der Rezept-Buttons (recipeButtonData)
export const saveRecipeButtons = async (recipes: any[]) => {
  try {
    await AsyncStorage.setItem('@recipeButtons', JSON.stringify(recipes));
  } catch (e) {
    console.error('Fehler beim Speichern der Rezept-Buttons', e);
  }
};

// Funktion zum Laden der Rezept-Buttons (recipeButtonData)
export const loadRecipeButtons = async () => {
  try {
    const storedRecipes = await AsyncStorage.getItem('@recipeButtons');
    
    if (storedRecipes !== null) {
      return JSON.parse(storedRecipes);
    }
  } catch (e) {
    console.error('Fehler beim Abrufen der Rezept-Buttons', e);
  }
};

export const deleteRecipe = async (recipeName: string) => {
  try {
    // Lade die aktuellen Rezepte
    const recipes = await loadRecipes();
    if (recipes && Array.isArray(recipes)) {
      // Filtere das Rezept, dessen Name mit dem übergebenen Namen übereinstimmt
      const updatedRecipes = recipes.filter(recipe => recipe.name !== recipeName);
      
      // Speichern die aktualisierte Liste der Rezepte
      await saveRecipes(updatedRecipes);
      console.log(`Rezept "${recipeName}" wurde erfolgreich gelöscht.`);
    } else {
      console.log('Keine Rezepte gefunden.');
    }
  } catch (e) {
    console.error('Fehler beim Löschen des Rezepts', e);
  }
};