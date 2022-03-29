import { Helpers } from "../utilities/helpers";
import { LayoutContent } from "./layout-content";
import { LayoutManagerOptions } from "./layout-manager-options";

export class LayoutManager extends Phaser.GameObjects.Container {
    public readonly orientation: string;
    public readonly padding: number;
    
    private _contents: LayoutContent[];

    constructor(scene: Phaser.Scene, options?: LayoutManagerOptions) {
        super(scene, options?.x, options?.y);
        this.orientation = options?.orientation || 'horizontal';
        this.padding = options?.padding || 0;
        this._contents = [];
    }

    get contents(): LayoutContent[] {
        return this._contents;
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
                if (!(c instanceof Phaser.GameObjects.Container)) { c.setOrigin(0.5); }
                this.add(c);
            }
            this._contents = this.contents.concat(contents);
            this.layout();
        }
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
            let index: number = this._contents.indexOf(content);
            if (index >= 0) {
                removed = this._contents.splice(index, 1)[0];
                this.remove(content, destroy);
            }
            this.layout();
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
            let c: LayoutContent = this._contents.shift();
            this.remove(c, destroy);
            removed.push(c);
        }
        this.layout();
        return removed;
    }

    /**
     * adjusts the positions of all `LayoutContent` instances contained within this
     * `LayoutManager` based on the `orientation`
     */
    layout(): void {
        if (this.orientation == 'horizontal') {
            this._layoutHorizontal();
        } else {
            this._layoutVertical();
        }
    }

    private _layoutHorizontal(): void {
        if (this._contents.length) {
            let contentsWidth: number = this.contents
                .map((c: LayoutContent) => c.displayWidth)
                .reduce((previous: number, current: number) => previous + current);
            contentsWidth += (this.padding * (this.contents.length + 1));
            let contentsHeight: number = Helpers.getHighest(...this.contents.map((c: LayoutContent) => (c.displayHeight) + (this.padding * 2)));
            let xOffset: number = -(contentsWidth / 2) + this.padding;
            for (var i=0; i<this.contents.length; i++) {
                let c: LayoutContent = this.contents[i];
                let width: number = c.displayWidth;
                c.setPosition(xOffset + (width / 2), 0);
                xOffset += width + this.padding;
            }
            this.setSize(contentsWidth, contentsHeight);
        }
    }

    private _layoutVertical(): void {
        if (this._contents.length) {
            let contentsHeight: number = this.contents
                .map((c: LayoutContent) => c.displayHeight)
                .reduce((previous: number, current: number) => previous + current);
            contentsHeight += (this.padding * (this.contents.length + 1));
            let contentsWidth: number = Helpers.getHighest(...this.contents.map((c: LayoutContent) => (c.displayWidth) + (this.padding * 2)));
            let yOffset: number = -(contentsHeight / 2) + this.padding;
            for (var i=0; i<this.contents.length; i++) {
                let c: LayoutContent = this.contents[i];
                let height: number = c.displayHeight;
                c.setPosition(0, yOffset + (height / 2));
                yOffset += height + this.padding;
            }
            this.setSize(contentsWidth, contentsHeight);
        }
    }
}