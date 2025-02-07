import { loadRecipes } from '@/services/recipe-service';
export const calculateIngredientsForRecipe = async (recipeName: string, numberOfPeople: number) => {
  const recipes = await loadRecipes();  // Lade die gespeicherten Rezepte

  const recipe = recipes.find(r => r.name === recipeName);  // Finde das Rezept

  if (!recipe) {
    console.log(`Rezept ${recipeName} nicht gefunden`);
    return [];
  }

  const factor = numberOfPeople;

  const updatedIngredients = recipe.ingredients.map(ingredient => ({
    ...ingredient,
    amount:
      ingredient.name === 'Eier'
        ? Math.round(ingredient.amount * factor)
        : Math.round(ingredient.amount * factor * 10) / 10,
  }));

   const result = { ...recipe,
    ingredients: updatedIngredients,
  };
  return result
};

export default calculateIngredientsForRecipe;
