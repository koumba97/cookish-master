import AsyncStorage from '@react-native-async-storage/async-storage';

export async function recipeIsLiked(recipeId: string) {
    const favoriteRecipes = await AsyncStorage.getItem('favorite-recipes');
    if (favoriteRecipes) {
        const favRecipesArray = favoriteRecipes.split(',');
        if (favRecipesArray.includes(recipeId)) {
            return true;
        }
        return false;
    }
    return false;
}

export async function toggleLikeRecipe(recipeId: string) {
    const favoriteRecipes = await AsyncStorage.getItem('favorite-recipes');

    console.log(favoriteRecipes);
    if (favoriteRecipes) {
        const favRecipesArray = favoriteRecipes.split(',');

        if (favRecipesArray.includes(recipeId)) {
            const newArray = favRecipesArray.filter(
                (recipe) => recipe !== recipeId
            );
            await AsyncStorage.setItem(
                'favorite-recipes',
                `${newArray.join(',')}`
            );
            return false;
        } else {
            favRecipesArray.push(recipeId);
            await AsyncStorage.setItem(
                'favorite-recipes',
                `${favRecipesArray.join(',')}`
            );
            return true;
        }
    } else {
        await AsyncStorage.setItem('favorite-recipes', `${recipeId}`);
        return true;
    }
}
