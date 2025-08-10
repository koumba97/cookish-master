import { Colors } from '@/constants/Colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import AppButton from '../ui/AppButton';
import AppText from '../ui/AppText';

interface Prop {
    visible: boolean;
    hide?: () => void;
}
export default function CalendarModal({ visible, hide }: Prop) {
    const [isVisible, setIsVisible] = useState(visible);
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setIsVisible(visible);
    }, [visible]);

    const handleHideModal = () => {
        setIsVisible(false);
        if (hide) hide();
    };
    return (
        <Modal
            isVisible={isVisible}
            style={{ flex: 1 }}
            onBackdropPress={handleHideModal}
        >
            <View style={styles.calendarModal}>
                <AppText style={styles.modalTitle}>
                    Add this recipe to your Calendar
                </AppText>
                <AppText style={styles.modalText}>
                    Select on which date you plan to cook/bake this recipe and
                    when do you plan to get the ingredients at the grocery
                </AppText>

                <DateTimePicker
                    style={styles.datePicker}
                    value={date}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) =>
                        setDate(selectedDate || date)
                    }
                />
                <AppButton color={Colors.BLUE300} textColor="white">
                    Save
                </AppButton>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    calendarModal: {
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        height: 'auto',
        flex: 0,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 700,
        textAlign: 'center',
    },
    modalText: {
        textAlign: 'center',
    },
    datePicker: {
        margin: 'auto',
        marginTop: 20,
    },
});
