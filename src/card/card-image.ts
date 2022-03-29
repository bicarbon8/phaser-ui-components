import { CardImageOptions } from "./card-image-options";

export class CardImage extends Phaser.GameObjects.Container {
    private readonly _options: CardImageOptions;

    private _sprite: Phaser.GameObjects.Sprite;
    private _background: Phaser.GameObjects.Graphics;

    constructor(scene: Phaser.Scene, options?: CardImageOptions) {
        super(scene, options?.x, options?.y);
        this._options = options || {};

        this._createGameObject();
    }

    get sprite(): Phaser.GameObjects.Sprite {
        return this._sprite;
    }

    get background(): Phaser.GameObjects.Graphics {
        return this._background;
    }

    private _createGameObject(): void {
        this._createSprite();
        this._createBackground();
    }

    private _createSprite(): void {
        const key: string = this._options.spriteKey;
        if (key) {
            const index: number = this._options.spriteIndex || 0;
            const sprite: Phaser.GameObjects.Sprite = this.scene.add.sprite(0, 0, key, index);
            this._options.width = this._options.width || sprite.width;
            this._options.height = this._options.height || sprite.height || this._options.width;
            const scaleX: number = this._options.width / sprite.width;
            const scaleY: number = this._options.height / sprite.height;
            const scale: number = (scaleX < scaleY) ? scaleX : scaleY;
            sprite.setScale(scale);
            sprite.setOrigin(0.5);
            this.add(sprite);
            this._sprite = sprite;

            this.setSize(this._options.width, this._options.height);
        }
    }

    private _createBackground(): void {
        const bg: Phaser.Types.GameObjects.Graphics.Styles = this._options.background;
        if (bg) {
            this._options.width = this._options.width || 0;
            this._options.height = this._options.height || this._options.width;
            const background: Phaser.GameObjects.Graphics = this.scene.add.graphics(bg);
            if (this._options.background.fillStyle) {
                background.fillRect(-(this._options.width / 2), -(this._options.height / 2), this._options.width, this._options.height);
            }
            if (this._options.background.lineStyle) {
                background.strokeRect(-(this._options.width / 2), -(this._options.height / 2), this._options.width, this._options.height);
            }
            this.add(background);
            this.sendToBack(background);
            this._background = background;

            this.setSize(this._options.width, this._options.height);
        }
    }
}