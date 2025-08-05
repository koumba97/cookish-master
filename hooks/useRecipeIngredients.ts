import { ingredient, Recipe } from '@/types/Recipe';

export function useRecipeIngredients(recipe: any): Recipe {
    const ingredients: ingredient[] = [];

    for (let i = 1; i <= 20; i++) {
        const ingredient: string = recipe[`strIngredient${i}`]?.trim();
        const measure: string | null = recipe[`strMeasure${i}`]?.trim();

        if (ingredient) {
            ingredients.push({
                ingredient,
                measure: measure || '',
            });
        }
    }

    return {
        idMeal: recipe.idMeal,
        name: recipe.strMeal,
        tags: recipe.strTags,
        mealAlternate: recipe.strMealAlternate,
        category: recipe.strCategory,
        area: recipe.strArea,
        instructions: recipe.strInstructions,
        image: recipe.strMealThumb,
        youtubeLink: recipe.strYoutube,
        ingredients,
    };
}
