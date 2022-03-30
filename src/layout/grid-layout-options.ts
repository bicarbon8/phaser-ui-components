export interface GridLayoutOptions {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    rows?: number;
    columns?: number;
    margins?: number;
    padding?: number;
}

export module GridLayoutOptions {
    export function DEFAULT(scene: Phaser.Scene): GridLayoutOptions {
        return {
            x: 0,
            y: 0,
            width: scene.sys.game.scale.gameSize.width,
            height: scene.sys.game.scale.gameSize.height,
            rows: 12,
            columns: 12,
            padding: 0,
            margins: 0
        };
    }
}