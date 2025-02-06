import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

type NewRecipeModalProps = {
  visible: boolean;
  onClose: () => void;
  onSave: (ingredients: { name: string; quantity: string; unit: string }[]) => void;
};

const NewRecipeModal: React.FC<NewRecipeModalProps> = ({ visible, onClose, onSave }) => {
  const [ingredients, setIngredients] = useState<{ name: string; quantity: string; unit: string }[]>([
    { name: '', quantity: '', unit: '' },
  ]);

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: '', unit: '' }]);
  };

  const handleIngredientChange = (index: number, field: 'name' | 'quantity' | 'unit', value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  const handleSave = () => {
    onSave(ingredients); // Zutaten speichern
    setIngredients([{ name: '', quantity: '', unit: '' }]); // Eingabefelder zurücksetzen
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Zutaten für das Rezept hinzufügen</Text>
        
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {ingredients.map((ingredient, index) => (
            <View key={index} style={styles.ingredientContainer}>
              <TextInput
                style={styles.input}
                value={ingredient.name}
                onChangeText={(value) => handleIngredientChange(index, 'name', value)}
              />
              <TextInput
                style={styles.input}
                placeholder="Menge"
                value={ingredient.quantity}
                keyboardType="numeric"
                onChangeText={(value) => handleIngredientChange(index, 'quantity', value)}
              />
              <TextInput
                style={styles.input}
                placeholder="Einheit"
                value={ingredient.unit}
                onChangeText={(value) => handleIngredientChange(index, 'unit', value)}
              />
            </View>
          ))}
          
          <TouchableOpacity style={styles.addButton} onPress={handleAddIngredient}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </ScrollView>

        <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.buttonClose} onPress={onClose}>
            <Text style={styles.buttonText}>Abbrechen</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonSave} onPress={handleSave}>
            <Text style={styles.buttonText}>Speichern</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  modalTitle: {
    marginTop: 50,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  scrollContainer: {
    width: '100%',
  },
  ingredientContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  input: {
    width: '30%',
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: 'grey',
    padding: 15,
    borderRadius: 5,
    marginVertical: 15,
    alignSelf: 'flex-end',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonSave: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    width: '48%',
  },
  buttonClose: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    width: '48%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default NewRecipeModal;
