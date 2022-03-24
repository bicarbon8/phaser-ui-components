import { Helpers } from "../utilities/helpers";
import { TextButton } from "../button/text-button";
import { TextButtonOptions } from "../button/text-button-options";
import { LayoutContent } from "../layout/layout-content";
import { LayoutManager } from "../layout/layout-manager";
import { LayoutManagerOptions } from "../layout/layout-manager-options";
import { CardBody } from "./card-body";
import { CardBodyOptions } from "./card-body-options";
import { CardHeader } from "./card-header";
import { CardHeaderOptions } from "./card-header-options";
import { CardImage } from "./card-image";
import { CardImageOptions } from "./card-image-options";
import { CardOptions } from "./card-options";

export class Card extends LayoutManager {
    private readonly _options: CardOptions;
    private _header: CardHeader;
    private _image: CardImage;
    private _body: CardBody;

    constructor(scene: Phaser.Scene, options: CardOptions) {
        const opts: LayoutManagerOptions = {
            x: options.x,
            y: options.y,
            orientation: 'vertical'
        }
        super(scene, opts);
        this._options = options;
        this._createGameObject();
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
            this.layout();
        }
    }

    removeHeaderText(destroy: boolean = true): Phaser.GameObjects.Text {
        return this.header?.removeText(destroy);
    }

    removeHeader(destroy: boolean = true): CardHeader {
        const header: CardHeader = this.removeContent(this.header, destroy) as CardHeader;
        this._header = null;
        this.layout();
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
        this.layout();
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
            this.layout();
        }
    }

    removeBodyTitle(destroy: boolean = true): LayoutContent {
        const title: LayoutContent = this.cardbody?.removeTitle(destroy);
        this.layout();
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
            this.layout();
        }
    }

    removeBodyDescription(destroy: boolean = true): LayoutContent {
        const desc: LayoutContent = this.cardbody?.removeDescription(destroy);
        this.layout();
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
            this.layout();
        }
    }

    removeBodyButtons(destroy: boolean = true): TextButton[] {
        const buttons: TextButton[] = this.cardbody.removeAllButtons(destroy);
        this.layout();
        return buttons;
    }

    removeCardBody(destroy: boolean = true): CardBody {
        const body: CardBody = this.removeContent(this.cardbody, destroy) as CardBody;
        this._body = null;
        this.layout();
        return body;
    }

    private _createGameObject(): void {
        this._createHeaderObject(this._options.header);
        this._createImageObject(this._options.image);
        this._createCardBodyObject(this._options.body);
    }

    private _createHeaderObject(options?: CardHeaderOptions): void {
        if (options) {
            options.width = options.width || this._options.width;
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
            this._body = new CardBody(this.scene, options);
            this._options.width = this._options.width || this._body.width;
            this.addContents(this._body);
        }
    }
}