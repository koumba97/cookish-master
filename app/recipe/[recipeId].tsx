import IngredientsPreview from '@/components/Recipe/IngredientsPreview';
import AppText from '@/components/ui/AppText';
import BackButton from '@/components/ui/BackButton';
import LikeButton from '@/components/ui/LikeButton';
import { screenWidth } from '@/constants/Dimensions';
import { useRecipeIngredients } from '@/hooks/useRecipeIngredients';
import { Recipe } from '@/types/Recipe';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

export default function RecipeScreen() {
    const { recipeId } = useLocalSearchParams<{ recipeId: string }>();
    const [loading, setLoading] = useState(false);
    const [recipe, setRecipe] = useState<Recipe>({});

    useEffect(() => {
        fetchRecipe(recipeId);
    }, [recipeId]);

    const fetchRecipe = async (recipeId: string) => {
        try {
            setLoading(true);
            const res = await axios.get(
                `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
            );
            const formatRecipe = useRecipeIngredients(res.data.meals[0]);
            setRecipe(formatRecipe);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    return (
        <View>
            <ImageBackground
                source={{ uri: recipe.image }}
                style={styles.recipeImg}
            >
                <View style={styles.buttonsWrapper}>
                    <BackButton />
                    <LikeButton isLiked={false} />
                </View>
            </ImageBackground>

            <View style={styles.recipeContainer}>
                <AppText style={styles.recipeName}>{recipe.name}</AppText>
                <View style={styles.ingredientsContainer}>
                    {recipe.ingredients ? (
                        <IngredientsPreview ingredients={recipe.ingredients} />
                    ) : null}
                </View>

                <AppText style={styles.instructions}>
                    {recipe.instructions}
                </AppText>
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
    recipeContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },
    instructions: {
        fontSize: 16,
    },
    recipeImg: {
        width: screenWidth,
        height: 400,
        marginBottom: -40,
        paddingTop: 50,
        paddingHorizontal: 20,
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
    buttonsWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
