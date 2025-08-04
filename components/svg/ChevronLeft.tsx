import { SVGProp } from '@/types/svg';
import Svg, { Path } from 'react-native-svg';

export default function ChevronLeftSVG({
    width,
    height,
    viewBox,
    color = 'black',
}: SVGProp) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox={viewBox ? viewBox : `0 0 ${width} ${height}`}
            fill="none"
        >
            <Path
                d="M5.25 1.0968L0.75 5.5968L5.25 10.0968"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}
