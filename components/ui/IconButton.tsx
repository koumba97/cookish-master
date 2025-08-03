import { Colors } from '@/constants/Colors';
import { Category } from '@/types/Category';
import { PropsWithChildren, useEffect, useRef } from 'react';
import {
    Animated,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
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
    const AnimatedTouchableOpacity =
        Animated.createAnimatedComponent(TouchableOpacity);
    const colorValue = useRef(new Animated.Value(0)).current;
    const ANIM_START = 0;
    const ANIM_END = 1;
    const COLOR_ANIM_DURATION = 300;

    const bgColor = colorValue.interpolate({
        inputRange: [ANIM_START, ANIM_END],
        outputRange: [Colors.BRAND, Colors.GREY100],
    });

    useEffect(() => {
        if (active) {
            Animated.timing(colorValue, {
                toValue: ANIM_START,
                duration: COLOR_ANIM_DURATION,
                useNativeDriver: false,
            }).start();
        } else {
            Animated.timing(colorValue, {
                toValue: ANIM_END,
                duration: COLOR_ANIM_DURATION,
                useNativeDriver: false,
            }).start();
        }
    }, [active]);
    const handlePress = () => {
        if (onPress) {
            onPress(category);
        }
    };
    return (
        <View style={styles.iconButtonWrapper}>
            <AnimatedTouchableOpacity
                style={[styles.iconButton, { backgroundColor: bgColor }]}
                onPress={handlePress}
            >
                <View>
                    {category === 'popular' ? (
                        <PopularSVG
                            width={40}
                            height={40}
                            viewBox="-1.5 0 15 15"
                            color={active ? 'white' : Colors.GREY400}
                        />
                    ) : category === 'main' ? (
                        <PizzaSVG
                            width={40}
                            height={40}
                            viewBox="-1.5 -1 20 20"
                            color={active ? 'white' : Colors.GREY400}
                        />
                    ) : category === 'starter' ? (
                        <SaladSVG
                            width={40}
                            height={40}
                            viewBox="0 0 16 16"
                            color={active ? 'white' : Colors.GREY400}
                        />
                    ) : category === 'dessert' ? (
                        <CakeSVG
                            width={40}
                            height={40}
                            viewBox="0 0 16 16"
                            color={active ? 'white' : Colors.GREY400}
                        />
                    ) : category === 'drink' ? (
                        <DrinkSVG
                            width={40}
                            height={40}
                            viewBox="-1.8 0.5 16 16"
                            color={active ? 'white' : Colors.GREY400}
                        />
                    ) : null}
                </View>
            </AnimatedTouchableOpacity>
            <Text
                style={[
                    styles.categoryName,
                    active ? styles.activeCategoryName : null,
                ]}
            >
                {category}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    iconButton: {
        height: 70,
        width: 70,
        borderRadius: 20,
        backgroundColor: Colors.GREY100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    active: {
        backgroundColor: Colors.BRAND,
    },
    iconButtonWrapper: {
        marginRight: 15,
    },
    categoryName: {
        textAlign: 'center',
        marginTop: 5,
        color: Colors.GREY300,
        textTransform: 'capitalize',
    },
    activeCategoryName: {
        color: Colors.GREY500,
        fontWeight: 600,
    },
});
