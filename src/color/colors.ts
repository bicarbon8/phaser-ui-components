import { Helpers } from "../utilities/helpers";

export module Colors {
    /** Blue */
    export const primary: number = 0x0d6efd;
    /** Gray */
    export const secondary: number = 0x6c757d;
    /** Green */
    export const success: number = 0x198754;
    /** Red */
    export const danger: number = 0xdc3545;
    /** Yellow */
    export const warning: number = 0xffc107;
    /** Light Blue */
    export const info: number = 0x0dcaf0;
    /** Light Gray */
    export const light: number = 0xf8f9fa;
    /** Dark Gray */
    export const dark: number = 0x212529;

    const darkHexValues: string = '01234567';
    const lightHexValues: string = '8abcdef';
    const hexValues: string = darkHexValues + lightHexValues;

    /**
     * determines if a color is dark based on the number of
     * hex values between 0 and 7. if 50% or more are dark
     * values then the color is considered 'dark'
     * @param color a hex color string or number like `#f5ac5c` or `0xf5ac5c`
     * @returns true if the color is dark otherwise false
     */
    export function isDark(color: string | number): boolean {
        let isDark: number = 0;
        let colorStr: string = (typeof color === "object") ? color as string : toHexString(color as number);
        colorStr = (colorStr.startsWith('#')) ? colorStr.slice(1) : colorStr;
        for (var i=0; i<colorStr.length; i++) {
            let c: string = colorStr[i];
            if (darkHexValues.includes(c)) {
                isDark++;
            }
        }
        return isDark >= Math.ceil(colorStr.length / 2);
    }

    /**
     * returns a random hex color like `#f5ac5c`
     */
    export function random(): string {
        let colorStr: string = '#';
        for (var i=0; i<6; i++) {
            colorStr += hexValues[randomFrom(hexValues)];
        }
        return colorStr;
    }

    /**
     * converts a hex color string to a hex number
     * @param color a hex string like `#f5ac5c`
     * @returns a hex number like `0xf5ac5c`
     */
    export function toHexNumber(color: string): number {
        return parseInt(color.slice(1), 16);
    }

    /**
     * converts a hex number to a hex color string
     * @param color a hex number like `0xf5ac5c`
     * @returns a hex string like `#f5ac5c`
     */
    export function toHexString(color: number): string {
        let colorStr: string = `${color.toString(16)}`;
        while (colorStr.length < 6) {
            colorStr = `0${colorStr}`;
        }
        return `#${colorStr}`;
    }

    /**
     * generates a lighter shade of the input `color` based on the 
     * `degrees` to lighten
     * @param color the starting color to base the lighter color on
     * @param degrees the amount to lighten
     * @returns a lighter shade of the input color
     */
    export function lighten(color: string, degrees: number = 1): string {
        let lighter: string = '';
        const colorStr: string = (color.startsWith('#')) ? color.slice(1) : color;
        for (var i=0; i<colorStr.length; i++) {
            let c: string = colorStr[i];
            let index: number = hexValues.indexOf(c);
            let lighterColorIndex: number = Helpers.getLowest(hexValues.length - 1, index + degrees);
            lighter += hexValues[lighterColorIndex];
        }
        return `#${lighter}`;
    }

    /**
     * generates a darker shade of the input `color` based on the 
     * `degrees` to darken
     * @param color the starting color to base the darker color on
     * @param degrees the amount to darken
     * @returns a darker shade of the input color
     */
     export function darken(color: string, degrees: number = 1): string {
        let darker: string = '';
        const colorStr: string = (color.startsWith('#')) ? color.slice(1) : color;
        for (var i=0; i<colorStr.length; i++) {
            let c: string = colorStr[i];
            let index: number = hexValues.indexOf(c);
            let darkerColorIndex: number = Helpers.getHighest(0, index - degrees);
            darker += hexValues[darkerColorIndex];
        }
        return `#${darker}`;
    }

    function randomFrom(input: string): number {
        return Math.floor(Math.random() * input.length);
    }
}