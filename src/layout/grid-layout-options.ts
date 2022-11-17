import * as _ from "lodash";
import { Alignment } from "./alignment";
import { LayoutContent } from "./layout-content";

export interface GridLayoutOptions {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    rows?: number;
    columns?: number;
    alignment?: Alignment;
    padding?: number;
    background?: Phaser.Types.GameObjects.Graphics.Styles;
    cornerRadius?: number | Phaser.Types.GameObjects.Graphics.RoundedRectRadius;
    contents?: Array<LayoutContent[]>
}

export module GridLayoutOptions {
    export function getDefaultOptions(): GridLayoutOptions {
        return {
            x: 0,
            y: 0,
            rows: 12,
            columns: 12,
            alignment: {horizontal: 'center', vertical: 'middle'},
            padding: 0,
            cornerRadius: {tr: 0, tl: 0, br: 0, bl: 0}
        };
    }
    export function setDefaultOptions(options: GridLayoutOptions): GridLayoutOptions {
        return _.merge(GridLayoutOptions.getDefaultOptions(), options);
    }
}