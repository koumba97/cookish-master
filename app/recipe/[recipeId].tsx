import PageView from '@/components/PageView';
import AppText from '@/components/ui/AppText';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';
import { EventProvider } from 'react-native-outside-press';

export default function RecipeScreen() {
    const { recipeId } = useLocalSearchParams<{ recipeId: string }>();

    return (
        <EventProvider>
            <PageView>
                <AppText>{recipeId}</AppText>
            </PageView>
        </EventProvider>
    );
}

const styles = StyleSheet.create({});
