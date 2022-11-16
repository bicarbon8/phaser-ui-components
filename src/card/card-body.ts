import * as _ from "lodash";
import { LayoutContent } from "../layout/layout-content";
import { LayoutEvents } from "../layout/layout-events";
import { LinearLayout } from "../layout/linear-layout";
import { CardBodyOptions } from "./card-body-options";

export class CardBody extends LinearLayout {
    private _background: Phaser.GameObjects.Graphics;

    cornerRadius: number | Phaser.Types.GameObjects.Graphics.RoundedRectRadius;
    backgroundStyle: Phaser.Types.GameObjects.Graphics.Styles;

    constructor(scene: Phaser.Scene, options?: CardBodyOptions) {
        options = CardBodyOptions.setDefaultOptions(options);
        super(scene, options);

        this.cornerRadius = options.cornerRadius;
        this.backgroundStyle = options.background;
        
        this.addContents(...options.contents);
    }

    get background(): Phaser.GameObjects.Graphics {
        return _.clone(this._background);
    }

    override addContents(...contents: LayoutContent[]): void {
        if (contents?.length) {
            super.addContents(...contents);
        }
        this.setBackground(this.backgroundStyle);
    }

    override removeContent(content: LayoutContent, destroy?: boolean): LayoutContent {
        const removed: LayoutContent = super.removeContent(content, destroy);
        if (removed) {
            this.refreshLayout();
            this.setBackground(this.backgroundStyle);
        }
        return removed;
    }

    override removeAllContent(destroy?: boolean): LayoutContent[] {
        const removed: Array<LayoutContent> = super.removeAllContent(destroy);
        this.refreshLayout();
        this.setBackground(this.backgroundStyle);
        return removed;
    }

    setBackground(styles?: Phaser.Types.GameObjects.Graphics.Styles): void {
        this.remove(this._background, true);
        if (styles) {
            const background: Phaser.GameObjects.Graphics = new Phaser.GameObjects.Graphics(this.scene, {
                fillStyle: this.backgroundStyle?.fillStyle,
                lineStyle: this.backgroundStyle?.lineStyle
            });
            this._background = background;
            const width = (this.desiredWidth) ? this.desiredWidth : this.width;
            const height = (this.desiredHeight) ? this.desiredHeight : this.height;
            if (this.backgroundStyle?.fillStyle) {
                background.fillRoundedRect(-(width / 2), -(height / 2), width, height, this.cornerRadius);
            }
            if (this.backgroundStyle?.lineStyle) {
                background.strokeRoundedRect(-(width / 2), -(height / 2), width, height, this.cornerRadius);
            }
            this.add(background);
            this.sendToBack(background);
            this.setSize(width, height);
        }
        this.emit(LayoutEvents.RESIZE, {width: this.width, height: this.height});
    }
}