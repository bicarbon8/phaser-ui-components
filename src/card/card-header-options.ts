import { Colors } from "../color/colors";
import { Helpers } from "../utilities/helpers";

export interface CardHeaderOptions {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    text?: string;
    textStyle?: Phaser.Types.GameObjects.Text.TextStyle;
    background?: Phaser.Types.GameObjects.Graphics.Styles;
    cornerRadius?: number;
    padding?: number;
}

export module CardHeaderOptions {
    export function DEFAULT(scene: Phaser.Scene): CardHeaderOptions {
        return {
            x: 0,
            y: 0,
            width: scene.sys.game.scale.gameSize.width,
            textStyle: {fontFamily: 'Courier', fontSize: '20px', color: '#000000'},
            cornerRadius: 0,
            padding: 0
        };
    }

    export function primary(options?: CardHeaderOptions): CardHeaderOptions {
        return Helpers.merge({
            textStyle: {color: '#ffffff'},
            background: {fillStyle: {color: Colors.primary}}
        }, options);
    }
}