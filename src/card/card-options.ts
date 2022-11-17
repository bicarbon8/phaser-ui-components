import { TextButtonOptions } from "../button/text-button-options";
import { LinearLayoutOptions } from "../layout/linear-layout-options";
import { CardBodyOptions } from "./card-body-options";
import { CardImageOptions } from "./card-image-options";

export type CardOptions = Omit<LinearLayoutOptions, 'contents'> & {
    cornerRadius?: number | Phaser.Types.GameObjects.Graphics.RoundedRectRadius;
    header?: TextButtonOptions;
    image?: CardImageOptions;
    body?: CardBodyOptions;
}

export module CardOptions {
    export function DEFAULT(scene: Phaser.Scene): CardOptions {
        return {
            x: 0,
            y: 0,
            cornerRadius: {tr: 0, tl: 0, br: 0, bl: 0},
            padding: 0
        };
    }
}