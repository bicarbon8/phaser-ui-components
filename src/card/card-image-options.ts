export type ImageOptions = {
    key: string;
    index?: number;
};

export type CardImageOptions = {
    x?: number;
    y?: number;
    desiredWidth?: number;
    desiredHeight?: number;
    image?: ImageOptions;
    background?: Phaser.Types.GameObjects.Graphics.Styles;
};

export module CardImageOptions {
    export function getDefaultOptions(): CardImageOptions {
        return {
            x: 0,
            y: 0
        };
    }
}