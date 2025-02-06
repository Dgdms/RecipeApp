import React from 'react';
import { View, TouchableOpacity, StyleSheet, FlatList, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import recipeButtonData from '@/data/recipeButtonData'; // Rezeptdaten importieren

type RecipeGridProps = {
  onPress: (recipe: any) => void;
};

const RecipeGrid: React.FC<RecipeGridProps> = ({ onPress }) => {
  return (
    <FlatList
      data={recipeButtonData} // Rezeptdaten hier verwenden
      keyExtractor={(item, index) => index.toString()}
      numColumns={2}  // 2 Rezepte pro Zeile
      contentContainerStyle={styles.gridContainer}
      renderItem={({ item: recipe }) => (
        <TouchableOpacity
          onPress={() => onPress(recipe)} // Rezept beim Klicken auswählen
          style={[styles.item, { borderColor: recipe.color }]} // Rahmen in Rezeptfarbe
        >
          {/* Wenn das Rezept kein Icon hat, ein Platzhalter anzeigen */}
          {recipe.icon ? (
            <Icon name={recipe.icon} size={50} color={recipe.color} />
          ) : (
            <Icon name="image" size={50} color="lightgray" /> // Platzhalter-Icon
          )}
          <Text style={styles.recipeName}>{recipe.name}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  item: {
    flex: 1,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 15,
    backgroundColor: 'white',
    borderWidth: 1,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  recipeName: {
    marginTop: 15,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
});

export default RecipeGrid;
