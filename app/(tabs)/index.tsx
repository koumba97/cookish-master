import TabView from '@/components/TabView';
import { SearchBar } from '@/components/ui/searchBar';
import { StyleSheet } from 'react-native';
import { EventProvider } from 'react-native-outside-press';

export default function HomeScreen() {
    return (
        <EventProvider>
            <TabView>
                <SearchBar />
            </TabView>
        </EventProvider>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
});
