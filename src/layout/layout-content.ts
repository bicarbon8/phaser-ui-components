/**
 * allows the use of `Phaser.GameObjects.GameObject` while possibly supporting
 * layout functions and fields
 */
export type LayoutContent = Phaser.GameObjects.GameObject & {
    setOrigin?: (originX: number, originY?: number) => void;
    setPosition?: (x: number, y: number) => void;
    setX?: (x: number) => void;
    setY?: (y: number) => void;
    displayWidth?: number;
    displayHeight?: number;
    width?: number;
    height?: number;
    setScale?: (scaleX: number, scaleY?: number) => void;
    scaleX?: number;
    scaleY?: number;
};