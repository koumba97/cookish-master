import { Colors } from '@/constants/Colors';
import { screenWidth } from '@/constants/Dimensions';
import { getIngredientImage } from '@/hooks/useIngredientImage';
import { ingredient } from '@/types/Recipe';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import ChevronRightSVG from '../svg/ChevronRight';
import AppText from '../ui/AppText';

interface Prop {
    ingredients: ingredient[];
    recipeId: string;
}
export default function IngredientsPreview({ ingredients, recipeId }: Prop) {
    const [ingredientImages, setIngredientImages] = useState<string[]>([]);

    useEffect(() => {
        const fetchImages = async () => {
            const urls = await Promise.all(
                ingredients.map((ingredient) =>
                    getIngredientImage(ingredient.name)
                )
            );
            setIngredientImages(urls);
        };

        fetchImages();
    }, [ingredients]);

    return (
        <View style={styles.ingredientsPreviewContainer}>
            <TouchableOpacity
                style={styles.ingredientsTitleWrapper}
                onPress={() =>
                    router.push(`/recipe/${recipeId}/view/ingredients`)
                }
            >
                <AppText style={styles.ingredientsSectionText}>
                    Ingredients
                </AppText>
                <View>
                    <ChevronRightSVG
                        width={20}
                        height={24}
                        viewBox="-2 0 10 10"
                    />
                </View>
            </TouchableOpacity>
            <View style={styles.ingredientsContainer}>
                {ingredients.slice(0, 4).map((ingredient, index) => (
                    <View style={styles.ingredientContainer} key={index}>
                        <ImageBackground
                            source={{
                                uri: ingredientImages[index],
                            }}
                            style={styles.ingredientImg}
                            imageStyle={{ borderRadius: 20 }}
                        />
                        <View style={styles.ingredientTextsWrapper}>
                            <AppText
                                style={styles.ingredientText}
                                numberOfLines={1}
                            >
                                {ingredient.name}
                            </AppText>
                        </View>
                    </View>
                ))}
                {ingredients.length >= 5 ? (
                    <TouchableOpacity
                        style={styles.hiddenIngredientsContainer}
                        onPress={() =>
                            router.push(`/recipe/${recipeId}/view/ingredients`)
                        }
                    >
                        <AppText style={styles.hiddenIngredientsText}>
                            +{ingredients.length - 4}
                        </AppText>
                    </TouchableOpacity>
                ) : null}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    ingredientsPreviewContainer: {
        marginBottom: 30,
    },
    recipeImg: {
        width: screenWidth - 20 * 2,
        height: 300,
        marginBottom: 20,
    },
    ingredientsTitleWrapper: {
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    ingredientsSectionText: {
        fontSize: 22,
        marginBottom: 10,
    },
    ingredientsContainer: {
        gap: 10,
        flexDirection: 'row',
    },
    ingredientContainer: {
        flexDirection: 'column',
        gap: 10,
        alignItems: 'center',
    },
    ingredientImg: {
        width: 65,
        height: 65,
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
        fontSize: 12,
        textAlign: 'center',
        maxWidth: 65,
    },
    measureText: {
        fontSize: 10,
    },
    hiddenIngredientsContainer: {
        backgroundColor: Colors.GREY300,
        width: 60,
        height: 60,
        shadowColor: '#000',
        borderRadius: 20,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 1,
        verticalAlign: 'middle',
    },
    hiddenIngredientsText: {
        margin: 'auto',
        fontSize: 25,
        fontWeight: 700,
        color: 'white',
    },
});
