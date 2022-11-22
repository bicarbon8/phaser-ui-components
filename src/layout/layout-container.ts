import * as _ from "lodash";
import { Alignment } from "./alignment";
import { LayoutContent } from "./layout-content";

export type LayoutContainerOptions = {
    x?: number;
    y?: number;
    desiredWidth?: number;
    desiredHeight?: number;
    padding?: number;
    alignment?: Alignment;
    content?: LayoutContent;
    background?: Phaser.Types.GameObjects.Graphics.Styles;
    cornerRadius?: number | Phaser.Types.GameObjects.Graphics.RoundedRectRadius;
};

export module LayoutContainerOptions {
    export function getDefaultOptions(): LayoutContainerOptions {
        return {
            x: 0,
            y: 0,
            padding: 0,
            alignment: {
                horizontal: "center",
                vertical: "middle"
            },
            cornerRadius: {tl: 0, tr: 0, bl: 0, br: 0}
        }
    }
    export function setDefaultOptions(options: LayoutContainerOptions): LayoutContainerOptions {
        return _.merge(LayoutContainerOptions.getDefaultOptions(), options);
    }
}

export class LayoutContainer extends Phaser.GameObjects.Container {
    public padding: number;
    public alignment: Alignment;
    public cornerRadius: number | Phaser.Types.GameObjects.Graphics.RoundedRectRadius;
    
    private _desiredWidth: number;
    private _desiredHeight: number;
    private _top: number;
    private _bottom: number;
    private _left: number;
    private _right: number;
    private _content: LayoutContent;
    private _background: Phaser.GameObjects.Graphics;
    private _backgroundStyle: Phaser.Types.GameObjects.Graphics.Styles;
    
    constructor(scene: Phaser.Scene, options: LayoutContainerOptions) {
        options = LayoutContainerOptions.setDefaultOptions(options);
        super(scene, options.x, options.y);
        this.padding = options.padding;
        this.alignment = options.alignment;
        this.cornerRadius = options.cornerRadius;
        this._backgroundStyle = options.background;
        this._desiredWidth = options.desiredWidth;
        this._desiredHeight = options.desiredHeight ?? options.desiredWidth;
        this.updateSize(this._desiredWidth, this._desiredHeight);
        this.setContent(options.content);
    }

    get top(): number {
        return this._top;
    }

    get bottom(): number {
        return this._bottom;
    }

    get left(): number {
        return this._left;
    }

    get right(): number {
        return this._right;
    }

    get content(): LayoutContent {
        return this._content;
    }

    contentAs<T extends LayoutContent>(): T {
        return this.content as T;
    }

    /**
     * modifies the size of this `LayoutContainer` and its contents. if no values
     * specified then the content dimensions will determine the size.
     * @param width the new width or null to size based on content
     * @param height the new height or undefined / null to use same value as `width`
     * @returns `this`
     */
    updateSize(width: number, height?: number): this {
        height ??= width;
        if (width != null && height != null) {
            this._desiredWidth = width;
            this._desiredHeight = height;
            this._top = -(height / 2);
            this._bottom = (height / 2);
            this._left = -(width / 2);
            this._right = (width / 2);
            if (this.content) {
                const content = this.removeContent(false);
                this.setContent(content);
            }
        }
        return this;
    }

    /**
     * NOTE: if previous contents were contained within this `LayoutContainer`
     * they will be removed and destroyed. Call `removeContent` first
     * if you wish to retain the object
     * @param content the content to be added to this `LayoutContainer`
     */
    setContent(content: LayoutContent): LayoutContainer {
        if (content) {
            if (this._content) { this.removeContent(true); } // remove previous contents and destroy
            this._content = content;
            this._setContentScale(this._content);
            this._setContentPosition(this._content);
            this.add(this._content);
            this.setBackground(this._backgroundStyle);
        }
        return this;
    }

    removeContent<T extends LayoutContent>(destroy: boolean = true): T {
        if (this._content) {
            const content: T = this.contentAs<T>();
            this.remove(content, destroy);
            this._content = null;
            return content;
        }
        return null;
    }

    setBackground(style?: Phaser.Types.GameObjects.Graphics.Styles): this {
        if (this._background) {
            this.remove(this._background, true);
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

    private _setContentScale(content: LayoutContent): LayoutContainer {
        if (content) {
            const cWidth: number = content.displayWidth;
            const cHeight: number = content.displayHeight;
            let scaleX: number = 1;
            let scaleY: number = 1;
            if (this._desiredWidth) {
                const availableWidth = this._desiredWidth - (this.padding * 2);
                scaleX = availableWidth / cWidth;
            }
            if (this._desiredHeight) {
                const availableHeight = this._desiredHeight - (this.padding * 2);
                scaleY = availableHeight / cHeight;
            }

            if (scaleX < 1 || scaleY < 1) {
                const scale: number = (scaleX < scaleY) ? scaleX : scaleY;
                content.setScale(scale);
            }

            const width = this._desiredWidth ?? cWidth;
            const height = this._desiredHeight ?? cHeight;
            this.setSize(width, height);
        }
        return this;
    }

    private _setContentPosition(content: LayoutContent): LayoutContainer {
        if (content) {
            content.setOrigin?.(0.5);
            const cWidth = content.displayWidth;
            const cHeight = content.displayHeight;
            switch(this.alignment.horizontal) {
                case 'right':
                    content.setX(this.right - this.padding - (cWidth / 2));
                    break;
                case 'left':
                    content.setX(this.left + this.padding + (cWidth / 2));
                    break;
                case 'center':
                default:
                    content.setX(0);
                    break;
            }
            switch(this.alignment.vertical) {
                case 'bottom':
                    content.setY(this.bottom - this.padding - (cHeight / 2));
                    break;
                case 'top':
                    content.setY(this.top + this.padding + (cHeight / 2));
                    break;
                case 'middle':
                default:
                    content.setY(0);
                    break;
            }
        }
        return this;
    }
}