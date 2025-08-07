import { SVGProp } from '@/types/svg';
import Svg, { Path } from 'react-native-svg';

export default function PlaySVG({
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
                d="M18.2334 8.23502C18.7137 8.49043 19.1154 8.87171 19.3956 9.33801C19.6757 9.8043 19.8238 10.338 19.8238 10.882C19.8238 11.426 19.6757 11.9597 19.3956 12.426C19.1154 12.8923 18.7137 13.2736 18.2334 13.529L5.42137 20.496C3.35837 21.619 0.824371 20.159 0.824371 17.85V3.91502C0.824371 1.60502 3.35837 0.146021 5.42137 1.26702L18.2334 8.23502Z"
                fill={color}
            />
        </Svg>
    );
}
