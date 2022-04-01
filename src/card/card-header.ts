import { Helpers } from "../utilities/helpers";
import { CardHeaderOptions } from "./card-header-options";

export class CardHeader extends Phaser.GameObjects.Container {
    private readonly _options: CardHeaderOptions;

    private _text: Phaser.GameObjects.Text;
    private _background: Phaser.GameObjects.Graphics;
    
    constructor(scene: Phaser.Scene, options?: CardHeaderOptions) {
        options = Helpers.merge(CardHeaderOptions.DEFAULT(scene), options);
        super(scene, options.x, options.y);
        this._options = options;
        this._createGameObject();
    }

    get padding(): number {
        return this._options.padding;
    }

    get cornerRadius(): number {
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
        this.setBackground(this._options.background);
    }

    setText(text?: string, style?: Phaser.Types.GameObjects.Text.TextStyle): CardHeader {
        if (this._text) {
            this.remove(this._text, true);
            this._text = null;
        }
        if (text) {
            this._options.text = text;
            this._options.textStyle = style || this._options.textStyle;
            const headerText: Phaser.GameObjects.Text = new Phaser.GameObjects.Text(this.scene, 0, 0, text, style);
            headerText.setOrigin(0.5);
            this._options.width = this._options.width || (headerText.width + (this._options.padding * 2));
            this._options.height = this._options.height || (headerText.height + (this._options.padding * 2));
            const availableWidth: number = this._options.width;
            if (availableWidth < (headerText.width + (this._options.padding * 2))) {
                const scaleX: number = availableWidth / (headerText.width + (this._options.padding * 2));
                headerText.setScale(scaleX);
            }
            this._text = headerText;
            this.add(headerText);
        }
        this.setSize(this._options.width, this._options.height);
        return this;
    }

    setBackground(styles?: Phaser.Types.GameObjects.Graphics.Styles): CardHeader {
        if (this._background) {
            this.remove(this._background, true);
        }
        if (styles) {
            const background: Phaser.GameObjects.Graphics = new Phaser.GameObjects.Graphics(this.scene, {
                fillStyle: styles.fillStyle,
                lineStyle: styles.lineStyle
            });
            this._background = background;
            if (styles.fillStyle) {
                background.fillRoundedRect(-(this._options.width / 2), -(this._options.height / 2), this._options.width, this._options.height, {
                    tl: this._options.cornerRadius,
                    tr: this._options.cornerRadius,
                    bl: 0,
                    br: 0
                });
            }
            if (styles.lineStyle) {
                background.strokeRoundedRect(-(this._options.width / 2), -(this._options.height / 2), this._options.width, this._options.height, {
                    tl: this._options.cornerRadius,
                    tr: this._options.cornerRadius,
                    bl: 0,
                    br: 0
                });
            }
            this.add(background);
            this.sendToBack(background);
        }
        return this;
    }
}