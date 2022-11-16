import * as _ from 'lodash';
import * as Phaser from 'phaser';
import { Alignment } from '../layout/alignment';
import { LayoutEvents } from '../layout/layout-events';
import { TextButtonOptions } from "./text-button-options";

export class TextButton extends Phaser.GameObjects.Container {
    private _text: Phaser.GameObjects.Text;
    private _background: Phaser.GameObjects.Graphics;

    desiredWidth: number;
    desiredHeight: number;
    padding: number;
    alignment: Alignment;
    cornerRadius: number | Phaser.Types.GameObjects.Graphics.RoundedRectRadius;
    interactive: boolean;

    constructor(scene: Phaser.Scene, options: TextButtonOptions) {
        options = TextButtonOptions.setDefaultOptions(options);
        super(scene, options.x, options.y);

        this.desiredWidth = options.desiredWidth;
        this.desiredHeight = options.desiredHeight;
        this.padding = options.padding;
        this.alignment = options.alignment;
        this.cornerRadius = options.cornerRadius;
        this.interactive = options.interactive;
        
        this.setText(options.text)
            .setBackground(options.background);
        
        if (this.interactive) { this.setInteractive(); }
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
        
        if (config?.text) {
            const txt = this.scene.make.text(config);
            let availableWidth: number = this.scene.sys.game.scale.gameSize.width - (this.padding * 2);
            let availableHeight: number = this.scene.sys.game.scale.gameSize.height - (this.padding * 2);
            if (this.desiredWidth != null) {
                availableWidth = this.desiredWidth - (this.padding * 2);
            }
            if (this.desiredHeight != null) {
                availableHeight = this.desiredHeight - (this.padding * 2);
            }
            if (availableWidth < txt.displayWidth) {
                const scaleX: number = availableWidth / txt.width; // must use actual width for proper scaling of displayWidth
                txt.setScale(scaleX);
            }
            if (availableHeight < txt.displayHeight) {
                const scaleY: number = availableHeight / txt.height; // must use actual height for proper scaling of displayHeight
                txt.setScale(scaleY);
            }
            this.add(txt);
            this._text = txt;
        }
        const width = (this.desiredWidth != null) ? this.desiredWidth : this._text.displayWidth + (this.padding * 2);
        const height = (this.desiredHeight != null) ? this.desiredHeight : this._text.displayHeight + (this.padding * 2);
        this.setSize(width, height);
        
        this.setAlignment(this.alignment);

        this.emit(LayoutEvents.RESIZE, {width: width, height: height});

        return this;
    }

    setAlignment(alignment?: Alignment): TextButton {
        if (alignment) {
            if (this._text) {
                if (this._text.displayWidth < (this.width - (this.padding * 2))) {
                    switch(this.alignment.horizontal) {
                        case 'left':
                            this._text.setX(-(this.width / 2) + this.padding + (this._text.displayWidth / 2));
                            break;
                        case 'right':
                            this._text.setX((this.width / 2) - this.padding - (this._text.displayWidth / 2));
                            break;
                        case 'center':
                        default:
                            this._text.setX(0);
                            break;
                    }
                }
                if (this._text.displayHeight < (this.height - (this.padding * 2))) {
                    switch(this.alignment.vertical) {
                        case 'top':
                            this._text.setY(-(this.height / 2) + this.padding + (this._text.displayHeight / 2));
                            break;
                        case 'bottom':
                            this._text.setY((this.height / 2) - this.padding - (this._text.displayHeight / 2));
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
            const rect = new Phaser.GameObjects.Graphics(this.scene, style);
            if (style.fillStyle) {
                rect.fillRoundedRect(-(this.width / 2), -(this.height / 2), this.width, this.height, this.cornerRadius);
            }
            if (style.lineStyle) {
                rect.strokeRoundedRect(-(this.width / 2), -(this.height / 2), this.width, this.height, this.cornerRadius);
            }
            this.add(rect);
            this.sendToBack(rect);
            this._background = rect;
        }

        return this;
    }
}