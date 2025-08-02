import { Colors } from '@/constants/Colors';
import { Category } from '@/types/category';
import { PropsWithChildren } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import CakeSVG from '../svg/Cake';
import DrinkSVG from '../svg/Drink';
import PizzaSVG from '../svg/Pizza';
import PopularSVG from '../svg/Popular';
import SaladSVG from '../svg/Salad';
interface Prop {
    category: Category;
    active?: boolean;
    onPress?: (category: Category) => void;
}

export default function IconButton({
    category,
    active = false,
    onPress,
}: PropsWithChildren & Prop) {
    const handlePress = () => {
        if (onPress) {
            onPress(category);
        }
    };
    return (
        <TouchableOpacity
            style={[styles.iconButton, active && styles.active]}
            onPress={handlePress}
        >
            <View style={styles.icon}>
                {category === 'popular' ? (
                    <PopularSVG
                        width={40}
                        height={40}
                        viewBox="-1.5 0 15 15"
                        color={active ? 'white' : undefined}
                    />
                ) : category === 'main' ? (
                    <PizzaSVG
                        width={40}
                        height={40}
                        viewBox="-1.5 -1 20 20"
                        color={active ? 'white' : undefined}
                    />
                ) : category === 'starter' ? (
                    <SaladSVG
                        width={40}
                        height={40}
                        viewBox="0 0 16 16"
                        color={active ? 'white' : undefined}
                    />
                ) : category === 'dessert' ? (
                    <CakeSVG
                        width={40}
                        height={40}
                        viewBox="0 0 16 16"
                        color={active ? 'white' : undefined}
                    />
                ) : category === 'drink' ? (
                    <DrinkSVG
                        width={40}
                        height={40}
                        viewBox="-1.8 0.5 16 16"
                        color={active ? 'white' : undefined}
                    />
                ) : null}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    iconButton: {
        height: 70,
        width: 70,
        backgroundColor: Colors.GREY100,
        borderRadius: 20,
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    active: {
        backgroundColor: Colors.BRAND,
    },
    icon: {},
});
