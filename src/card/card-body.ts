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
        const contents = options.contents ?? new Array<LayoutContent>();
        options.contents = new Array<LayoutContent>();
        super(scene, options);

        this.cornerRadius = (typeof options.cornerRadius === 'number') ? 
            {tr: 0, tl: 0, br: options.cornerRadius, bl: options.cornerRadius} : 
            {tr: 0, tl: 0, br: options.cornerRadius.br, bl: options.cornerRadius.bl};
        this.backgroundStyle = options.background;
        
        this.addContents(...contents);
    }

    get background(): Phaser.GameObjects.Graphics {
        return _.clone(this._background);
    }

    override addContents(...contents: LayoutContent[]): void {
        super.addContents(...contents);
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
        if (this._background) {
            this.backgroundStyle = null;
            this.remove(this._background, true);
        }
        const width = this.desiredWidth ?? this.width;
        const height = this.desiredHeight ?? this.height;
        if (styles) {
            this.backgroundStyle = styles;
            const background: Phaser.GameObjects.Graphics = new Phaser.GameObjects.Graphics(this.scene, {
                fillStyle: this.backgroundStyle?.fillStyle,
                lineStyle: this.backgroundStyle?.lineStyle
            });
            this._background = background;
            if (this.backgroundStyle?.fillStyle) {
                background.fillRoundedRect(-(width / 2), -(height / 2), width, height, this.cornerRadius);
            }
            if (this.backgroundStyle?.lineStyle) {
                background.strokeRoundedRect(-(width / 2), -(height / 2), width, height, this.cornerRadius);
            }
            this.add(background);
            this.sendToBack(background);
        }
        this.setSize(width, height);
        this.emit(LayoutEvents.RESIZE, {width: this.width, height: this.height});
    }
}