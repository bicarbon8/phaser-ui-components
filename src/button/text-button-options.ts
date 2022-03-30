import { Colors } from "../color/colors";

export interface TextButtonOptions {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    text?: string;
    textStyle?: Phaser.Types.GameObjects.Text.TextStyle;
    background?: Phaser.Types.GameObjects.Graphics.Styles;
    cornerRadius?: number;
    interactive?: boolean;
    padding?: number;
}

export module TextButtonOptions {
    export function DEFAULT(): TextButtonOptions {
        return {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            textStyle: {fontFamily: 'Courier', fontSize: '20px', color: Colors.toHexString(Colors.dark)},
            padding: 0
        };
    }
}