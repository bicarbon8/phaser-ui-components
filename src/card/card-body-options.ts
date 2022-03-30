import { TextButtonOptions } from "../button/text-button-options";

export interface CardBodyOptions {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    title?: string;
    titleStyle?: Phaser.Types.GameObjects.Text.TextStyle;
    description?: string;
    descriptionStyle?: Phaser.Types.GameObjects.Text.TextStyle;
    buttons?: TextButtonOptions[];
    buttonSpacing?: number;
    background?: Phaser.Types.GameObjects.Graphics.Styles;
    cornerRadius?: number;
    padding?: number;
}

export module CardBodyOptions {
    export function DEFAULT(scene: Phaser.Scene): CardBodyOptions {
        return {
            x: 0,
            y: 0,
            width: scene.sys.game.scale.gameSize.width,
            titleStyle: {fontFamily: 'Courier', fontSize: '20px', color: '#000000'},
            descriptionStyle: {fontFamily: 'Courier', fontSize: '14px', color: '#000000'},
            buttons: [],
            buttonSpacing: 0,
            cornerRadius: 0,
            padding: 0
        };
    }
}