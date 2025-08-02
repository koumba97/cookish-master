import { Colors } from '@/constants/Colors';
import {
    SCREEN_PADDING,
    screenWidth,
    SIDES_COUNT,
} from '@/constants/Dimensions';
import { useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, TextInput, View } from 'react-native';
import OutsidePressHandler from 'react-native-outside-press';
import SearchSVG from '../svg/Search';

interface Prop {
    visible?: boolean;
}
export function SearchBar({ visible = false }: Prop) {
    const SEARCH_ICON_WIDTH = 60;
    const COLOR_ANIM_DURATION = 600;
    const WIDTH_ANIM_DURATION = 300;

    const ANIM_START = 0;
    const ANIM_END = 1;

    const [isOpen, setIsOpen] = useState(visible);
    const widthAnim = useRef(new Animated.Value(SEARCH_ICON_WIDTH)).current;
    const animValue = useRef(new Animated.Value(0)).current;
    const searchRef = useRef<View>(null);

    var bgColor = animValue.interpolate({
        inputRange: [ANIM_START, ANIM_END],
        outputRange: [Colors.TRANSPARENT, Colors.GREY100],
    });

    const openSearchBar = () => {
        if (!isOpen) {
            Animated.timing(widthAnim, {
                toValue: screenWidth - SCREEN_PADDING * SIDES_COUNT,
                duration: WIDTH_ANIM_DURATION,
                useNativeDriver: false,
            }).start();

            Animated.timing(animValue, {
                toValue: ANIM_END,
                duration: COLOR_ANIM_DURATION,
                useNativeDriver: false,
            }).start();

            setIsOpen(true);
        }
    };

    const closeSearchBar = () => {
        if (isOpen) {
            Animated.timing(widthAnim, {
                toValue: SEARCH_ICON_WIDTH,
                duration: WIDTH_ANIM_DURATION,
                useNativeDriver: false,
            }).start();

            Animated.timing(animValue, {
                toValue: ANIM_START,
                duration: COLOR_ANIM_DURATION,
                useNativeDriver: false,
            }).start();

            setIsOpen(false);
        }
    };

    return (
        <OutsidePressHandler onOutsidePress={closeSearchBar}>
            <Animated.View
                ref={searchRef}
                style={[
                    styles.searchBarWrapper,
                    { width: widthAnim },
                    { backgroundColor: bgColor },
                ]}
            >
                <Pressable
                    style={
                        isOpen
                            ? styles.visibleSearchBar
                            : styles.hiddenSearchBar
                    }
                    onPress={openSearchBar}
                >
                    <View style={styles.searchIcon}>
                        <SearchSVG
                            width={30}
                            height={30}
                            viewBox="0 0 22 22"
                            color={Colors.GREY400}
                        />
                    </View>
                    {isOpen ? (
                        <TextInput
                            style={styles.textInput}
                            placeholder="Search"
                        ></TextInput>
                    ) : null}
                </Pressable>
            </Animated.View>
        </OutsidePressHandler>
    );
}

const styles = StyleSheet.create({
    searchBarWrapper: {
        borderRadius: 100,
    },
    hiddenSearchBar: {
        height: 50,
        paddingHorizontal: 10,
        justifyContent: 'center',
    },
    visibleSearchBar: {
        backgroundColor: Colors.GREY100,
        borderRadius: 100,
        width: '100%',
        height: 50,
        paddingHorizontal: 10,
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 10,
    },
    textInput: {
        flex: 1,
        fontSize: 20,
    },
    searchIcon: {
        justifyContent: 'center',
    },
});
