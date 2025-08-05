import PageView from '@/components/PageView';
import AppText from '@/components/ui/AppText';
import { screenWidth } from '@/constants/Dimensions';
import { useRecipeIngredients } from '@/hooks/useRecipeIngredients';
import { Recipe } from '@/types/Recipe';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { EventProvider } from 'react-native-outside-press';

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
        <EventProvider>
            <PageView>
                <ImageBackground
                    source={{ uri: recipe.image }}
                    style={styles.recipeImg}
                    imageStyle={{ borderRadius: 50 }}
                ></ImageBackground>

                <AppText style={styles.recipeName}>{recipe.name}</AppText>
                <AppText style={styles.instructions}>
                    {recipe.instructions}
                </AppText>
            </PageView>
        </EventProvider>
    );
}

const styles = StyleSheet.create({
    recipeName: {
        fontSize: 28,
        fontWeight: 700,
    },
    instructions: {
        fontSize: 16,
    },
    recipeImg: {
        width: screenWidth - 20 * 2,
        height: 300,
        marginBottom: 20,
    },
});
