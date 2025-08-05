import { SVGProp } from '@/types/svg';
import Svg, { Path } from 'react-native-svg';

export default function HeartSVG({
    width,
    height,
    viewBox,
    color = 'black',
    filled = false,
}: SVGProp) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox={viewBox ? viewBox : `0 0 ${width} ${height}`}
            fill="none"
        >
            <Path
                d="M5.75 1.06262C3.127 1.06262 1 3.32262 1 6.10962C1 11.6876 10 18.0626 10 18.0626C10 18.0626 19 11.6876 19 6.10962C19 2.65662 16.873 1.06262 14.25 1.06262C12.39 1.06262 10.78 2.19862 10 3.85262C9.22 2.19862 7.61 1.06262 5.75 1.06262Z"
                stroke={color}
                fill={filled ? color : undefined}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}
