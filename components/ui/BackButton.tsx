import { router } from 'expo-router';
import { PropsWithChildren } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import ChevronLeftSVG from '../svg/ChevronLeft';
interface Prop {}

export default function BackButton({}: PropsWithChildren & Prop) {
    return (
        <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
        >
            <ChevronLeftSVG width={20} height={40} viewBox="-1 0 10 10" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    backButton: {
        height: 50,
        width: 50,
        borderRadius: 40,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
