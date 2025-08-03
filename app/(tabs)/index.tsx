import CategoryList from '@/components/Home/CategoryList';
import RecipeSuggestions from '@/components/Home/RecipeSuggestions';
import PageView from '@/components/PageView';
import { screenWidth } from '@/constants/Dimensions';
import { Category } from '@/types/category';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { EventProvider } from 'react-native-outside-press';

export default function HomeScreen() {
    const [category, setCategory] = useState<Category>('popular');

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

    const handleCategoryChange = (category: Category) => {
        setCategory(category);
    };

    return (
        <EventProvider>
            <PageView>
                <CategoryList
                    currentCategory={category}
                    list={categories}
                    onCategoryChange={handleCategoryChange}
                />

                <RecipeSuggestions currentCategory={category} />
            </PageView>
        </EventProvider>
    );
}

const styles = StyleSheet.create({
    pageTitle: {
        fontWeight: 700,
        fontSize: 25,
    },
    contentPageView: {
        //paddingTop: 100,
    },
    topContainer: {
        left: 20,
        width: screenWidth - 20 * 2,
        position: 'absolute',
        top: 50,
        zIndex: 2,
    },
    scrollContent: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingTop: 80,
        height: 170,
    },
});
