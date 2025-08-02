import { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';

export default function TabView({ children }: PropsWithChildren) {
    return <View style={styles.tabView}>{children}</View>;
}

const styles = StyleSheet.create({
    tabView: {
        backgroundColor: 'white',
        flex: 1,
        paddingTop: 70,
        paddingHorizontal: 20,
        fontFamily: 'Nunito',
    },
});
