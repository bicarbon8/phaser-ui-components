import * as Phaser from 'phaser';
import { ButtonStyle } from "./button-style";
import { TextButtonOptions } from "./text-button-options";

export class TextButton extends Phaser.GameObjects.Container {
    private readonly _options: TextButtonOptions;
    private _text: Phaser.GameObjects.Text;
    private _background: Phaser.GameObjects.Graphics;

    constructor(scene: Phaser.Scene, options: TextButtonOptions) {
        super(scene, options.x, options.y);
        this._options = options;
        this._createGameObject(options);
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

    private _createGameObject(options: TextButtonOptions): void {
        this.setText(options.text, options.textSize, options.buttonStyle?.textColor);
        this.setBackground(options.buttonStyle);
        
        if (options.interactive) { this.setInteractive(); }
    }

    setText(text: string, size?: number, color?: string): void {
        if (text) {
            if (this._text) {
                size = size || +this._text.style?.fontSize || 20;
                color = color || this._text.style?.color || '#000000'
                this._text.destroy();
                this._text = null;
            }
            const textStyle: Phaser.Types.GameObjects.Text.TextStyle = { 
                font: `${size || 20}px Courier`, 
                color: color || '#000000',
            };
            const txt = this.scene.add.text(0, 0, text, textStyle);
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
            this.setSize(this._options.width, this._options.height);
        }
    }

    setBackground(style?: ButtonStyle): void {
        if (this._background) {
            this._background.destroy();
            this._background = null;
        }
        
        if (style) {
            const fillStyle: Phaser.Types.GameObjects.Graphics.FillStyle = {
                color: style.backgroundColor
            };
            this._options.width = this._options.width || 0;
            this._options.height = this._options.height || 0;
            this._options.padding = this._options.padding || 0;
            this._options.cornerRadius = this._options.cornerRadius || 0;
            const rect = this.scene.add.graphics({fillStyle: fillStyle});
            if (this._options.cornerRadius > 0) {
                rect.fillRoundedRect(-(this._options.width / 2), -(this._options.height / 2), this._options.width, this._options.height, this._options.cornerRadius);
            } else {
                rect.fillRect(-(this._options.width / 2), -(this._options.height / 2), this._options.width, this._options.height);
            }
            this.add(rect);
            this.sendToBack(rect);
            this._background = rect;
            this.setSize(this._options.width, this._options.height);
        }
    }
}