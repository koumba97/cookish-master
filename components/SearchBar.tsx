import { Colors } from '@/constants/Colors';
import {
    SCREEN_PADDING,
    screenWidth,
    SIDES_COUNT,
} from '@/constants/Dimensions';
import { Recipe } from '@/types/recipe';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, TextInput, View } from 'react-native';
import OutsidePressHandler from 'react-native-outside-press';
import SearchSVG from './svg/Search';

interface Prop {
    visible?: boolean;
    openWidth?: number;
    searchResults: (recipes: Recipe[], query: string | undefined) => void;
    handleOpen?: (isOpen: boolean) => void;
}

const defaultWidth = screenWidth - SCREEN_PADDING * SIDES_COUNT;

export default function SearchBar({
    visible = false,
    openWidth = defaultWidth,
    searchResults,
    handleOpen,
}: Prop) {
    const SEARCH_ICON_WIDTH = 60;
    const COLOR_ANIM_DURATION = 600;
    const WIDTH_ANIM_DURATION = 300;
    const WIDTH_EXTEND_ANIM_DURATION = 600;

    const ANIM_START = 0;
    const ANIM_END = 1;

    const [isOpen, setIsOpen] = useState(visible);
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);
    const widthAnim = useRef(new Animated.Value(SEARCH_ICON_WIDTH)).current;
    const colorValue = useRef(new Animated.Value(0)).current;
    const searchRef = useRef<View>(null);

    const bgColor = colorValue.interpolate({
        inputRange: [ANIM_START, ANIM_END],
        outputRange: [Colors.TRANSPARENT, Colors.GREY100],
    });

    useEffect(() => {
        if (handleOpen) {
            handleOpen(isOpen);
        }
    }, [isOpen]);

    const fetchMeals = async (search = '') => {
        try {
            setLoading(true);
            const res = await axios.get(
                `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
            );
            console.log(res.data.meals);
            searchResults(res.data.meals || [], search);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const openSearchBar = () => {
        if (!isOpen) {
            Animated.timing(widthAnim, {
                toValue: openWidth,
                duration: WIDTH_EXTEND_ANIM_DURATION,
                useNativeDriver: false,
            }).start();

            Animated.timing(colorValue, {
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

            Animated.timing(colorValue, {
                toValue: ANIM_START,
                duration: COLOR_ANIM_DURATION,
                useNativeDriver: false,
            }).start();

            setIsOpen(false);
        }
    };

    const handleChangeText = (text: string) => {
        setValue(text);
        console.log(text);
        fetchMeals(text);
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
                            width={20}
                            height={20}
                            viewBox="0 0 22 22"
                            color={Colors.GREY400}
                        />
                    </View>
                    {isOpen ? (
                        <TextInput
                            style={styles.textInput}
                            placeholder="Search"
                            value={value}
                            onChangeText={handleChangeText}
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
        height: 40,
        paddingHorizontal: 10,
        justifyContent: 'center',
    },
    visibleSearchBar: {
        backgroundColor: Colors.GREY100,
        borderRadius: 100,
        width: '100%',
        height: 40,
        paddingHorizontal: 10,
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 10,
    },
    textInput: {
        flex: 1,
        fontSize: 20,
        fontFamily: 'Nunito',
    },
    searchIcon: {
        justifyContent: 'center',
    },
});
