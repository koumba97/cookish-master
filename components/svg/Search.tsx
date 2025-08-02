import { SVGProp } from '@/types/svg';
import Svg, { Path } from 'react-native-svg';

export default function SearchSVG({
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
                d="M19.7068 19.4598L15.3638 15.1168M15.3638 15.1168C16.1067 14.3739 16.696 13.492 17.098 12.5213C17.5001 11.5507 17.707 10.5104 17.707 9.4598C17.707 8.4092 17.5001 7.36888 17.098 6.39825C16.696 5.42762 16.1067 4.54569 15.3638 3.8028C14.6209 3.05991 13.739 2.47062 12.7683 2.06857C11.7977 1.66653 10.7574 1.45959 9.70678 1.45959C8.65618 1.45959 7.61586 1.66653 6.64523 2.06857C5.6746 2.47062 4.79267 3.05991 4.04978 3.8028C2.54945 5.30313 1.70657 7.33801 1.70657 9.4598C1.70657 11.5816 2.54945 13.6165 4.04978 15.1168C5.55011 16.6171 7.58499 17.46 9.70678 17.46C11.8286 17.46 13.8634 16.6171 15.3638 15.1168Z"
                stroke={color}
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}
