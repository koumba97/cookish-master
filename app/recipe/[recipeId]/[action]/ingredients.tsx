import FullIngredientsList from '@/components/Recipe/FullIngredientsList';
import AppText from '@/components/ui/AppText';
import { useRecipeContext } from '@/contexts/RecipeContext';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function RecipeIngredientsScreen() {
    const { recipe } = useRecipeContext();
    const { recipeId, action } = useLocalSearchParams<{
        recipeId: string;
        action: 'view' | 'select';
    }>();

    return (
        <View style={styles.recipeContainer}>
            <AppText style={styles.recipeName}>{recipe.name}</AppText>
            <AppText style={styles.ingredientTitle}>Ingredients</AppText>

            <View style={styles.ingredientsContainer}>
                {recipe.ingredients ? (
                    <FullIngredientsList
                        ingredients={recipe.ingredients}
                        selectable={action === 'select' ? true : false}
                    />
                ) : null}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    recipeName: {
        fontSize: 28,
        fontWeight: 700,
        marginBottom: 20,
    },
    ingredientTitle: {
        fontSize: 22,
        marginBottom: 14,
    },
    recipeContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        minHeight: 500,
        flex: 1,
    },

    ingredientsContainer: {
        gap: 5,
    },

    ingredientImg: {
        width: 70,
        height: 70,
        backgroundColor: 'white',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 1,
    },

    measureText: {
        fontSize: 14,
    },
});
