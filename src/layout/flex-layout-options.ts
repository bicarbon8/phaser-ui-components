import { LayoutContent } from "./layout-content";

export interface FlexLayoutOptions {
    x?: number;
    y?: number;
    width?: number;
    padding?: number;
    contents?: LayoutContent[];
}

export module FlexLayoutOptions {
    export function DEFAULT(scene: Phaser.Scene): FlexLayoutOptions {
        return {
            x: 0,
            y: 0,
            width: scene.sys.game.scale.gameSize.width,
            padding: 0,
            contents: []
        };
    }
}