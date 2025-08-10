import AppText from '@/components/ui/AppText';
import { screenWidth } from '@/constants/Dimensions';
import { getIngredientImage } from '@/hooks/useIngredientImage';
import { ingredient } from '@/types/Recipe';
import { useEffect, useState } from 'react';
import {
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import Checkbox from '../ui/CheckBox';

interface Prop {
    ingredients: ingredient[];
    selectable?: boolean;
}
export default function FullIngredientsList({
    ingredients,
    selectable = false,
}: Prop) {
    const [ingredientImages, setIngredientImages] = useState<string[]>([]);
    const [checkedIngredients, setCheckedIngredient] = useState<string[]>([]);

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

    const handleIngredientCheck = (name: string, checked: boolean) => {
        if (checked) {
            if (!checkedIngredients.includes(name)) {
                const ingredientsArray = [...checkedIngredients, name];
                setCheckedIngredient(ingredientsArray);
            }
        } else {
            if (checkedIngredients.includes(name)) {
                const ingredientIndexToRemove = checkedIngredients.findIndex(
                    (item) => item === name
                );
                const newIngredientsArray = [
                    ...checkedIngredients.slice(0, ingredientIndexToRemove),
                    ...checkedIngredients.slice(ingredientIndexToRemove + 1),
                ];

                setCheckedIngredient(newIngredientsArray);
            }
        }
        console.log(checkedIngredients);
    };

    return (
        <View style={styles.ingredientsContainer}>
            {ingredients.map((ingredient, index) => (
                <TouchableOpacity
                    style={[
                        styles.ingredientContainer,
                        checkedIngredients.includes(ingredient.name) &&
                        selectable
                            ? styles.selectedIngredient
                            : !checkedIngredients.includes(ingredient.name) &&
                                selectable
                              ? styles.nonSelectedIngredient
                              : null,
                    ]}
                    key={index}
                    onPress={() =>
                        handleIngredientCheck(
                            ingredient.name,
                            !checkedIngredients.includes(ingredient.name)
                        )
                    }
                >
                    <View style={styles.imgTextWrapper}>
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
                    {selectable ? (
                        <Checkbox
                            checked={checkedIngredients.includes(
                                ingredient.name
                            )}
                            onCheck={handleIngredientCheck}
                            name={ingredient.name}
                        />
                    ) : null}
                </TouchableOpacity>
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
    imgTextWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    ingredientsContainer: {
        gap: 15,
    },
    ingredientContainer: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
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
    selectedIngredient: {
        backgroundColor: '#C4EAF670',
        margin: -5,
        padding: 5,
        borderRadius: 20,
    },
    nonSelectedIngredient: {
        opacity: 0.5,
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
    checkbox: {
        width: 40,
        height: 40,
        borderWidth: 2,
    },
});
