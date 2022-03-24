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

    /**
     * determines if a color is dark based on the number of
     * hex values between 0 and 7. if 50% or more are dark
     * values then the color is considered 'dark'
     * @param color a hex color string like `#f5ac5c`
     * @returns true if the color is dark otherwise false
     */
    export function isDark(color: string): boolean {
        let isDark: number = 0;
        color = (color.startsWith('#')) ? color.slice(1) : color;
        for (var i=0; i<color.length; i++) {
            let c: string = color[i];
            if (['0','1','2','3','4','5','6','7'].includes(c)) {
                isDark++;
            }
        }
        return isDark >= Math.ceil(color.length / 2);
    }

    /**
     * returns a random hex color like `#f5ac5c`
     */
    export function getRandom(): string {
        const values: string = '0123456789abcdef';
        let colorStr: string = '#';
        for (var i=0; i<6; i++) {
            colorStr += values[randomFrom(values)];
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
        return `#${color.toString(16)}`;
    }

    function randomFrom(input: string): number {
        return Math.floor(Math.random() * input.length);
    }
}