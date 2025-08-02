import { Colors } from '@/constants/Colors';
import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

interface Prop {
    showGreetings: boolean;
}
export function UserAvatar({ showGreetings }: Prop) {
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
                duration: 600,
                useNativeDriver: false,
            }).start();
            Animated.timing(widthAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false,
            }).start();
        } else {
            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: false,
            }).start();
            Animated.timing(widthAnim, {
                toValue: 200,
                duration: 300,
                useNativeDriver: false,
            }).start();
        }
    };
    return (
        <View style={styles.userAvatarContainer}>
            <View style={styles.avatar}></View>
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
                <Text numberOfLines={1} style={styles.welcomeText}>
                    Welcome back,
                </Text>
                <Text numberOfLines={1} style={styles.userText}>
                    Koum
                </Text>
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
        fontSize: 24,
        fontWeight: 700,
    },
    greetingsWrapper: {
        position: 'relative',
        overflow: 'hidden',
    },
});
