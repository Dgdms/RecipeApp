
import { Button } from '@/components/ui/button';
import { useThemeColor } from '@/hooks/useThemeColor';
import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, useColorScheme } from 'react-native';

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
        onSave(ingredients);
        setIngredients([{ name: '', quantity: '', unit: '' }]);
    };
    const { isDark } = useColorScheme();

    return (

        <View >
            <Text>Zutaten für das Rezept hinzufügen</Text>

            <ScrollView>
                {ingredients.map((ingredient, index) => (
                    <View key={index}>
                        <TextInput
                            placeholder="Zutat"

                            value={ingredient.name}
                            onChangeText={(value) => handleIngredientChange(index, 'name', value)}
                        />
                        <TextInput
                            placeholder="Menge"
                            value={ingredient.quantity}
                            keyboardType="numeric"
                            onChangeText={(value) => handleIngredientChange(index, 'quantity', value)}
                        />
                        <TextInput
                            placeholder="Einheit"
                            value={ingredient.unit}
                            onChangeText={(value) => handleIngredientChange(index, 'unit', value)}
                        />
                        <TouchableOpacity onPress={handleAddIngredient}>
                            <Text>+</Text>
                        </TouchableOpacity>
                    </View>

                ))}

            </ScrollView>
            <Button
            />
        </View>
    );
};

const styles = StyleSheet.create({

});

export default NewRecipeModal;
