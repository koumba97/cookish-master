import AppText from '@/components/ui/AppText';
import { Colors } from '@/constants/Colors';
import { screenWidth } from '@/constants/Dimensions';
import { useIngredientImage } from '@/hooks/useIngredientImage';
import { ingredient } from '@/types/Recipe';
import { useEffect, useState } from 'react';
import {
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';

interface Prop {
    ingredients: ingredient[];
}
export default function IngredientsPreview({ ingredients }: Prop) {
    const [visibleIngredients, setVisibleIngredients] = useState<ingredient[]>(
        []
    );
    useEffect(() => {
        if (ingredients.length >= 4) {
            setVisibleIngredients(ingredients.slice(0, 4));
        } else {
            setVisibleIngredients(ingredients);
        }
    }, [ingredients]);
    return (
        <View style={styles.ingredientsPreviewContainer}>
            <AppText style={styles.ingredientsSectionText}>Ingredients</AppText>
            <View style={styles.ingredientsContainer}>
                {visibleIngredients.map((ingredient, index) => (
                    <View style={styles.ingredientContainer}>
                        <ImageBackground
                            source={{
                                uri: useIngredientImage(ingredient.name),
                            }}
                            style={styles.ingredientImg}
                            imageStyle={{ borderRadius: 50 }}
                        />
                    </View>
                ))}

                {ingredients.length >= 5 ? (
                    <TouchableOpacity style={styles.hiddenIngredientsContainer}>
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
    ingredientsSectionText: {
        fontSize: 20,
    },
    recipeImg: {
        width: screenWidth - 20 * 2,
        height: 300,
        marginBottom: 20,
    },
    ingredientsContainer: {
        gap: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    ingredientContainer: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        width: 60,
        height: 60,
        backgroundColor: 'white',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 1,
        verticalAlign: 'middle',
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
    ingredientImg: {
        width: 50,
        height: 50,
        margin: 'auto',
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
