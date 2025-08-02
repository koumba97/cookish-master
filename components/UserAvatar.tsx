import { Colors } from '@/constants/Colors';
import { useEffect, useRef } from 'react';
import { Animated, ImageBackground, StyleSheet, View } from 'react-native';
import AppText from './ui/AppText';

interface Prop {
    showGreetings: boolean;
}
export function UserAvatar({ showGreetings }: Prop) {
    const WIDTH_ANIM_DURATION = 400;

    const ANIM_START = 0;
    const ANIM_END = 1;
    const opacityAnim = useRef(new Animated.Value(1)).current;
    const leftAnim = useRef(new Animated.Value(1)).current;
    const widthAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        handleGreetings();
    }, [showGreetings]);

    const handleGreetings = () => {
        if (!showGreetings) {
            Animated.timing(opacityAnim, {
                toValue: 0,
                duration: WIDTH_ANIM_DURATION,
                useNativeDriver: false,
            }).start();
            Animated.timing(widthAnim, {
                toValue: 0,
                duration: WIDTH_ANIM_DURATION,
                useNativeDriver: false,
            }).start();
        } else {
            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: WIDTH_ANIM_DURATION,
                useNativeDriver: false,
            }).start();
            Animated.timing(widthAnim, {
                toValue: 200,
                duration: WIDTH_ANIM_DURATION,
                useNativeDriver: false,
            }).start();
        }
    };
    return (
        <View style={styles.userAvatarContainer}>
            <ImageBackground
                source={require('../assets/images/koum-avatar.jpg')}
                style={styles.avatar}
                imageStyle={{ borderRadius: 50 }}
            ></ImageBackground>
            <Animated.View
                style={[
                    {
                        opacity: opacityAnim,
                        left: leftAnim,
                        width: widthAnim,
                    },
                    styles.greetingsWrapper,
                ]}
            >
                <AppText numberOfLines={1} style={styles.welcomeText}>
                    Welcome back,
                </AppText>
                <AppText numberOfLines={1} style={styles.userText}>
                    Koum
                </AppText>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    userAvatarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        height: 50,
    },
    avatar: {
        height: 60,
        width: 60,
        backgroundColor: Colors.GREY200,
        borderRadius: 100,
    },
    welcomeText: {
        fontSize: 16,
        fontWeight: 400,
        flexWrap: 'nowrap',
    },
    userText: {
        fontSize: 28,
        padding: 0,
        margin: 0,
        fontWeight: 700,
        height: 30,
        lineHeight: 32,
    },
    greetingsWrapper: {
        position: 'relative',
        overflow: 'hidden',
    },
});
