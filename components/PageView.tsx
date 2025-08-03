import { PropsWithChildren } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import AvatarSearchBarSection from './Home/AvatarSearchBarSection';

export default function PageView({ children }: PropsWithChildren) {
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView style={styles.topPageContent} scrollEnabled={false}>
                <AvatarSearchBarSection />
            </ScrollView>
            <ScrollView style={styles.pageViewContent}>
                <View style={styles.tabView}>{children}</View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    tabView: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        fontFamily: 'Nunito',
        paddingBottom: 30,
    },
    topPageContent: {
        backgroundColor: 'white',
        height: 170,
        paddingHorizontal: 20,
        paddingTop: 80,
    },
    pageViewContent: {},
});
