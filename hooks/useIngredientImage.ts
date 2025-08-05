export function useIngredientImage(ingredientName: string): string {
    const formatIngredient = ingredientName.toLowerCase().replace(' ', '-');
    return `https://www.themealdb.com/images/ingredients/${formatIngredient}.png`;
}
