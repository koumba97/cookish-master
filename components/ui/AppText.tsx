import { PropsWithChildren } from 'react';
import { StyleSheet, Text } from 'react-native';
interface Prop {
    numberOfLines?: number;
    style?: object;
}

export default function AppText({
    children,
    numberOfLines,
    style,
}: PropsWithChildren & Prop) {
    return (
        <Text style={[styles.appText, style]} numberOfLines={numberOfLines}>
            {children}
        </Text>
    );
}

const styles = StyleSheet.create({
    appText: {
        fontFamily: 'Nunito',
    },
});
