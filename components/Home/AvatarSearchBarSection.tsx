import SearchBar from '@/components/ui/SearchBar';
import { UserAvatar } from '@/components/UserAvatar';
import {
    SCREEN_PADDING,
    screenWidth,
    SIDES_COUNT,
} from '@/constants/Dimensions';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function AvatarSearchBarSection() {
    const USER_AVATAR_WIDTH = 60;
    const AVATAR_SEARCHBAR_GAP = 10;
    const [visibleGreetings, setVisibleGreetings] = useState(true);

    const handleSearchBar = (isOpen: boolean) => {
        setVisibleGreetings(!isOpen);
    };

    return (
        <View style={{ flex: 1 }}>
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
        </View>
    );
}

const styles = StyleSheet.create({
    avatarSearchBarWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});
