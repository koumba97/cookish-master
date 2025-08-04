import { RootStackParamList } from '@/app/_layout';
import { Colors } from '@/constants/Colors';
import { RecipeResult } from '@/types/Recipe';
import { router, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ImageBackground,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import AppText from './ui/AppText';

interface Prop {
    results: RecipeResult[];
}

export default function SearchResults({ results }: Prop) {
    const navigation = useNavigation<RootStackParamList>();
    const [searchResults, setSearchResults] = useState<
        RecipeResult[] | undefined
    >(undefined);

    useEffect(() => {
        setSearchResults(results);
    }, [results]);

    const handleRedirectRecipe = (recipeId: string) => {
        router.push(`/recipe/${recipeId}`);
    };

    return (
        <View style={styles.resultContainer}>
            {searchResults ? (
                <ScrollView>
                    {searchResults.map((result) => {
                        return (
                            <TouchableOpacity
                                style={styles.resultItem}
                                key={result.idMeal}
                                onPress={() =>
                                    handleRedirectRecipe(result.idMeal)
                                }
                            >
                                <ImageBackground
                                    source={{ uri: result.strMealThumb }}
                                    style={styles.image}
                                    imageStyle={{ borderRadius: 20 }}
                                ></ImageBackground>
                                <AppText style={styles.name} numberOfLines={1}>
                                    {result.strMeal}
                                </AppText>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    resultContainer: {
        borderTopWidth: 1,
        borderColor: Colors.GREY200,
        top: 0,
        flex: 1,
        paddingBottom: 30,
    },
    topPageContent: {
        backgroundColor: 'white',
        height: 180,
        paddingHorizontal: 20,
        paddingTop: 80,
    },
    resultItem: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: Colors.GREY200,
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    name: {
        fontSize: 20,
        fontWeight: 600,
        flex: 1,
        overflow: 'hidden',
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 20,
    },
});
