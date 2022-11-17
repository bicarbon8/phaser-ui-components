import { CardImageOptions } from "./card-image-options";
import * as _ from 'lodash';
import { LayoutEvents } from "../layout/layout-events";

export class CardImage extends Phaser.GameObjects.Container {
    private _img: Phaser.GameObjects.Sprite | Phaser.GameObjects.Image;
    private _background: Phaser.GameObjects.Graphics;

    desiredWidth: number;
    desiredHeight: number;

    constructor(scene: Phaser.Scene, options: CardImageOptions) {
        options = _.merge(CardImageOptions.getDefaultOptions(), options);
        super(scene, options.x, options.y);
        
        this.desiredWidth = options.desiredWidth;
        this.desiredHeight = options.desiredHeight;

        this.setImage(options.image);
        this.setBackground(options.background);
    }

    get sprite(): Phaser.GameObjects.Sprite | Phaser.GameObjects.Image {
        return _.clone(this._img);
    }

    get background(): Phaser.GameObjects.Graphics {
        return _.clone(this._background);
    }

    setImage(options?: {key: string, index?: number}): void {
        if (this._img) {
            this.remove(this._img, true);
        }
        if (options) {
            let img
            if (options.index != null) {
                img = new Phaser.GameObjects.Sprite(this.scene, 0, 0, options.key, options.index);
            } else {
                img = new Phaser.GameObjects.Image(this.scene, 0, 0, options.key);
            }
            const scaleX: number = (this.desiredWidth) ? this.desiredWidth / img.width : 1;
            const scaleY: number = (this.desiredHeight) ? this.desiredHeight / img.height : 1;
            const scale: number = (scaleX < scaleY) ? scaleX : scaleY;
            img.setScale(scale);
            img.setOrigin(0.5);
            this.add(img);
            this._img = img;
        }
        const width = this.desiredWidth ?? this._img?.displayWidth ?? 0;
        const height = this.desiredHeight ?? this._img?.displayHeight ?? this.desiredWidth ?? 0;
        this.setSize(width, height);

        this.emit(LayoutEvents.RESIZE, {width: width, height: height});
    }

    setBackground(styles?: Phaser.Types.GameObjects.Graphics.Styles): void {
        if (this._background) {
            this.remove(this._background, true);
        }
        if (styles) {
            const background: Phaser.GameObjects.Graphics = new Phaser.GameObjects.Graphics(this.scene, styles);
            if (styles.fillStyle) {
                background.fillRect(-(this.width / 2), -(this.height / 2), this.width, this.height);
            }
            if (styles.lineStyle) {
                background.strokeRect(-(this.width / 2), -(this.height / 2), this.width, this.height);
            }
            this.add(background);
            this.sendToBack(background);
            this._background = background;
        }
    }
}