import { Colors } from '@/constants/Colors';
import { SCREEN_PADDING, screenWidth } from '@/constants/Dimensions';
import { useRecipeIngredients } from '@/hooks/useRecipeIngredients';
import { Recipe } from '@/types/Recipe';
import axios from 'axios';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import StarSVG from '../svg/Star';
import AppText from '../ui/AppText';

interface Prop {
    recipeId: string;
}
export default function RecipeCard({ recipeId }: Prop) {
    const [loadingRecipe, setLoadingRecipe] = useState(true);
    const [recipe, setRecipe] = useState<Recipe>();

    useEffect(() => {
        fetchRecipe(recipeId);
    }, [recipeId]);

    const fetchRecipe = async (recipeId: string) => {
        try {
            setLoadingRecipe(true);
            const res = await axios.get(
                `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
            );
            const formatRecipe = useRecipeIngredients(res.data.meals[0]);
            setRecipe(formatRecipe);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingRecipe(false);
        }
    };

    const handleRedirectRecipe = (recipeId: string) => {
        router.push(`/recipe/${recipeId}/instructions`);
    };

    return recipe && !loadingRecipe ? (
        <TouchableOpacity onPress={() => handleRedirectRecipe(recipe.idMeal)}>
            <ImageBackground
                source={{ uri: recipe.image }}
                style={styles.recipeCard}
                imageStyle={{ borderRadius: 20 }}
            >
                <View style={styles.rateTag}>
                    <StarSVG
                        width={20}
                        height={20}
                        viewBox="0 0 22 22"
                        color="#FFD42A"
                    />
                    <AppText style={styles.textRateTag}>4.5</AppText>
                </View>
            </ImageBackground>
            <AppText style={styles.recipeName} numberOfLines={1}>
                {recipe.name}
            </AppText>
        </TouchableOpacity>
    ) : (
        <View>
            <View style={styles.recipeCard}>
                <AppText>Loading</AppText>
            </View>
            <AppText>...</AppText>
        </View>
    );
}

const styles = StyleSheet.create({
    recipeCard: {
        height: 200,
        width: (screenWidth - SCREEN_PADDING * 2 - 20) / 2,
        borderRadius: 20,
        backgroundColor: Colors.GREY100,
        padding: 10,
        marginBottom: 5,
    },
    recipeName: {
        fontSize: 16,
        width: (screenWidth - SCREEN_PADDING * 2 - 20) / 2,
        fontWeight: 700,
    },
    rateTag: {
        backgroundColor: 'white',
        padding: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        width: 60,
        flexDirection: 'row',
        gap: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textRateTag: {
        fontWeight: 700,
        fontSize: 12,
    },
});
