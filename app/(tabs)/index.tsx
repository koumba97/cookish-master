import TabView from '@/components/TabView';
import AppText from '@/components/ui/AppText';
import IconButton from '@/components/ui/IconButton';
import SearchBar from '@/components/ui/SearchBar';
import { UserAvatar } from '@/components/UserAvatar';
import {
    SCREEN_PADDING,
    screenWidth,
    SIDES_COUNT,
} from '@/constants/Dimensions';
import { Category } from '@/types/category';
import { useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { EventProvider } from 'react-native-outside-press';

export default function HomeScreen() {
    const USER_AVATAR_WIDTH = 60;
    const AVATAR_SEARCHBAR_GAP = 10;
    const [visibleGreetings, setVisibleGreetings] = useState(true);
    const [category, setCategory] = useState<Category>('popular');
    const scrollRef = useRef<ScrollView>(null);

    const categories: Category[] = [
        'popular',
        'starter',
        'main',
        'dessert',
        'drink',
    ];

    const categoryTitle = {
        popular: 'Most Loved Recipes',
        starter: 'Tasty Starters',
        main: 'Delicious Main Courses',
        dessert: 'Sweet Treats & Desserts',
        drink: 'Refreshing Drinks',
    };

    const scrollToStart = () => {
        scrollRef.current?.scrollTo({ x: 0, animated: true });
    };

    const scrollToEnd = () => {
        scrollRef.current?.scrollToEnd({ animated: true });
    };

    const handleSearchBar = (isOpen: boolean) => {
        setVisibleGreetings(!isOpen);
    };

    const handleCategory = (selectedCategory: Category) => {
        setCategory(selectedCategory);
        if (selectedCategory === 'drink') {
            scrollToEnd();
        }
        if (selectedCategory === 'popular') {
            scrollToStart();
        }
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
                    ref={scrollRef}
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
                <AppText style={styles.pageTitle}>
                    {categoryTitle[category]}
                </AppText>
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
        maxHeight: 140,
        gap: 10,
        overflowX: 'scroll',
    },
    pageTitle: {
        fontWeight: 700,
        fontSize: 25,
    },
});
