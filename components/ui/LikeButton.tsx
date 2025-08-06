import { Colors } from '@/constants/Colors';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import HeartSVG from '../svg/Heart';
interface Prop {
    isLiked: boolean;
    handleLike?: (liked: boolean) => {};
}

export default function LikeButton({ isLiked, handleLike }: Prop) {
    const [liked, setLiked] = useState(isLiked);
    const onLike = () => {
        setLiked(!liked);
        if (handleLike) {
            handleLike(!liked);
        }
    };
    return (
        <TouchableOpacity style={styles.likeButton} onPress={onLike}>
            <HeartSVG
                width={30}
                height={30}
                viewBox="-1 -2 22 22"
                color={liked ? Colors.BRAND : 'black'}
                filled={liked}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    likeButton: {
        height: 50,
        width: 50,
        borderRadius: 40,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
