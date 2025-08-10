import { Colors } from '@/constants/Colors';
import { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import CheckSVG from '../svg/Check';

interface Prop {
    checked: boolean;
    name: string;
    onCheck: (name: string, checked: boolean) => void;
}
export default function Checkbox({ checked, name, onCheck }: Prop) {
    const [isChecked, setIsChecked] = useState(checked);
    useEffect(() => {
        setIsChecked(checked);
    }, [checked]);
    const toggleCheck = () => {
        onCheck(name, !isChecked);
        setIsChecked(!isChecked);
    };
    return (
        <TouchableOpacity
            style={[styles.checkbox, isChecked ? styles.checked : null]}
            onPress={toggleCheck}
        >
            {isChecked ? (
                <CheckSVG
                    width={23}
                    height={23}
                    viewBox="-1 -4 22 22"
                    color="white"
                />
            ) : null}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    checkbox: {
        height: 30,
        width: 30,
        borderWidth: 3,
        borderRadius: 10,
        borderColor: Colors.GREY200,
    },
    checked: {
        backgroundColor: Colors.BLUE300,
        borderColor: Colors.BLUE300,
    },
});
