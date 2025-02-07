import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import RecipeCard from '../recipeCard';
import { View } from '../Themed';
import { loadRecipeButtons } from '@/services/recipe-service';
type RecipeGridProps = {
  onPress: (recipe: any) => void;
  onLongPress: (name: any) => void;

};

const RecipeGrid: React.FC<RecipeGridProps> = ({ onPress}) => {
  const [recipes, setRecipes] = useState<any[]>([]);

  // Lade Rezept-Buttons aus AsyncStorage
  useEffect(() => {
    const fetchRecipes = async () => {
      const loadedRecipes = await loadRecipeButtons();
      if (loadedRecipes) {
        setRecipes(loadedRecipes);
      }
    };
    fetchRecipes();
  }, []);

  return (
    <ScrollView>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {recipes.map((recipe, index) => (
          <View
            key={index}
            style={{
              width: '50%',
              marginBottom: 10,
            }}
          >
            <RecipeCard recipe={recipe} onPress={() => onPress(recipe)} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default RecipeGrid;
