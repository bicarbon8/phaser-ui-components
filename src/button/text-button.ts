import * as _ from 'lodash';
import * as Phaser from 'phaser';
import { Alignment } from '../layout/alignment';
import { TextButtonOptions } from "./text-button-options";

export class TextButton extends Phaser.GameObjects.Container {
    private readonly _options: TextButtonOptions;
    private _text: Phaser.GameObjects.Text;
    private _background: Phaser.GameObjects.Graphics;

    constructor(scene: Phaser.Scene, options?: TextButtonOptions) {
        options = _.merge(TextButtonOptions.DEFAULT(), options);
        super(scene, options.x, options.y);
        this._options = options;
        
        this.setText(this._options.text)
            .setAlignment(this._options.alignment)
            .setBackground(this._options.background);
        
        if (this._options.interactive) { this.setInteractive(); }
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
        return _.clone(this._options.cornerRadius);
    }

    get text(): Phaser.GameObjects.Text {
        return _.clone(this._text);
    }

    get background(): Phaser.GameObjects.Graphics {
        return _.clone(this._background);
    }

    setText(config?: Phaser.Types.GameObjects.Text.TextConfig): TextButton {
        if (this._text) {
            this._text.destroy();
            this._text = null;
        }
        
        if (config?.text || (this._options.text && config?.style)) {
            this._options.text = _.merge(TextButtonOptions.DEFAULT().text, this._options.text, config);
            const txt = this.scene.make.text(this._options.text);
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

        return this;
    }

    setAlignment(alignment?: Alignment): TextButton {
        if (alignment) {
            this._options.alignment = _.merge(TextButtonOptions.DEFAULT().alignment, this._options.alignment, alignment);
            if (this._text) {
                if (this._text.displayWidth < (this.width - (this._options.padding * 2))) {
                    switch(this._options.alignment.horizontal) {
                        case 'left':
                            this._text.setX(-(this.width / 2) + this._options.padding + (this._text.displayWidth / 2));
                            break;
                        case 'right':
                            this._text.setX((this.width / 2) - this._options.padding - (this._text.displayWidth / 2));
                            break;
                        case 'center':
                        default:
                            this._text.setX(0);
                            break;
                    }
                }
                if (this._text.displayHeight < (this.height - (this._options.padding * 2))) {
                    switch(this._options.alignment.vertical) {
                        case 'top':
                            this._text.setY(-(this.height / 2) + this._options.padding + (this._text.displayHeight / 2));
                            break;
                        case 'bottom':
                            this._text.setY((this.height / 2) - this._options.padding - (this._text.displayHeight / 2));
                            break;
                        case 'middle':
                        default:
                            this._text.setY(0);
                            break;
                    }
                }
            }
        }

        return this;
    }

    setBackground(style?: Phaser.Types.GameObjects.Graphics.Styles): TextButton {
        if (this._background) {
            this._background.destroy();
            this._background = null;
        }
        
        if (style) {
            this._options.background = _.merge(TextButtonOptions.DEFAULT().background, style);
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

        return this;
    }
}