import { useFonts } from 'expo-font';
import { Stack, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import 'react-native-reanimated';

export default function RootLayout() {
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
        Nunito: require('../assets/fonts/Nunito-Regular.ttf'),
    });
    const navigation = useNavigation();

    useEffect(() => {
        const parent = navigation.getParent(); // c'est le Tab.Navigator parent
        parent?.setOptions({ tabBarStyle: { display: 'none' } }); // cache la tab bar

        return () => {
            parent?.setOptions({ tabBarStyle: undefined }); // remet la tab bar quand tu pars
        };
    }, []);

    if (!loaded) {
        // Async font loading only occurs in development.
        return null;
    }

    return (
        <>
            <Stack
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="(tabs)" options={{}} />
                <Stack.Screen name="+not-found" options={{}} />
            </Stack>
        </>
    );
}
