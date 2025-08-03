import PageView from '@/components/PageView';
import { Recipe } from '@/types/Recipe';
import { StyleSheet } from 'react-native';
import { EventProvider } from 'react-native-outside-press';
import 'react-native-reanimated';

interface Prop {
    recipe: Recipe;
}
export default function RecipeScreen({ recipe }: Prop) {
    return (
        <EventProvider>
            <PageView></PageView>
        </EventProvider>
    );
}

const styles = StyleSheet.create({});
