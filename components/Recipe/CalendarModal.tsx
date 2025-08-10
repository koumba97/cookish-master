import { Colors } from '@/constants/Colors';
import { screenWidth } from '@/constants/Dimensions';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import CalendarSVG from '../svg/Calendar';
import AppText from '../ui/AppText';
import SaveCalendarButton from './SaveCalendarButton';

interface Prop {
    visible: boolean;
    hide?: () => void;
}
export default function CalendarModal({ visible, hide }: Prop) {
    const currentDate = new Date();
    const tomorrowDate = new Date(
        currentDate.setDate(currentDate.getDate() + 1)
    );

    //const tomorrowDate = currentDate.setDate(currentDate.getDate() + 1);
    const [isVisible, setIsVisible] = useState(visible);
    const [date, setDate] = useState(tomorrowDate);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setIsVisible(visible);
    }, [visible]);

    useEffect(() => {
        console.log(date);
    }, [date]);

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
                <ImageBackground
                    source={require('../../assets/images/shopping-bag.png')}
                    style={[styles.shoppingBagImg, { padding: 20 }]}
                    imageStyle={{
                        padding: 10,
                        resizeMode: 'contain',
                        borderRadius: 20,
                        backgroundColor: Colors.BLUE100,
                    }}
                ></ImageBackground>
                <AppText style={styles.modalTitle}>Set a date</AppText>
                <AppText style={styles.modalText}>
                    Select on which date you plan to cook/bake this recipe and
                    when do you plan to get the ingredients at the grocery
                </AppText>

                <View style={styles.datePickerContainer}>
                    <CalendarSVG
                        width={30}
                        height={30}
                        viewBox={'0 0 18 18'}
                        color={Colors.BLUE300}
                    />
                    <DateTimePicker
                        style={styles.datePicker}
                        value={date}
                        mode="date"
                        display="default"
                        onChange={(event, selectedDate) =>
                            setDate(selectedDate || date)
                        }
                    />
                </View>
                <SaveCalendarButton date={date} saved={handleHideModal} />
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
        fontSize: 30,
        fontWeight: 700,
        textAlign: 'center',
    },
    modalText: {
        textAlign: 'center',
        fontSize: 18,
    },
    datePickerContainer: {
        marginTop: 20,
        borderWidth: 2,
        borderColor: Colors.GREY200,
        width: screenWidth - 40 * 2,
        borderRadius: 20,
        height: 50,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    datePicker: {
        margin: 'auto',
        fontSize: 30,
        height: 50,
        backgroundColor: 'white',
    },
    saveButton: {
        width: screenWidth - 40 * 2,
        marginTop: 20,
    },
    shoppingBagImg: {
        height: 100,
        width: 100,
        marginBottom: 20,
    },
});
