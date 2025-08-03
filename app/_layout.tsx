import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { useNavigation } from 'expo-router';
import { useEffect } from 'react';
import 'react-native-reanimated';
import HomeScreen from './screens/index';

export default function RootLayout() {
    const Stack = createNativeStackNavigator();
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

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}
