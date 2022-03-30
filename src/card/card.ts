import { TextButton } from "../button/text-button";
import { TextButtonOptions } from "../button/text-button-options";
import { LayoutContent } from "../layout/layout-content";
import { LinearLayout } from "../layout/linear-layout";
import { LinearLayoutOptions } from "../layout/linear-layout-options";
import { Helpers } from "../utilities/helpers";
import { CardBody } from "./card-body";
import { CardBodyOptions } from "./card-body-options";
import { CardHeader } from "./card-header";
import { CardHeaderOptions } from "./card-header-options";
import { CardImage } from "./card-image";
import { CardImageOptions } from "./card-image-options";
import { CardOptions } from "./card-options";

export class Card extends LinearLayout {
    private readonly _options: CardOptions;

    private _background: Phaser.GameObjects.Graphics;
    private _header: CardHeader;
    private _image: CardImage;
    private _body: CardBody;

    constructor(scene: Phaser.Scene, options?: CardOptions) {
        options = Helpers.merge(CardOptions.DEFAULT(scene), options);
        const opts: LinearLayoutOptions = {
            x: options.x,
            y: options.y,
            orientation: 'vertical'
        }
        super(scene, opts);
        this._options = options;
        this._createGameObject();
    }

    get background(): Phaser.GameObjects.Graphics {
        return this._background;
    }

    get header(): CardHeader {
        return this._header;
    }

    get image(): CardImage {
        return this._image;
    }

    get cardbody(): CardBody {
        return this._body;
    }

    updateHeaderText(text: string, style?: Phaser.Types.GameObjects.Text.TextStyle): void {
        if (text) {
            if (this.header) {
                this.header.updateText(text, style);
            } else {
                this._options.header = {
                    text: text,
                    textStyle: style
                };
                this._createHeaderObject(this._options.header);
            }
            this.refreshLayout();
            this._createBackground(this._options.background);
        }
    }

    removeHeaderText(destroy: boolean = true): Phaser.GameObjects.Text {
        return this.header?.removeText(destroy);
    }

    removeHeader(destroy: boolean = true): CardHeader {
        const header: CardHeader = this.removeContent(this.header, destroy) as CardHeader;
        this._header = null;
        this._createBackground(this._options.background);
        return header;
    }

    updateImage(key: string): void {
        if (this.image) {
            // TODO
        }
    }

    removeImage(destroy: boolean = true): CardImage {
        const image: CardImage = this.removeContent(this.image, destroy) as CardImage;
        this._image = null;
        this._createBackground(this._options.background);
        return image;
    }

    updateBodyTitle(title?: string, style?: Phaser.Types.GameObjects.Text.TextStyle): void {
        if (title) {
            if (this.cardbody) {
                this.cardbody.updateTitle(title, style);
            } else {
                this._options.body = {
                    title: title,
                    titleStyle: style
                };
                this._createCardBodyObject(this._options.body);
            }
            this.refreshLayout();
            this._createBackground(this._options.background);
        }
    }

    removeBodyTitle(destroy: boolean = true): LayoutContent {
        const title: LayoutContent = this.cardbody?.removeTitle(destroy);
        this.refreshLayout();
        this._createBackground(this._options.background);
        return title;
    }

    updateBodyDescription(description?: string, style?: Phaser.Types.GameObjects.Text.TextStyle): void {
        if (description) {
            if (this.cardbody) {
                this.cardbody.updateDescription(description, style);
            } else {
                this._options.body = {
                    description: description,
                    descriptionStyle: style
                };
                this._createCardBodyObject(this._options.body);
            }
            this.refreshLayout();
            this._createBackground(this._options.background);
        }
    }

    removeBodyDescription(destroy: boolean = true): LayoutContent {
        const desc: LayoutContent = this.cardbody?.removeDescription(destroy);
        this.refreshLayout();
        this._createBackground(this._options.background);
        return desc;
    }

    addBodyButtons(...buttonOptions: TextButtonOptions[]): void {
        if (buttonOptions?.length) {
            if (this.cardbody) {
                this.cardbody.addButtons(...buttonOptions);
            } else {
                this._options.body = {
                    buttons: buttonOptions
                };
                this._createCardBodyObject(this._options.body);
            }
            this.refreshLayout();
            this._createBackground(this._options.background);
        }
    }

    removeBodyButtons(destroy: boolean = true): TextButton[] {
        const buttons: TextButton[] = this.cardbody.removeAllButtons(destroy);
        this.refreshLayout();
        this._createBackground(this._options.background);
        return buttons;
    }

    removeCardBody(destroy: boolean = true): CardBody {
        const body: CardBody = this.removeContent(this.cardbody, destroy) as CardBody;
        this._body = null;
        this._createBackground(this._options.background);
        return body;
    }

    private _createGameObject(): void {
        this._createHeaderObject(this._options.header);
        this._createImageObject(this._options.image);
        this._createCardBodyObject(this._options.body);
        this._createBackground(this._options.background);
    }

    private _createHeaderObject(options?: CardHeaderOptions): void {
        if (options) {
            options.width = options.width || this._options.width;
            options.cornerRadius = options.cornerRadius || this._options.cornerRadius;
            options.padding = options.padding || this._options.padding;
            this._header = new CardHeader(this.scene, options);
            this._options.width = this._options.width || this._header.width;
            this.addContents(this._header);
        }
    }

    private _createImageObject(options?: CardImageOptions): void {
        if (options) {
            options.width = options.width || this._options.width;
            this._image = new CardImage(this.scene, options);
            this._options.width = this._options.width || this._image.width;
            this.addContents(this._image);
        }
    }

    private _createCardBodyObject(options: CardBodyOptions): void {
        if (options) {
            options.width = options.width || this._options.width;
            options.cornerRadius = options.cornerRadius || this._options.cornerRadius;
            options.padding = options.padding || this._options.padding;
            this._body = new CardBody(this.scene, options);
            this._options.width = this._options.width || this._body.width;
            this.addContents(this._body);
        }
    }

    private _createBackground(styles: Phaser.Types.GameObjects.Graphics.Styles): void {
        if (this._background) {
            this.remove(this._background, true);
        }
        if (styles) {
            this._options.background = styles;
            this._background = new Phaser.GameObjects.Graphics(this.scene, {
                fillStyle: styles.fillStyle,
                lineStyle: styles.lineStyle
            });
            const cornerRadius: number = this._options.cornerRadius;
            if (cornerRadius > 0) {
                if (styles.fillStyle) {
                    this._background.fillRoundedRect(this.x - (this.width / 2), this.y - (this.height / 2), this.width, this.height, cornerRadius);
                }
                if (styles.lineStyle) {
                    this._background.strokeRoundedRect(this.x - (this.width / 2), this.y - (this.height / 2), this.width, this.height, cornerRadius);
                }
            } else {
                if (styles.fillStyle) {
                    this._background.fillRect(this.x - (this.width / 2), this.y - (this.height / 2), this.width, this.height);
                }
                if (styles.lineStyle) {
                    this._background.strokeRect(this.x - (this.width / 2), this.y - (this.height / 2), this.width, this.height);
                }
            }

            this.add(this._background);
            this.sendToBack(this._background);
        }
    }
}