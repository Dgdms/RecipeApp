

import { Button, ButtonText } from '@/components/ui/button';
import { Box } from '@/components/ui/box';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View as RNView } from 'react-native';
import { Input, InputField, InputSlot } from '@/components/ui/input';
import { FontAwesome5 } from 'react-native-vector-icons';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import RecipeModal from '@/components/newRecipe/newRecipeModal';
import { loadRecipeButtons, loadRecipes, saveRecipeButtons, saveRecipes,  } from '@/services/recipe-service';
import { router } from 'expo-router';

const NewRecipe = () => {
    const [ingredients, setIngredients] = useState<{ name: string; quantity: string; unit: string }[]>([
        { name: '', quantity: '', unit: '' },
    ]);
    const [recipes, setRecipes] = useState<any[]>([]); // Zustand für gespeicherte Rezepte
    const [recipeButtons, setRecipeButtons] = useState<any[]>([]); // Zustand für Rezept-Buttons
    useEffect(() => {
        const fetchRecipes = async () => {
            const loadedRecipes = await loadRecipes(); 
            if (loadedRecipes) {
                setRecipes(loadedRecipes); // Wenn Rezepte geladen wurden, setze sie
            }
        };
        fetchRecipes();
        
        const fetchRecipeButtons = async () => {
            const loadedRecipeButtons = await loadRecipeButtons();
            if (loadedRecipeButtons) {
                setRecipeButtons(loadedRecipeButtons); // Rezept-Buttons laden
            }
        };
        fetchRecipeButtons();
        
    }, []);


    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const handleAddIngredient = () => {
        setIngredients([...ingredients, { name: '', quantity: '', unit: '' }]);
    };

    const handleIngredientChange = (index: number, field: 'name' | 'quantity' | 'unit', value: string) => {
        const newIngredients = [...ingredients];
        newIngredients[index][field] = value;
        setIngredients(newIngredients);
    };

    const handleRemoveIngredient = (index: number) => {
        const newIngredients = ingredients.filter((_, i) => i !== index);
        setIngredients(newIngredients);
    };

    const handleClearAllIngredients = () => {
        setIngredients([{ name: '', quantity: '', unit: '' }]);
    };

    const isValid = (ingredient: { name: string; quantity: string; unit: string }) => {
        return ingredient.name.trim() !== '' && ingredient.quantity.trim() !== '' && ingredient.unit.trim() !== '';
    };

        const handleSaveRecipe = async (recipeName: string, recipeDescription: string) => {
            const newRecipe = {
                name: recipeName,
                description: recipeDescription,
                ingredients: ingredients.map((ingredient) => ({
                    name: ingredient.name,
                    amount: parseFloat(ingredient.quantity) || null, // Umwandlung in eine Zahl oder null
                    unit: ingredient.unit,
                })),
            };
    
            // Neues Rezept zum bestehenden Rezept-Array hinzufügen
            const updatedRecipes = [...recipes, newRecipe];
    
            // Rezepte speichern
            await saveRecipes(updatedRecipes);
            setRecipes(updatedRecipes); 

            const newRecipeButton = {
            name: recipeName,
            description: recipeDescription,
        };

        await saveRecipeButtons([...recipeButtons, newRecipeButton]);
        setIngredients([{ name: '', quantity: '', unit: '' }]);          
            router.push({
              pathname: '/tabs/(tabs)/overview',
            });
    }

    return (
        <Box style={{ flex: 1, padding: 16, justifyContent: 'space-between' }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                {ingredients.map((ingredient, index) => (
                    <VStack key={index} style={{ marginBottom: 16 }}>
                        <HStack style={{ justifyContent: "space-between" }}>
                            {/* Input für Zutat */}
                            <Input style={{ flex: 1, marginRight: 8, }} size='xl'>
                                <InputSlot>
                                    <InputField
                                        placeholder="Zutat"
                                        value={ingredient.name}
                                        onChangeText={(value) => handleIngredientChange(index, 'name', value)}
                                    />
                                </InputSlot>
                            </Input>

                            {/* Input für Menge */}
                            <Input style={{ flex: 1, marginRight: 8 }} size='xl'>
                                <InputSlot>
                                    <InputField
                                        placeholder="Menge"
                                        value={ingredient.quantity}
                                        keyboardType="numeric"
                                        onChangeText={(value) => handleIngredientChange(index, 'quantity', value)}
                                    />
                                </InputSlot>
                            </Input>

                            {/* Input für Einheit */}
                            <Input style={{ flex: 1 }} size='xl'>
                                <InputSlot>
                                    <InputField
                                        placeholder="Einheit"
                                        value={ingredient.unit}
                                        onChangeText={(value) => handleIngredientChange(index, 'unit', value)}
                                    />
                                </InputSlot>
                            </Input>

                            {/* Minus Button zum Löschen */}
                            {(ingredient.name && ingredient.quantity && ingredient.unit) && ingredients.length > 1 ? (
                                <Pressable 
                                    onPress={() => handleRemoveIngredient(index)} 
                                    style={{ justifyContent: 'center', alignItems: 'center', marginLeft: 10 }}>
                                    <FontAwesome5 name="minus" size={15} color="red" />
                                </Pressable>
                            ) : null}
                        </HStack>

                        {/* Add Ingredient Button */}
                        {index === ingredients.length - 1 && (
                            <Pressable 
                                onPress={handleAddIngredient} 
                                disabled={!isValid(ingredient)} 
                                style={{ alignSelf: "flex-start", marginTop: 8 }}>
                                <FontAwesome5 
                                    name="plus-circle" 
                                    size={35} 
                                    color={isValid(ingredient) ? "blue" : "lightgray"} 
                                />
                            </Pressable>
                        )}
                    </VStack>
                ))}
            </ScrollView>

            {/* Buttons for Save and Clear All */}
            <RNView style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>

                <Pressable onPress={handleClearAllIngredients}>
                    <Text style = {{fontSize: 15, color: "blue", marginTop: 10}}>
                        Alles löschen
                    </Text>
                </Pressable>
                <Button onPress={() => {setIsModalVisible(true)}} action="primary" size="lg">
                    <ButtonText>
                        Rezept speichern
                    </ButtonText>
                </Button>
            </RNView>
            <RecipeModal 
                isVisible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                onSave={(recipeName, recipeDescription) => handleSaveRecipe(recipeName, recipeDescription)} 
            />
        </Box>
    );
};

export default NewRecipe;

