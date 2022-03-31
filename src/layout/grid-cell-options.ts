import { Alignment } from "./alignment";
import { LayoutContent } from "./layout-content";

export interface GridCellOptions {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    row?: number;
    column?: number;
    padding?: number;
    alignment?: Alignment;
    scaleToFit?: boolean;
    keepAspectRatio?: boolean;
    background?: Phaser.Types.GameObjects.Graphics.Styles,
    content?: LayoutContent;
}

export module GridCellOptions {
    export function DEFAULT(): GridCellOptions {
        return {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            row: 0,
            column: 0,
            padding: 0,
            alignment: {
                horizontal: "center",
                vertical: "middle"
            },
            scaleToFit: true,
            keepAspectRatio: true
            // no background
            // no content
        }
    }
}