import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Pressable } from 'react-native';
import RecipeCard from '../recipeCard';
import { View } from '../Themed';
type RecipeGridProps = {
  onPress: (recipe: any) => void;
  recipes: any
};

const RecipeGrid: React.FC<RecipeGridProps> = ({ onPress, recipes, handleLongPress }) => {



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
