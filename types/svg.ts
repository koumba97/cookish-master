export interface SVGProp {
    width: number;
    height: number;
    filled?: boolean;
    viewBox?: viewBox;
    color?: string;
}
export type viewBox = `${number} ${number} ${number} ${number}`;
