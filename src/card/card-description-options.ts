import { Alignment } from "../layout/alignment";

export interface CardDescriptionOptions {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    text?: string;
    textStyle?: Phaser.Types.GameObjects.Text.TextStyle;
    padding?: number;
    alignment?: Alignment;
}

export module CardDescriptionOptions {
    export function DEFAULT(scene: Phaser.Scene): CardDescriptionOptions {
        return {
            x: 0,
            y: 0,
            width: scene.sys.game.scale.gameSize.width,
            height: scene.sys.game.scale.gameSize.height,
            textStyle: {fontFamily: 'Courier', fontSize: '14px', color: '#000000'},
            padding: 0,
            alignment: {horizontal: 'left', vertical: 'top'}
        }
    }
}