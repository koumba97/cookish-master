import { RecipeResult } from '@/types/Recipe';
import { PropsWithChildren, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import AvatarSearchBarSection from './Home/AvatarSearchBarSection';
import SearchResults from './SearchResults';

export default function PageView({ children }: PropsWithChildren) {
    const [searchResults, setSearchResults] = useState<
        RecipeResult[] | undefined
    >(undefined);
    const [searchQuery, setSearchQuery] = useState<string | undefined>(
        undefined
    );
    const handleSearchResults = (
        results: RecipeResult[],
        query: string | undefined
    ) => {
        setSearchResults(results);
        setSearchQuery(query);
    };
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView
                style={[
                    styles.topPageContent,
                    searchQuery && { maxHeight: 140 },
                ]}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
            >
                <AvatarSearchBarSection searchResults={handleSearchResults} />
            </ScrollView>
            {searchResults && searchQuery ? (
                <SearchResults results={searchResults} />
            ) : (
                <ScrollView
                    style={styles.pageViewContent}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.tabView}>{children}</View>
                </ScrollView>
            )}
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
        height: 180,
        paddingHorizontal: 20,
        paddingTop: 80,
    },
    pageViewContent: {},
});
