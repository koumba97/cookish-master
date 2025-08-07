import IngredientsPreview from '@/components/Recipe/IngredientsPreview';
import AppText from '@/components/ui/AppText';
import { useRecipeContext } from '@/contexts/RecipeContext';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function RecipeInstructionsScreen() {
    const { recipeId } = useLocalSearchParams<{ recipeId: string }>();

    const { recipe } = useRecipeContext();

    return (
        <View style={styles.recipeContainer}>
            <AppText style={styles.recipeName}>{recipe.name}</AppText>
            <View style={styles.ingredientsContainer}>
                {recipe.ingredients ? (
                    <IngredientsPreview
                        ingredients={recipe.ingredients}
                        recipeId={recipeId}
                    />
                ) : null}
            </View>

            <View style={styles.addToCalendarContainer}></View>

            <AppText style={styles.instructions}>{recipe.instructions}</AppText>
        </View>
    );
}

const styles = StyleSheet.create({
    recipeName: {
        fontSize: 28,
        fontWeight: 700,
        marginBottom: 20,
    },
    recipeContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        minHeight: 500,
    },
    instructions: {
        fontSize: 16,
    },

    ingredientsContainer: {
        gap: 5,
    },
    ingredientContainer: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
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
    ingredientTextsWrapper: {
        //gap: 10,
    },
    ingredientText: {
        fontSize: 20,
    },
    measureText: {
        fontSize: 14,
    },

    addToCalendarContainer: {
        height: 100,
        backgroundColor: 'lightblue',
        borderRadius: 20,
        marginBottom: 20,
    },
});
