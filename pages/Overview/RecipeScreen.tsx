import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';

type Ingredient = {
  name: string;
  amount: number;
  unit: string;
};

type Recipe = {
  name: string;
  ingredients: Ingredient[];
};

export default function RecipeScreen() {
  const route = useRoute();
  const { recipe } = route.params as { recipe: string };


  let parsedRecipe: Recipe;
  try {
    parsedRecipe = JSON.parse(recipe);
  } catch {
    parsedRecipe = { name: 'Unbekanntes Rezept', ingredients: [] };
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{parsedRecipe.name}</Text>
      <FlatList
        data={parsedRecipe.ingredients}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.ingredientRow}>
            <Text style={styles.ingredientName}>{item.name}</Text>
            <Text style={styles.ingredientAmount}>
              {item.amount} {item.unit}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  ingredientRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#eee'
  },
  ingredientName: {
    fontSize: 18
  },
  ingredientAmount: {
    fontSize: 18
  }
});
