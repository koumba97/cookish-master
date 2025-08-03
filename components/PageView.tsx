import { Recipe } from '@/types/recipe';
import { PropsWithChildren, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import AvatarSearchBarSection from './Home/AvatarSearchBarSection';

export default function PageView({ children }: PropsWithChildren) {
    const [searchResults, setSearchResults] = useState<Recipe[] | undefined>(
        undefined
    );
    const [searchQuery, setSearchQuery] = useState<string | undefined>(
        undefined
    );
    const handleSearchResults = (
        results: Recipe[],
        query: string | undefined
    ) => {
        setSearchResults(results);
        setSearchQuery(query);
    };
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView
                style={styles.topPageContent}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
            >
                <AvatarSearchBarSection searchResults={handleSearchResults} />
            </ScrollView>
            <ScrollView
                style={styles.pageViewContent}
                showsVerticalScrollIndicator={false}
            >
                {searchResults && searchQuery ? (
                    <View>
                        {searchResults.map((result) => {
                            return <Text>{result.strMeal}</Text>;
                        })}
                    </View>
                ) : (
                    <View style={styles.tabView}>{children}</View>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    tabView: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        fontFamily: 'Nunito',
        paddingBottom: 30,
    },
    topPageContent: {
        backgroundColor: 'white',
        height: 180,
        paddingHorizontal: 20,
        paddingTop: 80,
    },
    pageViewContent: {},
});
