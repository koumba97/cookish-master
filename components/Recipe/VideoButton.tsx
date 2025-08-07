import { Colors } from '@/constants/Colors';
import { PropsWithChildren } from 'react';
import { Linking, StyleSheet, TouchableOpacity } from 'react-native';
import PlaySVG from '../svg/Play';
import AppText from '../ui/AppText';
interface Prop {
    link: string;
}

export default function VideoButton({ link }: PropsWithChildren & Prop) {
    return (
        <TouchableOpacity
            style={styles.addToCalendarContainer}
            onPress={() => Linking.openURL(link)}
        >
            <PlaySVG
                width={40}
                height={40}
                viewBox="0 0 25 25"
                color={Colors.GREY500}
            />

            <AppText style={styles.buttonText}>Watch the video</AppText>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    addToCalendarContainer: {
        height: 60,
        backgroundColor: Colors.GREY100,
        borderRadius: 20,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingHorizontal: 20,
    },

    buttonText: {
        color: Colors.GREY500,
        fontSize: 24,
        fontWeight: 800,
    },
});
