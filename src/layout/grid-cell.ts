import { Alignment } from "./alignment";
import { LayoutContent } from "./layout-content";
import { GridCellOptions } from "./grid-cell-options";
import * as _ from "lodash";

export class GridCell extends Phaser.GameObjects.Container {
    public readonly row: number;
    public readonly column: number;
    public readonly padding: number;
    public readonly alignment: Alignment;
    public readonly scaleToFit: boolean;
    public readonly keepAspectRatio: boolean;
    
    private _top: number;
    private _bottom: number;
    private _left: number;
    private _right: number;
    private _background: Phaser.GameObjects.Graphics;
    private _backgroundStyle: Phaser.Types.GameObjects.Graphics.Styles;
    private _content: LayoutContent;
    
    constructor(scene: Phaser.Scene, options?: GridCellOptions) {
        options = _.merge(GridCellOptions.DEFAULT(), options);
        super(scene, options.x, options.y);
        this.row = options.row;
        this.column = options.column;
        this.padding = options.padding;
        this.alignment = options.alignment;
        this.scaleToFit = options.scaleToFit;
        this.keepAspectRatio = options.keepAspectRatio;
        const width: number = options.width;
        const height: number = options.height;
        this.updateSize(width, height);
        this.setBackground(options.background);
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

    get background(): Phaser.GameObjects.Graphics {
        return _.clone(this._background);
    }

    updateSize(width: number, height: number): GridCell {
        this.setSize(width, height);
        this._top = -(height / 2);
        this._bottom = (height / 2);
        this._left = -(width / 2);
        this._right = (width / 2);
        if (this.background) {
            this.setBackground(this._backgroundStyle)
        }
        if (this.content) {
            this.setContentScale();
            this.setContentPosition();
        }
        return this;
    }

    /**
     * NOTE: if previous contents were contained within this `GridCell`
     * they will be removed and destroyed. Call `removeContent` first
     * if you wish to retain the object
     * @param content the content to be added to this `GridCell`
     */
    setContent(content: LayoutContent): GridCell {
        if (content) {
            if (this.content) { this.removeContent(true); } // remove previous contents and destroy
            this._content = content;
            this.setContentScale();
            this.setContentPosition();
            this.add(this._content);
            this.bringToTop(this._content);
        }
        return this;
    }

    removeContent<T extends LayoutContent>(destroy: boolean = true): T {
        if (this.content) {
            const content: T = this.contentAs<T>();
            this.remove(content, destroy);
            this._content = null;
            return content;
        }
        return null;
    }

    setBackground(style?: Phaser.Types.GameObjects.Graphics.Styles): GridCell {
        this._backgroundStyle = style;
        if (this.background) { 
            this.remove(this.background, true);
            this._background = null;
        }
        if (this._backgroundStyle) {
            this._background = new Phaser.GameObjects.Graphics(this.scene, this._backgroundStyle);
            this.add(this._background);
            if (this._backgroundStyle?.fillStyle) {this._background.fillRect(this.left, this.top, this.width, this.height);}
            if (this._backgroundStyle?.lineStyle) {this._background.strokeRect(this.left, this.top, this.width, this.height);}
            this.sendToBack(this._background);
        }
        return this;
    }

    setContentScale(): GridCell {
        if (this.content) {
            const width: number = this.content.width;
            const height: number = this.content.height;
            if (this.scaleToFit && (width > (this.width - (this.padding * 2)) || height > (this.height - (this.padding * 2)))) {
                const scaleX: number = (this.width - (this.padding * 2)) / width;
                const scaleY: number = (this.height - (this.padding * 2)) / height;
                if (this.keepAspectRatio) {
                    const scale: number = (scaleX < scaleY) ? scaleX : scaleY;
                    this.content.setScale(scale);    
                } else {
                    this.content.setScale(scaleX, scaleY);
                }
            } else {
                this.content.setScale(1);
            }
        }
        return this;
    }

    setContentPosition(): GridCell {
        if (this.content) {
            if (!(this.content instanceof Phaser.GameObjects.Container)) { this.content.setOrigin(0.5, 0.5); }
            switch(this.alignment.horizontal) {
                case 'right':
                    this.content.setX(this.right - this.padding - ((this.content.width * this.content.scaleX) / 2));
                    break;
                case 'left':
                    this.content.setX(this.left + this.padding + ((this.content.width * this.content.scaleX) / 2));
                    break;
                case 'center':
                default:
                    this.content.setX(0);
                    break;
            }
            switch(this.alignment.vertical) {
                case 'bottom':
                    this.content.setY(this.bottom - this.padding - ((this.content.height * this.content.scaleY) / 2));
                    break;
                case 'top':
                    this.content.setY(this.top + this.padding + ((this.content.height * this.content.scaleY) / 2));
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