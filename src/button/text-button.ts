import * as Phaser from 'phaser';
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

    get text(): Phaser.GameObjects.Text {
        return this._text;
    }

    get background(): Phaser.GameObjects.Graphics {
        return this._background;
    }

    private _createGameObject(): void {
        this.setText(this._options.text, this._options.textStyle);
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
            const txt = this.scene.add.text(0, 0, text, this._options.textStyle);
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

    setBackground(style?: Phaser.Types.GameObjects.Graphics.Styles): void {
        if (this._background) {
            this._background.destroy();
            this._background = null;
        }
        
        if (style) {
            this._options.background = style;
            this._options.width = this._options.width || 0;
            this._options.height = this._options.height || 0;
            const rect = this.scene.add.graphics(this._options.background);
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