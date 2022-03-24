import { Colors } from "../color/colors";

export interface ButtonStyle {
    textColor: string;
    backgroundColor: number;
}

export module ButtonStyle {
    /** Blue background with White text */
    export const primary: ButtonStyle = {textColor: '#ffffff', backgroundColor: Colors.primary};
    /** Gray background with White text */
    export const secondary: ButtonStyle = {textColor: '#ffffff', backgroundColor: Colors.secondary};
    /** Green background with White text */
    export const success: ButtonStyle = {textColor: '#ffffff', backgroundColor: Colors.success};
    /** Red background with White text */
    export const danger: ButtonStyle = {textColor: '#ffffff', backgroundColor: Colors.danger};
    /** Yellow background with Black text */
    export const warning: ButtonStyle = {textColor: '#000000', backgroundColor: Colors.warning};
    /** Light Blue background with Black text */
    export const info: ButtonStyle = {textColor: '#000000', backgroundColor: Colors.info};
    /** Light Gray background with Black text */
    export const light: ButtonStyle = {textColor: '#000000', backgroundColor: Colors.light};
    /** Dark Gray background with White text */
    export const dark: ButtonStyle = {textColor: '#ffffff', backgroundColor: Colors.dark};
}