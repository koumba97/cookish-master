import { Recipe } from '@/types/Recipe';
import { createContext, useContext } from 'react';

type RecipeContextType = {
    recipe: Recipe;
    isLiked: boolean;
    selectedIngredients?: string[];
    setSelectedIngredients: React.Dispatch<React.SetStateAction<string[]>>;
};

export const RecipeContext = createContext<RecipeContextType | null>(null);

export const useRecipeContext = () => {
    const ctx = useContext(RecipeContext);
    if (!ctx)
        throw new Error('useRecipeContext must be used within RecipeProvider');
    return ctx;
};
