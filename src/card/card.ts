import * as _ from "lodash";
import { TextButtonOptions } from "../button/text-button-options";
import { LayoutContent } from "../layout/layout-content";
import { LayoutEvents } from "../layout/layout-events";
import { LinearLayout } from "../layout/linear-layout";
import { LinearLayoutOptions } from "../layout/linear-layout-options";
import { CardBody } from "./card-body";
import { CardBodyOptions } from "./card-body-options";
import { CardHeader } from "./card-header";
import { CardImage } from "./card-image";
import { CardImageOptions } from "./card-image-options";
import { CardOptions } from "./card-options";

export class Card extends LinearLayout {
    private _header: CardHeader;
    private _image: CardImage;
    private _body: CardBody;

    cornerRadius: number | Phaser.Types.GameObjects.Graphics.RoundedRectRadius;
    cardPadding: number;
    
    constructor(scene: Phaser.Scene, options: CardOptions) {
        options = _.merge(CardOptions.DEFAULT(scene), options);
        const opts: LinearLayoutOptions = {
            x: options.x,
            y: options.y,
            orientation: 'vertical',
            desiredWidth: options.desiredWidth,
            desiredHeight: options.desiredHeight
        };
        super(scene, opts);
        this.cornerRadius = options.cornerRadius;
        this.cardPadding = options.padding;
        this.setHeader(options.header);
        this.setImage(options.image);
        this.setCardBody(options.body);
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

    setHeader(options?: TextButtonOptions): Card {
        if (this._header) {
            this.removeContent(this._header, true);
            this._header = null;
        }
        if (options) {
            options.width ??= this.desiredWidth;
            options.cornerRadius ??= this.cornerRadius;
            options.padding ??= this.cardPadding;
            this._header = new CardHeader(this.scene, options);
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
            options.desiredWidth ??= this.desiredWidth;
            this._image = new CardImage(this.scene, options);
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
            options.desiredWidth ??= this.desiredWidth;
            options.cornerRadius ??= this.cornerRadius;
            options.padding ??= this.cardPadding;
            this._body = new CardBody(this.scene, options);
            this._body.on(LayoutEvents.RESIZE, () => {
                this.refreshLayout();
            });
            this.addContents(this._body);
        }
        return this;
    }
}