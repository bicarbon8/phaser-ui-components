import { Alignment } from "./alignment";
import { LayoutContent } from "./layout-content";

export interface FlexLayoutOptions {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    padding?: number;
    alignment?: Alignment;
    contents?: LayoutContent[];
}

export module FlexLayoutOptions {
    export function DEFAULT(scene: Phaser.Scene): FlexLayoutOptions {
        return {
            x: 0,
            y: 0,
            width: scene.sys.game.scale.gameSize.width,
            height: scene.sys.game.scale.gameSize.height,
            padding: 0,
            alignment: {horizontal: 'center', vertical: 'middle'},
            contents: []
        };
    }
}