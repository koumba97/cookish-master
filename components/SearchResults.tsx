import { Colors } from '@/constants/Colors';
import { Recipe } from '@/types/recipe';
import { useEffect, useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, View } from 'react-native';
import AppText from './ui/AppText';

interface Prop {
    results: Recipe[];
}
export default function SearchResults({ results }: Prop) {
    const [searchResults, setSearchResults] = useState<Recipe[] | undefined>(
        undefined
    );

    useEffect(() => {
        setSearchResults(results);
    }, [results]);
    return (
        <View style={styles.resultContainer}>
            {searchResults ? (
                <ScrollView>
                    {searchResults.map((result) => {
                        return (
                            <View style={styles.resultItem}>
                                <ImageBackground
                                    source={{ uri: result.strMealThumb }}
                                    style={styles.image}
                                    imageStyle={{ borderRadius: 20 }}
                                ></ImageBackground>
                                <AppText style={styles.name} numberOfLines={1}>
                                    {result.strMeal}
                                </AppText>
                            </View>
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
