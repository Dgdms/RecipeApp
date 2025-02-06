import recipes from "../data/recpies";

export const calculateIngredientsForRecipe = (recipeName: string, numberOfPeople: number) => {
  const recipe = recipes.find(r => r.name === recipeName);
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

  return {
    ...recipe,
    ingredients: updatedIngredients,
  };
};
export default calculateIngredientsForRecipe