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
    private readonly _opts: CardOptions;

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
        this._opts = options;
        this.setHeader(this._opts.header);
        this.setImage(this._opts.image);
        this.setCardBody(this._opts.body);
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

    setHeader(options?: CardHeaderOptions): Card {
        if (this._header) {
            this.removeContent(this._header, true);
            this._header = null;
        }
        if (options) {
            this._opts.header = options;
            options.width = options.width || this._opts.width;
            options.cornerRadius = options.cornerRadius || this._opts.cornerRadius;
            options.padding = options.padding || this._opts.padding;
            this._header = new CardHeader(this.scene, options);
            this._opts.width = this._opts.width || this._header.width;
            const contents: LayoutContent[] = this.removeAllContent(false);
            this.addContents(this._header, ...contents);
        }
        return this;
    }

    setImage(options?: CardImageOptions): Card {
        if (this._image) {
            this.removeContent(this._image, true);
            this._image = null;
        }
        if (options) {
            this._opts.image = options;
            options.width = options.width || this._opts.width;
            this._image = new CardImage(this.scene, options);
            this._opts.width = this._opts.width || this._image.width;
            const contents: LayoutContent[] = [];
            if (this.header) { contents.push(this.removeContent(this._header, false)); }
            contents.push(this._image);
            if (this.cardbody) { contents.push(this.removeContent(this._body, false)); }
            this.addContents(...contents);
        }
        return this;
    }

    setCardBody(options?: CardBodyOptions): Card {
        if (this._body) {
            this.removeContent(this._body, true);
            this._body = null;
        }
        if (options) {
            this._opts.body = options;
            options.width = options.width || this._opts.width;
            options.cornerRadius = options.cornerRadius || this._opts.cornerRadius;
            options.padding = options.padding || this._opts.padding;
            this._body = new CardBody(this.scene, options);
            this._opts.width = this._opts.width || this._body.width;
            this.addContents(this._body);
        }
        return this;
    }
}