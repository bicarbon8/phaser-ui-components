import { Alignment } from "./alignment";
import { LayoutContent } from "./layout-content";

export interface LinearLayoutOptions {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    orientation?: 'vertical' | 'horizontal';
    padding?: number;
    alignment?: Alignment;
    contents?: LayoutContent[];
}

export module LinearLayoutOptions {
    export function DEFAULT(scene: Phaser.Scene): LinearLayoutOptions {
        return {
            x: 0,
            y: 0,
            width: scene.sys.game.scale.gameSize.width,
            height: scene.sys.game.scale.gameSize.height,
            orientation: 'horizontal',
            padding: 0,
            alignment: {horizontal: 'center', vertical: 'middle'},
            contents: []
        };
    }
}