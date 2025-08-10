import { Colors } from '@/constants/Colors';
import { screenWidth } from '@/constants/Dimensions';
import { useRecipeContext } from '@/contexts/RecipeContext';
import * as Calendar from 'expo-calendar';
import { router } from 'expo-router';
import { Alert, StyleSheet } from 'react-native';
import AppButton from '../ui/AppButton';

interface Prop {
    date: Date;
    saved: () => void;
}
export default function SaveCalendarButton({ date, saved }: Prop) {
    const { recipe, selectedIngredients } = useRecipeContext();
    async function getDefaultCalendarId() {
        const calendars = await Calendar.getCalendarsAsync(
            Calendar.EntityTypes.EVENT
        );

        const defaultCalendar = calendars.find(
            (cal) => cal.source && cal.source.name === 'Default'
        );

        if (defaultCalendar) {
            return defaultCalendar.id;
        }

        return calendars[0]?.id;
    }

    async function addEventToCalendar() {
        const { status } = await Calendar.requestCalendarPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Access denied');
            return;
        }

        const calendarId = await getDefaultCalendarId();
        if (!calendarId) {
            Alert.alert('Calendar not found');
            return;
        }

        await Calendar.createEventAsync(calendarId, {
            title: recipe.name,
            startDate: date,
            endDate: date,
            notes: selectedIngredients?.join(', '),
        });

        alert('Événement ajouté ✅');
        saved();
        router.back();
    }
    return (
        <AppButton
            color={Colors.BLUE300}
            textColor="white"
            style={styles.saveButton}
            onPress={addEventToCalendar}
        >
            Save
        </AppButton>
    );
}

const styles = StyleSheet.create({
    saveButton: {
        width: screenWidth - 40 * 2,
        marginTop: 20,
    },
});
