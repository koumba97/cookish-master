import { PropsWithChildren } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import AddSVG from '../svg/Add';
import CalendarSVG from '../svg/Calendar';
import AppText from '../ui/AppText';
interface Prop {
    isSmall: boolean;
}

export default function CalendarButton({
    isSmall = false,
}: PropsWithChildren & Prop) {
    const addToCalendar = () => {};

    return (
        <TouchableOpacity
            style={[
                styles.addToCalendarContainer,
                isSmall ? styles.small : styles.large,
            ]}
            onPress={addToCalendar}
        >
            <CalendarSVG
                width={isSmall ? 30 : 35}
                height={isSmall ? 30 : 35}
                viewBox={isSmall ? '-1.5 0 18 18' : '-1.5 0 18 18'}
                color="white"
            />

            <AppText
                style={[styles.buttonText, isSmall ? styles.smallText : null]}
            >
                Add to calendar
            </AppText>
            {!isSmall ? (
                <View style={styles.iconWrapper}>
                    <View>
                        <AddSVG
                            width={30}
                            height={30}
                            viewBox="-1 -1 10 10"
                            color="white"
                        />
                    </View>
                </View>
            ) : null}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    addToCalendarContainer: {
        height: 50,
        backgroundColor: '#4D97FF',
        borderRadius: 20,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 20,
    },
    small: {
        paddingLeft: 15,
        paddingRight: 15,
    },
    large: { flex: 1 },
    smallText: {
        fontSize: 14,
    },
    iconWrapper: {
        paddingHorizontal: 20,
        backgroundColor: '#2F7CE7',
        alignItems: 'center',
        height: 50,
        alignContent: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 22,
        fontWeight: 800,
    },
});
