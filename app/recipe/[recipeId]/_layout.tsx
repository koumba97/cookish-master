import CloseSVG from '@/components/svg/Close';
import StarSVG from '@/components/svg/Star';
import AppButton from '@/components/ui/AppButton';
import AppText from '@/components/ui/AppText';
import BackButton from '@/components/ui/BackButton';
import LikeButton from '@/components/ui/LikeButton';
import { screenWidth } from '@/constants/Dimensions';
import { RecipeContext } from '@/contexts/RecipeContext';
import { recipeIsLiked, toggleLikeRecipe } from '@/hooks/useLikeRecipe';
import { useRecipeIngredients } from '@/hooks/useRecipeIngredients';
import { Recipe } from '@/types/Recipe';
import axios from 'axios';
import { router, Slot, useLocalSearchParams, usePathname } from 'expo-router';
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
    const [route, setRoute] = useState<string[]>([]);
    const pathname = usePathname();
    const currentRoute = pathname.split('/').filter((item) => item !== '');

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

    useEffect(() => {
        setRoute(currentRoute);
    }, [pathname]);

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

    const handleCancelIngredientsSelect = () => {
        router.setParams({ action: 'view' });
    };
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

            {route[2] == 'select' ? (
                <ScrollView
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 20,
                        alignSelf: 'flex-end',
                    }}
                >
                    <AppButton
                        color="#F63C3C"
                        textColor="white"
                        onPress={handleCancelIngredientsSelect}
                        icon={
                            <CloseSVG
                                width={25}
                                height={25}
                                viewBox="0 -2 150 150"
                                color="white"
                            />
                        }
                    >
                        Cancel
                    </AppButton>
                </ScrollView>
            ) : null}
        </RecipeContext.Provider>
    );
}

const styles = StyleSheet.create({
    cancelButton: {
        height: 50,
        backgroundColor: '#4D97FF',
        borderRadius: 20,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 20,
    },
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
