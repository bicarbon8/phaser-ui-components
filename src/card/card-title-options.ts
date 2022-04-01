import { Alignment } from "../layout/alignment";

export interface CardTitleOptions {
    width?: number;
    height?: number;
    text?: string;
    textStyle?: Phaser.Types.GameObjects.Text.TextStyle;
    padding?: number;
    alignment?: Alignment;
}

export module CardTitleOptions {
    export function DEFAULT(): CardTitleOptions {
        return {
            textStyle: {fontFamily: 'Courier', fontSize: '20px', color: '#000000'},
            padding: 0,
            alignment: {horizontal: 'left', vertical: 'middle'}
        }
    }
}