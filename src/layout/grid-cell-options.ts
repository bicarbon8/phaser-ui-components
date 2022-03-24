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
    style?: Phaser.Types.GameObjects.Graphics.Styles,
    content?: LayoutContent;
}