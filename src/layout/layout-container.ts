import * as _ from "lodash";
import { Alignment } from "./alignment";
import { LayoutContent } from "./layout-content";
import { LayoutEvents } from "./layout-events";

export type LayoutContainerOptions = {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
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

        this.updateSize(options.width, options.height)
            .setContent(options.content);
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

    get backgroundConfig(): Phaser.Types.GameObjects.Graphics.Styles {
        return this._backgroundStyle;
    }

    /**
     * returns the `Phaser.GameObjects.Graphics` object used to create a 
     * background for this `LayoutContainer`
     * 
     * **WARNING!** this SHOULD NOT be modified directly. use the 
     * `LayoutContainer.setBackground(config)` function instead
     */
    get background(): Phaser.GameObjects.Graphics {
        return this._background;
    }

    /**
     * modifies the size of this `LayoutContainer` and its contents. if no values
     * specified then the content dimensions will determine the size.
     * @param width the new width or undefined to size based on content
     * @param height the new height or undefined / null to use same value as `width`
     * @returns `this`
     */
    updateSize(width?: number, height?: number): this {
        this._desiredWidth = width;
        this._desiredHeight = height;
        if (this._desiredWidth != null && this._desiredHeight != null) {
            if (this._desiredWidth !== this.width || this._desiredHeight !== this.height) {
                this.setSize(width, height);
                this.emit(LayoutEvents.RESIZE, {width: this.width, height: this.height});
            }
        }

        this._setContentScale();
        this._updateBounds();
        this._setContentPosition();
        this.setBackground(this._backgroundStyle);

        return this;
    }

    /**
     * NOTE: if previous contents were contained within this `LayoutContainer`
     * they will be removed and destroyed. Call `removeContent` first
     * if you wish to retain the object
     * @param content the content to be added to this `LayoutContainer`
     */
    setContent(content: LayoutContent): this {
        if (content) {
            if (this._content) { this.removeContent(true); } // remove previous contents and destroy
            this._content = content;
            this.add(this._content);
            this._setContentScale();
            this._updateBounds();
            this._setContentPosition();
            this.setBackground(this._backgroundStyle);
        }
        return this;
    }

    /**
     * will remove the `LayoutContent` contained in this `LayoutContainer`
     * @param destroy if `true` the removed contents will be destroyed
     * @returns the `LayoutContent` contained in this `LayoutContainer`
     */
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

    private _setContentScale(): this {
        const content = this._content;
        if (content) {
            const cWidth: number = content.displayWidth;
            const cHeight: number = content.displayHeight;
            // if we don't already specify a width & height then set them based on content size
            const width = this._desiredWidth ?? cWidth + (this.padding * 2);
            const height = this._desiredHeight ?? cHeight + (this.padding * 2);
            if (width !== this.width || height !== this.height) {
                this.setSize(width, height);
                this.emit(LayoutEvents.RESIZE, {width: this.width, height: this.height});
            }
            const availableWidth = width - (this.padding * 2);
            const scaleX = availableWidth / cWidth;
            const availableHeight = height - (this.padding * 2);
            const scaleY = availableHeight / cHeight;

            // only scale down, not up
            if (scaleX < 1 || scaleY < 1) {
                const scale: number = (scaleX < scaleY) ? scaleX : scaleY;
                content.setScale(scale);
            }
        }

        return this;
    }

    private _setContentPosition(): LayoutContainer {
        const content = this._content;
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

    private _updateBounds(): void {
        this._top = -(this.height / 2);
        this._bottom = (this.height / 2);
        this._left = -(this.width / 2);
        this._right = (this.width / 2);
    }
}