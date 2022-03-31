import { Colors } from "../color/colors";

export interface CardImageOptions {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    spriteKey?: string;
    spriteIndex?: number;
    background?: Phaser.Types.GameObjects.Graphics.Styles;
}

export module CardImageOptions {
    export function DEFAULT(scene: Phaser.Scene): CardImageOptions {
        return {
            x: 0,
            y: 0,
            width: scene.sys.game.scale.gameSize.width,
            spriteIndex: 0,
            background: {fillStyle: {color: Colors.secondary}}
        };
    }
}