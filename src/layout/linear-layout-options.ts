import { Alignment } from "./alignment";
import { LayoutContent } from "./layout-content";

export type LinearLayoutOptions = {
    x?: number;
    y?: number;
    desiredWidth?: number;
    desiredHeight?: number;
    orientation?: 'vertical' | 'horizontal';
    padding?: number;
    alignment?: Alignment;
    contents?: LayoutContent[];
}

export module LinearLayoutOptions {
    export function getDefaultOptions(): LinearLayoutOptions {
        return {
            x: 0,
            y: 0,
            orientation: 'horizontal',
            padding: 0,
            alignment: {horizontal: 'center', vertical: 'middle'},
            contents: new Array<LayoutContent>()
        };
    }
}