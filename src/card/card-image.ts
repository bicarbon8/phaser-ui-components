import { CardImageOptions } from "./card-image-options";
import * as _ from 'lodash';

export class CardImage extends Phaser.GameObjects.Container {
    private readonly _options: CardImageOptions;

    private _sprite: Phaser.GameObjects.Sprite;
    private _background: Phaser.GameObjects.Graphics;

    constructor(scene: Phaser.Scene, options?: CardImageOptions) {
        options = _.merge(CardImageOptions.DEFAULT(scene), options);
        super(scene, options.x, options.y);
        this._options = options;
        this._options.height = this._options.height || this._options.width;

        this._createGameObject();
    }

    get sprite(): Phaser.GameObjects.Sprite {
        return _.clone(this._sprite);
    }

    get background(): Phaser.GameObjects.Graphics {
        return _.clone(this._background);
    }

    private _createGameObject(): void {
        this.setSprite(this._options.spriteKey, this._options.spriteIndex);
        this.setBackground(this._options.background);
    }

    setSprite(key?: string, spriteIndex: number = 0): void {
        if (this._sprite) {
            this.remove(this._sprite, true);
        }
        if (key) {
            this._options.spriteKey = key;
            this._options.spriteIndex = spriteIndex;
            const sprite: Phaser.GameObjects.Sprite = new Phaser.GameObjects.Sprite(this.scene, 0, 0, this._options.spriteKey, this._options.spriteIndex);
            this._options.width = this._options.width || sprite.width;
            this._options.height = this._options.height || sprite.height || this._options.width;
            const scaleX: number = this._options.width / sprite.width;
            const scaleY: number = this._options.height / sprite.height;
            const scale: number = (scaleX < scaleY) ? scaleX : scaleY;
            sprite.setScale(scale);
            sprite.setOrigin(0.5);
            this.add(sprite);
            this._sprite = sprite;
        }
        this.setSize(this._options.width, this._options.height);
    }

    setBackground(styles?: Phaser.Types.GameObjects.Graphics.Styles): void {
        if (this._background) {
            this.remove(this._background, true);
        }
        if (styles) {
            this._options.background = styles;
            const background: Phaser.GameObjects.Graphics = new Phaser.GameObjects.Graphics(this.scene, this._options.background);
            if (this._options.background.fillStyle) {
                background.fillRect(-(this.width / 2), -(this.height / 2), this.width, this.height);
            }
            if (this._options.background.lineStyle) {
                background.strokeRect(-(this.width / 2), -(this.height / 2), this.width, this.height);
            }
            this.add(background);
            this.sendToBack(background);
            this._background = background;
        }
    }
}