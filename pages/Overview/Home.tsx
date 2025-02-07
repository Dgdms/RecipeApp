import React, { useCallback, useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import NumberGridModal from '@/components/Overview/NumberGridModal';
import { router, useFocusEffect } from 'expo-router';
import calculateIngredientsForRecipe from '@/helpers/helper'; 
import RecipeGrid from '@/components/Overview/RecipeGrid';
import { deleteRecipe, loadRecipeButtons, loadRecipes, saveRecipeButtons, saveRecipes } from '@/services/recipe-service';
import recipes from '@/data/recpies';
import recipeButtonData from '@/data/recipeButtonData';

export default function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [pressedRecipe, setPressedRecipe] = useState<string>('');
  const [savedRecipes, setSavedRecipes] = useState([]);
  
  useFocusEffect(
    useCallback(() => {
      const fetchRecipes = async () => {
        const loadedRecipes = await loadRecipes();
        if (loadedRecipes) {
          setSavedRecipes(loadedRecipes);
        } else {
          await saveRecipes(recipes);
          setSavedRecipes(recipes);
        }
      };
  
      const fetchRecipeButtons = async () => {
        const loadedRecipeButtons = await loadRecipeButtons();
        if (!loadedRecipeButtons) {
          await saveRecipeButtons(recipeButtonData);
        }
      };
 
  
      fetchRecipes();
      fetchRecipeButtons();
    }, [])
  );
  
  const handleRecipePressed = (recipe: any) => {
    setPressedRecipe(recipe.name);
    setIsOpen(true);
  };

  const handleRecipeCalc = async (value: number) => {
    setIsOpen(false);
  
    const recipe = await calculateIngredientsForRecipe(pressedRecipe, value);
  
    router.push({
      pathname: '/tabs/(tabs)/overview/recipeOverview',
      params: { recipe: JSON.stringify(recipe) },  
    });
  };

  

  return (
    <View style={{ flex: 1 }}>
      <RecipeGrid onPress={handleRecipePressed} recipes={savedRecipes} />
      <NumberGridModal
        visible={isOpen}
        onClose={() => setIsOpen(false)}
        pressedValue={(value: number) => handleRecipeCalc(value)}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#007BFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  fabText: {
    color: 'white',
    fontSize: 36,
  },
  modalContainer: {
    position: 'absolute',
    top: '30%',
    left: '10%',
    right: '10%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 10,
  },
});
