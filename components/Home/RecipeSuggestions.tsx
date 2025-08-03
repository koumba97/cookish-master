import AppText from '@/components/ui/AppText';
import { Colors } from '@/constants/Colors';
import { SCREEN_PADDING, screenWidth } from '@/constants/Dimensions';
import { Category } from '@/types/Category';
import { StyleSheet, View } from 'react-native';

interface Prop {
    currentCategory: Category;
}
export default function RecipeSuggestions({ currentCategory }: Prop) {
    const GRID_GAP = 10;

    const categoryTitle = {
        popular: 'Most Loved Recipes',
        starter: 'Tasty Starters',
        main: 'Delicious Main Courses',
        dessert: 'Sweet Treats & Desserts',
        drink: 'Refreshing Drinks',
    };

    return (
        <View>
            <AppText style={styles.pageTitle}>
                {categoryTitle[currentCategory]}
            </AppText>
            <View style={styles.grid}>
                <View style={styles.recipeContainer}></View>
                <View style={styles.recipeContainer}></View>
                <View style={styles.recipeContainer}></View>
                <View style={styles.recipeContainer}></View>
                <View style={styles.recipeContainer}></View>
                <View style={styles.recipeContainer}></View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    pageTitle: {
        fontWeight: 700,
        fontSize: 25,
        marginBottom: 10,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 20,
    },
    recipeContainer: {
        height: 200,
        width: (screenWidth - SCREEN_PADDING * 2 - 20) / 2,
        borderRadius: 20,
        backgroundColor: Colors.GREY100,
    },
});
