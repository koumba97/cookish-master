import AppText from '@/components/ui/AppText';
import { categoryTitle, indexRecipes } from '@/constants/Category';
import { Colors } from '@/constants/Colors';
import { SCREEN_PADDING, screenWidth } from '@/constants/Dimensions';
import { Category } from '@/types/Category';
import { StyleSheet, View } from 'react-native';
import RecipeCard from './RecipeCard';

interface Prop {
    currentCategory: Category;
}
export default function RecipeSuggestions({ currentCategory }: Prop) {
    const GRID_GAP = 10;
    return (
        <View>
            <AppText style={styles.pageTitle}>
                {categoryTitle[currentCategory]}
            </AppText>
            <View style={styles.grid}>
                {indexRecipes[currentCategory].map((recipeId) => {
                    return <RecipeCard recipeId={recipeId} key={recipeId} />;
                })}
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
