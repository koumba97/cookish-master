import { PropsWithChildren } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import AddSVG from '../svg/Add';
import CalendarSVG from '../svg/Calendar';
import AppText from '../ui/AppText';
interface Prop {}

export default function CalendarButton({}: PropsWithChildren & Prop) {
    const addToCalendar = () => {};

    return (
        <TouchableOpacity
            style={styles.addToCalendarContainer}
            onPress={addToCalendar}
        >
            <CalendarSVG
                width={40}
                height={40}
                viewBox="-1.5 0 18 18"
                color="white"
            />

            <AppText style={styles.buttonText}>Add to calendar</AppText>
            <View style={styles.iconWrapper}>
                <View>
                    <AddSVG
                        width={35}
                        height={35}
                        viewBox="-1 -1 10 10"
                        color="white"
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    addToCalendarContainer: {
        height: 60,
        backgroundColor: '#4D97FF',
        borderRadius: 20,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 20,
    },
    iconWrapper: {
        paddingHorizontal: 20,
        backgroundColor: '#2F7CE7',
        alignItems: 'center',
        height: 60,
        alignContent: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 800,
    },
});
