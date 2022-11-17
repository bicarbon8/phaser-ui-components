import * as _ from "lodash";
import { Alignment } from "./alignment";
import { LayoutContent } from "./layout-content";

export type LayoutContainerOptions = {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    padding?: number;
    alignment?: Alignment;
    content?: LayoutContent;
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
            }
        }
    }
    export function setDefaultOptions(options: LayoutContainerOptions): LayoutContainerOptions {
        return _.merge(LayoutContainerOptions.getDefaultOptions(), options);
    }
}

export class LayoutContainer extends Phaser.GameObjects.Container {
    public readonly padding: number;
    public readonly alignment: Alignment;
    
    private _top: number;
    private _bottom: number;
    private _left: number;
    private _right: number;
    private _content: LayoutContent;
    
    constructor(scene: Phaser.Scene, options: LayoutContainerOptions) {
        options = LayoutContainerOptions.setDefaultOptions(options);
        super(scene, options.x, options.y);
        this.padding = options.padding;
        this.alignment = options.alignment;
        const width: number = options.width;
        const height: number = options.height;
        this.updateSize(width, height);
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

    updateSize(width: number, height: number): LayoutContainer {
        this.setSize(width, height);
        this._top = -(height / 2);
        this._bottom = (height / 2);
        this._left = -(width / 2);
        this._right = (width / 2);
        if (this.content) {
            this.setContentScale();
            this.setContentPosition();
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
            this.setContentScale();
            this.setContentPosition();
            this.add(this._content);
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

    setContentScale(): LayoutContainer {
        if (this.content) {
            const cWidth: number = this.content.displayWidth;
            const cHeight: number = this.content.displayHeight;
            const availableWidth = this.width - (this.padding * 2);
            const availableHeight = this.height - (this.padding * 2);
            if (cWidth > availableWidth || cHeight > availableHeight) {
                const scaleX: number = availableWidth / cWidth;
                const scaleY: number = availableHeight / cHeight;
                const scale: number = (scaleX < scaleY) ? scaleX : scaleY;
                this.content.setScale(scale);
            }
        }
        return this;
    }

    setContentPosition(): LayoutContainer {
        if (this.content) {
            this.content.setOrigin?.(0.5);
            const cWidth = this.content.displayWidth;
            const cHeight = this.content.displayHeight;
            switch(this.alignment.horizontal) {
                case 'right':
                    this.content.setX(this.right - this.padding - (cWidth / 2));
                    break;
                case 'left':
                    this.content.setX(this.left + this.padding + (cWidth / 2));
                    break;
                case 'center':
                default:
                    this.content.setX(0);
                    break;
            }
            switch(this.alignment.vertical) {
                case 'bottom':
                    this.content.setY(this.bottom - this.padding - (cHeight / 2));
                    break;
                case 'top':
                    this.content.setY(this.top + this.padding + (cHeight / 2));
                    break;
                case 'middle':
                default:
                    this.content.setY(0);
                    break;
            }
        }
        return this;
    }
}