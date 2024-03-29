import * as _ from "lodash";
import { Alignment } from "./alignment";
import { LayoutContent } from "./layout-content";
import { LayoutEvents } from "./layout-events";
import { LinearLayoutOptions } from "./linear-layout-options";

export class LinearLayout extends Phaser.GameObjects.Container {
    orientation: 'horizontal' | 'vertical';
    alignment: Alignment;
    padding: number;
    desiredWidth: number;
    desiredHeight: number;
    
    contents: LayoutContent[];

    constructor(scene: Phaser.Scene, options: LinearLayoutOptions) {
        options = _.merge(LinearLayoutOptions.getDefaultOptions(), options);
        super(scene, options.x, options.y);
        this.orientation = options.orientation;
        this.alignment = options.alignment;
        this.padding = options.padding;
        this.desiredWidth = options.desiredWidth;
        this.desiredHeight = options.desiredHeight;
        this.contents = new Array<LayoutContent>();
        this.addContents(...options.contents);
    }

    getContentAt<T extends LayoutContent>(index: number): T {
        return this.contents?.[index] as T;
    }

    getContentIndex(content: LayoutContent): number {
        return this.contents?.indexOf(content);
    }

    /**
     * adds the passed in `LayoutContent` items adjusting any pre-existing
     * items' positions. if `orientation` is `horizontal` items are added
     * left to right; if `vertical` items are added top to bottom.
     * 
     * NOTE: the size of the `LayoutManager` is adjusted after all passed
     * in items are added and pre-existing items' positions are adjusted
     * @param contents one or more `LayoutContent` items to be added
     */
    addContents(...contents: LayoutContent[]): void {
        if (contents?.length) {
            for (var i=0; i<contents.length; i++) {
                let c: LayoutContent = contents[i];
                c.setOrigin?.(0.5);
                switch (this.orientation) {
                    case 'horizontal': 
                        if (this.desiredHeight != null) {
                            if (c['displayHeight'] > this.desiredHeight) {
                                const scaleY = this.desiredHeight / c.height;
                                c.setScale(scaleY);
                            }
                        }
                    case 'vertical':
                        if (this.desiredWidth != null) {
                            if (c['displayWidth'] > this.desiredWidth) {
                                const scaleX = this.desiredWidth / c.width;
                                c.setScale(scaleX);
                            }
                        }
                }
                c.on(LayoutEvents.RESIZE, () => this.refreshLayout());
                this.add(c);
            }
            this.contents = this.contents.concat(contents);
        }
        this.refreshLayout();
    }

    /**
     * removes the specified `LayoutContent` instance from this `LayoutManager`
     * and then adjusts the positions of the remaining items to close any gaps
     * left by the removal.
     * @param content the `LayoutContent` instance to be removed
     * @param destroy if false the item will not be destroyed and can be used
     * elsewhere in the scene. defaults to `true`
     * @returns the removed `LayoutContent` instance
     */
    removeContent(content: LayoutContent, destroy: boolean = true): LayoutContent {
        let removed: LayoutContent;
        if (content) {
            let index: number = this.contents.indexOf(content);
            if (index >= 0) {
                removed = this.contents.splice(index, 1)[0];
                removed.off(LayoutEvents.RESIZE)
                this.remove(content, destroy);
            }
            this.refreshLayout();
        }
        return removed;
    }

    /**
     * removes all `LayoutContent` instances contained within this `LayoutManager`
     * @param destroy if false the contents will not be destroyed and can be used
     * elsewhere in the scene. defaults to `true`
     * @returns an array of the removed `LayoutContent` instances
     */
    removeAllContent(destroy: boolean = true): LayoutContent[] {
        const removed: LayoutContent[] = [];
        while (this.contents?.length) {
            let c: LayoutContent = this.contents.shift();
            this.remove(c, destroy);
            removed.push(c);
        }
        this.refreshLayout();
        return removed;
    }

    /**
     * adjusts the positions of all `LayoutContent` instances contained within this
     * `LayoutManager` based on the `orientation`
     */
    refreshLayout(): void {
        if (this.orientation == 'horizontal') {
            this._layoutHorizontal();
        } else {
            this._layoutVertical();
        }
        this.emit(LayoutEvents.RESIZE, {width: this.width, height: this.height});
    }

    private _layoutHorizontal(): void {
        if (this.contents.length) {
            let contentsWidth: number = this.contents
                .map((c: LayoutContent) => c.displayWidth ?? 0)
                .reduce((previous: number, current: number) => previous + current);
            contentsWidth += (this.padding * (this.contents.length + 1));
            let contentsHeight: number = _.max(this.contents.map((c: LayoutContent) => (c.displayHeight ?? 0) + (this.padding * 2)).concat(this.desiredHeight ?? 0));
            let xOffset: number = -(contentsWidth / 2) + this.padding;
            let yOffset: number;
            for (var i=0; i<this.contents.length; i++) {
                let c: LayoutContent = this.contents[i];
                let height: number = c.displayHeight ?? 0;
                let width: number = c.displayWidth ?? 0;
                switch (this.alignment.vertical) {
                    case 'top':
                        yOffset = -(contentsHeight / 2) + this.padding + (height / 2);
                        break;
                    case 'bottom':
                        yOffset = (contentsHeight / 2) - this.padding - (height / 2);
                    case 'middle':
                    default:
                        yOffset = 0;
                        break;
                }
                c.setPosition(xOffset + (width / 2), yOffset);
                xOffset += width + this.padding;
            }
            const height = this.desiredHeight ?? contentsHeight;
            this.setSize(contentsWidth, height);
        } else {
            this.setSize(0, 0);
        }
    }

    private _layoutVertical(): void {
        if (this.contents.length) {
            let contentsHeight: number = this.contents
                .map((c: LayoutContent) => c.displayHeight ?? 0)
                .reduce((previous: number, current: number) => previous + current);
            contentsHeight += (this.padding * (this.contents.length + 1));
            let contentsWidth: number = _.max(this.contents.map((c: LayoutContent) => (c.displayWidth ?? 0) + (this.padding * 2)).concat(this.desiredWidth ?? 0));
            let yOffset: number = -(contentsHeight / 2) + this.padding;
            let xOffset: number;
            for (var i=0; i<this.contents.length; i++) {
                let c: LayoutContent = this.contents[i];
                let height: number = c.displayHeight ?? 0;
                let width: number = c.displayWidth ?? 0;
                switch (this.alignment.horizontal) {
                    case 'left':
                        xOffset = -(contentsWidth / 2) + this.padding + (width / 2);
                        break;
                    case 'right':
                        xOffset = (contentsWidth / 2) - this.padding - (width / 2);
                    case 'center':
                    default:
                        xOffset = 0;
                        break;
                }
                c.setPosition(xOffset, yOffset + (height / 2));
                yOffset += height + this.padding;
            }
            const width = this.desiredWidth ?? contentsWidth;
            this.setSize(width, contentsHeight);
        } else {
            this.setSize(0, 0);
        }
    }
}