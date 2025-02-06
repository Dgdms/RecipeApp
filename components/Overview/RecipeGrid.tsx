import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

import RecipeCard from '../recipeCard';
import recipes from '@/data/recipeButtonData'; 
import { VStack } from '../ui/vstack';
type RecipeGridProps = {
  onPress: (recipes: any) => void;
};

const RecipeGrid: React.FC<RecipeGridProps> = ({ onPress }) => {
    return (
      <ScrollView>
        {recipes.map((recipe, index) => (
          <VStack key={index}>
          <TouchableOpacity onPress={() => onPress(recipe)} key={index}>
          <RecipeCard key={index} recipe={recipe} />
          </TouchableOpacity>
          </VStack>
        ))}
      </ScrollView>
    );
};
 


export default RecipeGrid;
