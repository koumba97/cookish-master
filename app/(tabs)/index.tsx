import TabView from '@/components/TabView';
import IconButton from '@/components/ui/IconButton';
import { SearchBar } from '@/components/ui/SearchBar';
import { UserAvatar } from '@/components/UserAvatar';
import {
    SCREEN_PADDING,
    screenWidth,
    SIDES_COUNT,
} from '@/constants/Dimensions';
import { Category } from '@/types/category';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { EventProvider } from 'react-native-outside-press';

export default function HomeScreen() {
    const USER_AVATAR_WIDTH = 60;
    const AVATAR_SEARCHBAR_GAP = 10;
    const [visibleGreetings, setVisibleGreetings] = useState(true);
    const [category, setCategory] = useState<Category>('popular');
    const categories: Category[] = [
        'popular',
        'starter',
        'main',
        'dessert',
        'drink',
    ];

    const handleSearchBar = (isOpen: boolean) => {
        setVisibleGreetings(!isOpen);
    };

    const handleCategory = (selectedCategory: Category) => {
        setCategory(selectedCategory);
    };
    return (
        <EventProvider>
            <TabView>
                <View style={styles.avatarSearchBarWrapper}>
                    <UserAvatar showGreetings={visibleGreetings} />
                    <SearchBar
                        openWidth={
                            screenWidth -
                            SCREEN_PADDING * SIDES_COUNT -
                            (USER_AVATAR_WIDTH + AVATAR_SEARCHBAR_GAP)
                        }
                        handleOpen={handleSearchBar}
                    />
                </View>
                <ScrollView
                    style={styles.categoryList}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    {categories.map((cat) => (
                        <IconButton
                            key={cat}
                            category={cat}
                            active={category === cat}
                            onPress={handleCategory}
                        />
                    ))}
                </ScrollView>
            </TabView>
        </EventProvider>
    );
}

const styles = StyleSheet.create({
    avatarSearchBarWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    categoryList: {
        paddingVertical: 30,
        marginHorizontal: -20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        gap: 10,
        overflowX: 'scroll',
        flex: 1,
    },
});
