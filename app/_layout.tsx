import { useFonts } from 'expo-font';
import { Stack, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import 'react-native-reanimated';

export type RootStackParamList = {
    Home: undefined;
    Recipe: { recipeId: number };
};

export default function RootLayout() {
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
        Nunito: require('../assets/fonts/Nunito-Regular.ttf'),
    });
    const navigation = useNavigation();

    useEffect(() => {
        const parent = navigation.getParent();
        parent?.setOptions({ tabBarStyle: { display: 'none' } });

        return () => {
            parent?.setOptions({ tabBarStyle: undefined });
        };
    }, []);

    if (!loaded) {
        return null;
    }

    return <Stack screenOptions={{ headerShown: false }} />;
}
