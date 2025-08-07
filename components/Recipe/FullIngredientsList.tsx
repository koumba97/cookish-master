import AppText from '@/components/ui/AppText';
import { screenWidth } from '@/constants/Dimensions';
import { getIngredientImage } from '@/hooks/useIngredientImage';
import { ingredient } from '@/types/Recipe';
import { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

interface Prop {
    ingredients: ingredient[];
}
export default function FullIngredientsList({ ingredients }: Prop) {
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
        <View style={styles.ingredientsContainer}>
            {ingredients.map((ingredient, index) => (
                <View style={styles.ingredientContainer} key={index}>
                    <ImageBackground
                        source={{
                            uri: ingredientImages[index],
                        }}
                        style={styles.ingredientImg}
                        imageStyle={{ borderRadius: 20 }}
                    />
                    <View style={styles.ingredientTextsWrapper}>
                        <AppText style={styles.ingredientText}>
                            {ingredient.name}
                        </AppText>
                        <AppText style={styles.measureText}>
                            {ingredient.measure}
                        </AppText>
                    </View>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    recipeImg: {
        width: screenWidth - 20 * 2,
        height: 300,
        marginBottom: 20,
    },
    ingredientsContainer: {
        gap: 10,
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
});
