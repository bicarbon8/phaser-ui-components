import { LayoutContent } from "./layout-content";

export interface LinearLayoutOptions {
    x?: number;
    y?: number;
    orientation?: 'vertical' | 'horizontal';
    padding?: number;
    contents?: LayoutContent[];
}

export module LinearLayoutOptions {
    export function DEFAULT(): LinearLayoutOptions {
        return {
            x: 0,
            y: 0,
            orientation: 'horizontal',
            padding: 0,
            contents: []
        };
    }
}