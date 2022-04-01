import * as Phaser from 'phaser';
import { Alignment } from '../layout/alignment';
import { Helpers } from '../utilities/helpers';
import { TextButtonOptions } from "./text-button-options";

export class TextButton extends Phaser.GameObjects.Container {
    private readonly _options: TextButtonOptions;
    private _text: Phaser.GameObjects.Text;
    private _background: Phaser.GameObjects.Graphics;

    constructor(scene: Phaser.Scene, options?: TextButtonOptions) {
        options = Helpers.merge(TextButtonOptions.DEFAULT(), options);
        super(scene, options.x, options.y);
        this._options = options;
        this._createGameObject();
    }

    get left(): number {
        return this.x - (this.width / 2);
    }

    get right(): number {
        return this.x + (this.width / 2);
    }

    get top(): number {
        return this.y - (this.height / 2);
    }

    get bottom(): number {
        return this.y + (this.height / 2);
    }

    get padding(): number {
        return this._options.padding;
    }

    get cornerRadius(): number | Phaser.Types.GameObjects.Graphics.RoundedRectRadius {
        return this._options.cornerRadius;
    }

    get text(): Phaser.GameObjects.Text {
        return this._text;
    }

    get background(): Phaser.GameObjects.Graphics {
        return this._background;
    }

    private _createGameObject(): void {
        this.setText(this._options.text, this._options.textStyle);
        this.setAlignment(this._options.alignment);
        this.setBackground(this._options.background);
        
        if (this._options.interactive) { this.setInteractive(); }
    }

    setText(text?: string, style?: Phaser.Types.GameObjects.Text.TextStyle): void {
        if (this._text) {
            this._text.destroy();
            this._text = null;
        }
        
        if (text) {
            this._options.textStyle = style || this._options.textStyle;
            const txt = new Phaser.GameObjects.Text(this.scene, 0, 0, text, this._options.textStyle);
            txt.setOrigin(0.5);
            this._options.padding = this._options.padding || 0;
            this._options.width = this._options.width || txt.width + (this._options.padding * 2);
            this._options.height = this._options.height || txt.height + (this._options.padding * 2);
            if (this._options.width < ((this._options.padding * 2) + txt.width)) {
                const scaleX: number = this._options.width / ((this._options.padding * 2) + txt.width);
                txt.setScale(scaleX);
            }
            this.add(txt);
            this._text = txt;
        }

        this.setSize(this._options.width, this._options.height);
    }

    setAlignment(alignment?: Alignment): void {
        if (alignment) {
            this._options.alignment = Helpers.merge(TextButtonOptions.DEFAULT(), {alignment: alignment}).alignment;
            if (this._text) {
                if (this.text.displayWidth < (this.width - (this._options.padding * 2))) {
                    switch(this._options.alignment.horizontal) {
                        case 'left':
                            this.text.setX(-(this.width / 2) + this._options.padding + (this.text.displayWidth / 2));
                            break;
                        case 'right':
                            this.text.setX((this.width / 2) - this._options.padding - (this.text.displayWidth / 2));
                            break;
                        case 'center':
                        default:
                            this.text.setX(0);
                            break;
                    }
                }
                if (this.text.displayHeight < (this.height - (this._options.padding * 2))) {
                    switch(this._options.alignment.vertical) {
                        case 'top':
                            this.text.setY(-(this.height / 2) + this._options.padding + (this.text.displayHeight / 2));
                            break;
                        case 'bottom':
                            this.text.setY((this.height / 2) - this._options.padding - (this.text.displayHeight / 2));
                            break;
                        case 'middle':
                        default:
                            this.text.setY(0);
                            break;
                    }
                }
            }
        }
    }

    setBackground(style?: Phaser.Types.GameObjects.Graphics.Styles): void {
        if (this._background) {
            this._background.destroy();
            this._background = null;
        }
        
        if (style) {
            this._options.background = style;
            this._options.width = this._options.width || 0;
            this._options.height = this._options.height || 0;
            const rect = new Phaser.GameObjects.Graphics(this.scene, this._options.background);
            if (this._options.background.fillStyle) {
                rect.fillRoundedRect(-(this._options.width / 2), -(this._options.height / 2), this._options.width, this._options.height, this._options.cornerRadius);
            }
            if (this._options.background.lineStyle) {
                rect.strokeRoundedRect(-(this._options.width / 2), -(this._options.height / 2), this._options.width, this._options.height, this._options.cornerRadius);
            }
            this.add(rect);
            this.sendToBack(rect);
            this._background = rect;
        }

        this.setSize(this._options.width, this._options.height);
    }
}