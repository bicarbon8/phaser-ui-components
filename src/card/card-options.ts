import { TextButtonOptions } from "../button/text-button-options";
import { CardBodyOptions } from "./card-body-options";
import { CardImageOptions } from "./card-image-options";

export interface CardOptions {
    x?: number;
    y?: number;
    width?: number;
    cornerRadius?: number;
    padding?: number;
    header?: TextButtonOptions;
    image?: CardImageOptions;
    body?: CardBodyOptions;
}

export module CardOptions {
    export function DEFAULT(scene: Phaser.Scene): CardOptions {
        return {
            x: 0,
            y: 0,
            width: scene.sys.game.scale.gameSize.width,
            cornerRadius: 0,
            padding: 0
        };
    }
}