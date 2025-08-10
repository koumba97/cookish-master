import * as Calendar from 'expo-calendar';
import { router } from 'expo-router';
import { PropsWithChildren } from 'react';
import {
    Alert,
    Button,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import AddSVG from '../svg/Add';
import CalendarSVG from '../svg/Calendar';
import AppText from '../ui/AppText';
interface Prop {
    isSmall: boolean;
    recipeId: string;
}

export default function CalendarButton({
    isSmall = false,
    recipeId,
}: PropsWithChildren & Prop) {
    const addToCalendar = () => {};

    return (
        <TouchableOpacity
            style={[
                styles.addToCalendarContainer,
                isSmall ? styles.small : styles.large,
            ]}
            onPress={() =>
                router.push(`/recipe/${recipeId}/select/ingredients`)
            }
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

export function AddToCalendar() {
    async function getDefaultCalendarId() {
        const calendars = await Calendar.getCalendarsAsync(
            Calendar.EntityTypes.EVENT
        );

        // Trouve le calendrier par défaut de l'iPhone
        const defaultCalendar = calendars.find(
            (cal) => cal.source && cal.source.name === 'Default'
        );

        if (defaultCalendar) {
            return defaultCalendar.id;
        }

        // Sinon, utilise le premier calendrier trouvé
        return calendars[0]?.id;
    }

    async function addEventToCalendar() {
        const { status } = await Calendar.requestCalendarPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission refusée');
            return;
        }

        const calendarId = await getDefaultCalendarId();
        if (!calendarId) {
            Alert.alert('Aucun calendrier trouvé');
            return;
        }

        const start = new Date();
        start.setMinutes(start.getMinutes() + 5); // commence dans 5 min
        const end = new Date(start);
        end.setMinutes(end.getMinutes() + 60); // dure 1h

        await Calendar.createEventAsync(calendarId, {
            title: 'Mon super événement',
            startDate: start,
            endDate: end,
            timeZone: 'Europe/Paris',
            location: 'Paris',
            notes: 'Événement ajouté depuis mon app',
        });

        alert('Événement ajouté ✅');
    }
    return <Button title="test" onPress={addEventToCalendar} />;
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
