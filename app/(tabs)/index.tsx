import TabView from '@/components/TabView';
import { SearchBar } from '@/components/ui/searchBar';
import { UserAvatar } from '@/components/UserAvatar';
import {
    SCREEN_PADDING,
    screenWidth,
    SIDES_COUNT,
} from '@/constants/Dimensions';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { EventProvider } from 'react-native-outside-press';

export default function HomeScreen() {
    const USER_AVATAR_WIDTH = 60;
    const AVATAR_SEARCHBAR_GAP = 20;
    const [visibleGreetings, setVisibleGreetings] = useState(true);

    const handleSearchBar = (isOpen: boolean) => {
        setVisibleGreetings(!isOpen);
    };

    return (
        <EventProvider>
            <TabView>
                <View style={styles.avatarSearchBarWrapper}>
                    <UserAvatar showGreetings={visibleGreetings} />
                    <SearchBar
                        openWidth={
                            screenWidth -
                            SCREEN_PADDING * SIDES_COUNT -
                            (USER_AVATAR_WIDTH + AVATAR_SEARCHBAR_GAP)
                        }
                        handleOpen={handleSearchBar}
                    />
                </View>
            </TabView>
        </EventProvider>
    );
}

const styles = StyleSheet.create({
    avatarSearchBarWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});
