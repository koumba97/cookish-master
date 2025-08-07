import { SVGProp } from '@/types/svg';
import Svg, { Path } from 'react-native-svg';

export default function ChevronRightSVG({
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
                d="M0.986267 1.5968L5.48627 6.0968L0.986267 10.5968"
                stroke={color}
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </Svg>
    );
}
