import React, { useState } from 'react';
import { Text } from './ui/text';
import { TouchableOpacity, Image, useColorScheme } from 'react-native';
import { View } from './Themed';
import { Ionicons } from '@expo/vector-icons'; // Importiere Icon
import { deleteRecipe } from '@/services/recipe-service';

const RecipeCard = ({ recipe, onPress = () => {}, onLongPress=(name: string)=> {} }) => {
  // Erkenne den aktuellen Farbschema-Modus (Light oder Dark)
  const colorScheme = useColorScheme();

  // Definiere die Farben basierend auf dem Farbschema
  const backgroundColor = colorScheme === 'dark' ? '#333333' : '#ffffff'; // Dark Mode oder Light Mode
  const textColor = colorScheme === 'dark' ? '#f5f5f5' : '#1f2937'; // Textfarbe für Dark und Light Mode
  const descriptionColor = colorScheme === 'dark' ? '#bbbbbb' : '#6b7280'; // Beschreibungstext-Farbe für Dark Mode

  // State für das lange Drücken
  const [isLongPressed, setIsLongPressed] = useState(false);

  // Funktion für das lange Drücken
  const handleLongPress = () => {
    setIsLongPressed(true);
  };

  // Funktion, die beim Klicken des roten Kreuzes ausgelöst wird
  const handleIconPress = () => {
    // Gebe den Rezeptnamen zurück
    deleteRecipe(recipe.name)
    setIsLongPressed(false); // Setze den LongPress-Zustand zurück
  };

  return (
    <TouchableOpacity
      style={{
        backgroundColor: backgroundColor,
        borderRadius: 20,
        margin: 8,
        shadowColor: colorScheme === 'dark' ? '#444' : '#ccc', // Unterschiedliche Schattenfarben für Dark Mode
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
      }}
      onPress={onPress}
    >
      {/* Image */}
      <View style={{ borderRadius: 16, overflow: 'hidden' }}>
        <Image
          source={require("@/assets/images/Platzhalter.png")}
          alt={recipe.name}
          style={{ width: '100%', height: 150 }} // Bild bleibt unverändert
        />
      </View>

      <View style={{ padding: 16 }}>
        {/* Title */}
        <Text style={{ fontSize: 18, fontWeight: '600', color: textColor }}>
          {recipe.name || "Unnamed Recipe"}
        </Text>

        {/* Description */}
        <Text style={{ color: descriptionColor, marginTop: 8, fontSize: 12 }} numberOfLines={2}>
          {recipe.description || "No description available."}
        </Text>

        {/* Wenn lange gedrückt wurde, zeige das rote Kreuz */}
        {isLongPressed && (
          <TouchableOpacity
             onPress={() => onLongPress(recipe.name)} // Beim Klicken des Kreuzes den Namen ausgeben
             style={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: '#ffffff',
              borderRadius: 25,
              padding: 6,
              borderWidth: 2,
              borderColor: '#ff0000',
            }}
          >
            <Ionicons name="close" size={20} color="#ff0000" />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default RecipeCard;
