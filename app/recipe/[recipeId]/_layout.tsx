import StarSVG from '@/components/svg/Star';
import AppText from '@/components/ui/AppText';
import BackButton from '@/components/ui/BackButton';
import LikeButton from '@/components/ui/LikeButton';
import { screenWidth } from '@/constants/Dimensions';
import { RecipeContext } from '@/contexts/RecipeContext';
import { recipeIsLiked, toggleLikeRecipe } from '@/hooks/useLikeRecipe';
import { useRecipeIngredients } from '@/hooks/useRecipeIngredients';
import { Recipe } from '@/types/Recipe';
import axios from 'axios';
import { Slot, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import 'react-native-reanimated';

export type RootStackParamList = {
    Home: undefined;
    Recipe: { recipeId: number };
};

export default function RecipeLayout() {
    const { recipeId } = useLocalSearchParams<{ recipeId: string }>();
    const [loadingRecipe, setLoadingRecipe] = useState(false);
    const [loadingLike, setLoadingLike] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [recipe, setRecipe] = useState<Recipe>({} as Recipe);

    useEffect(() => {
        const initialize = async () => {
            setLoadingLike(true);
            await fetchRecipe(recipeId);
            const liked = await recipeIsLiked(recipeId);
            setIsLiked(liked);
            setLoadingLike(false);
        };
        initialize();
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

    async function toggleLike() {
        const like = await toggleLikeRecipe(recipeId);
        setIsLiked(like);
    }
    if (loadingLike || loadingRecipe) {
        return <Text>loading</Text>;
    }
    return (
        <RecipeContext.Provider value={{ recipe, isLiked }}>
            <ScrollView>
                <ImageBackground
                    source={{ uri: recipe.image }}
                    style={styles.recipeImg}
                >
                    <View style={styles.buttonsWrapper}>
                        <BackButton />
                        <LikeButton isLiked={isLiked} handleLike={toggleLike} />
                    </View>
                    <View style={styles.tagsWrapper}>
                        <View style={styles.rateTag}>
                            <StarSVG
                                width={20}
                                height={20}
                                viewBox="0 0 22 22"
                                color="#FFD42A"
                            />
                            <AppText style={styles.textRateTag}>4.5</AppText>
                        </View>
                    </View>
                </ImageBackground>
                <Slot />
            </ScrollView>
        </RecipeContext.Provider>
    );
}

const styles = StyleSheet.create({
    recipeImg: {
        width: screenWidth,
        height: 400,
        marginBottom: -40,
        paddingTop: 50,
        paddingHorizontal: 20,
        paddingBottom: 60,
    },

    buttonsWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    tagsWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 'auto',
    },
    rateTag: {
        backgroundColor: 'white',
        padding: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        minWidth: 50,
        flexDirection: 'row',
        gap: 5,
    },
    textRateTag: {
        fontWeight: 700,
        fontSize: 18,
    },
});
