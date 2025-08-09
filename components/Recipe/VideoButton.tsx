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
            style={[styles.videoContainer, styles.small]}
            onPress={() => Linking.openURL(link)}
        >
            <PlaySVG
                width={25}
                height={25}
                viewBox="0 0 25 25"
                color={Colors.GREY500}
            />

            <AppText style={styles.buttonText}>Watch the video</AppText>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    videoContainer: {
        height: 50,
        backgroundColor: Colors.GREY100,
        borderRadius: 20,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingHorizontal: 20,
    },

    small: {},

    buttonText: {
        color: Colors.GREY500,
        fontSize: 14,
        fontWeight: 800,
    },
});
