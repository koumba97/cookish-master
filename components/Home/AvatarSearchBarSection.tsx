import SearchBar from '@/components/SearchBar';
import { UserAvatar } from '@/components/ui/UserAvatar';
import {
    SCREEN_PADDING,
    screenWidth,
    SIDES_COUNT,
} from '@/constants/Dimensions';
import { RecipeResult } from '@/types/Recipe';
import { router, usePathname } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import ChevronLeftSVG from '../svg/ChevronLeft';

interface Prop {
    searchResults: (recipes: RecipeResult[], query: string | undefined) => void;
}

export default function AvatarSearchBarSection({ searchResults }: Prop) {
    const currentRoute = usePathname()
        .split('/')
        .filter((item) => item !== '');
    const USER_AVATAR_WIDTH = 60;
    const AVATAR_SEARCHBAR_GAP = 10;
    const [visibleGreetings, setVisibleGreetings] = useState(true);

    const handleSearchBar = (isOpen: boolean) => {
        setVisibleGreetings(!isOpen);
    };

    const handleSearchResults = (
        results: RecipeResult[],
        query: string | undefined
    ) => {
        searchResults(results, query);
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.avatarSearchBarWrapper}>
                {currentRoute.length > 0 ? (
                    <TouchableOpacity onPress={() => router.back()}>
                        <ChevronLeftSVG
                            width={20}
                            height={40}
                            viewBox="-1 0 10 10"
                        />
                    </TouchableOpacity>
                ) : null}
                <UserAvatar showGreetings={visibleGreetings} />
                <SearchBar
                    openWidth={
                        screenWidth -
                        SCREEN_PADDING * SIDES_COUNT -
                        (USER_AVATAR_WIDTH + AVATAR_SEARCHBAR_GAP)
                    }
                    searchResults={handleSearchResults}
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
