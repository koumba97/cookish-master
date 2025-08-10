import { Colors } from '@/constants/Colors';
import { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import AppText from '../ui/AppText';
interface Prop {
    onPress?: () => void;
    color?: string;
    textColor?: string;
    icon?: ReactElement;
}

export default function AppButton({
    onPress,
    children,
    color = Colors.GREY100,
    textColor = Colors.GREY500,
    icon,
}: PropsWithChildren & Prop) {
    return (
        <TouchableOpacity
            style={[styles.buttonContainer, { backgroundColor: color }]}
            onPress={onPress}
        >
            {icon}
            <AppText style={[styles.buttonText, { color: textColor }]}>
                {children}
            </AppText>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        height: 50,
        borderRadius: 20,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingHorizontal: 20,
    },

    buttonText: {
        alignItems: 'center',
        fontSize: 14,
        fontWeight: 800,
    },
});
