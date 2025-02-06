import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import NumberGridModal from '@/components/Overview/NumberGridModal';
import { router } from 'expo-router';
import NewRecipeModal from '@/components/Overview/NewRecipeModal'; // Neue Modal-Komponente importieren
import calculateIngredientsForRecipe from '@/helpers/helper'; 
import RecipeGrid from '@/components/Overview/RecipeGrid';

export default function Index() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false); // Modal-Sichtbarkeit
  const [pressedRecipe, setPressedRecipe] = useState<string>('');
  const [recipeButtonData, setRecipeButtonData] = useState([
    { name: 'Pizzateig', icon: '', color: 'grey' },
    { name: 'Pfannkuchen', icon: 'cake', color: 'grey' },
  ]);

  const handleRecipePressed = (recipe: any) => {
    setPressedRecipe(recipe.name);
    setIsOpen(true);
  };

  const handleRecipeCalc = (value: number) => {
    setIsOpen(false);
    const recipe = calculateIngredientsForRecipe(pressedRecipe, value);
    router.push({
      pathname: '(main)/(tabs)/home/recipeScreen',
      params: { recipe: JSON.stringify(recipe) },
    });
  };

  // Funktion zum Hinzufügen eines neuen Rezepts
  const addNewRecipe = (name: string, icon: string) => {
    const newRecipe = {
      name: name,
      icon: icon,
      color: 'grey', // Standardfarbe
    };

    setRecipeButtonData((prevData) => [...prevData, newRecipe]); // Rezept zu Daten hinzufügen
    setIsModalVisible(false); // Modal schließen
  };

  return (
    <View style={{ flex: 1 }}>
      <RecipeGrid onPress={handleRecipePressed} />
      <NumberGridModal
        visible={isOpen}
        onClose={() => setIsOpen(false)}
        pressedValue={(value: number) => handleRecipeCalc(value)}
      />

      {/* NewRecipeModal anzeigen */}
      <NewRecipeModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)} // Modal schließen
        onSave={addNewRecipe} // Rezept speichern
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
});
