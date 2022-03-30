import { Helpers } from "../utilities/helpers";
import { FlexLayoutOptions } from "./flex-layout-options";
import { LayoutContent } from "./layout-content";
import { LinearLayout } from "./linear-layout";

export class FlexLayout extends Phaser.GameObjects.Container {
    public readonly padding: number;
    
    private readonly _rowManager: LinearLayout;
    
    constructor(scene: Phaser.Scene, options?: FlexLayoutOptions) {
        options = Helpers.merge(FlexLayoutOptions.DEFAULT(scene), options);
        super(scene, options.x, options.y);

        this.padding = options.padding;
        this._rowManager = new LinearLayout(scene, {
            x: options.x,
            y: options.y,
            orientation: 'vertical',
            padding: options.padding
        });
        this.add(this._rowManager);
        this.updateWidth(options.width);
        this.addContents(...options.contents);
    }

    get contents(): LayoutContent[] {
        let contents: LayoutContent[] = [];
        for (var i=0; i<this.rows; i++) {
            contents = contents.concat(this.getRow(i));
        }
        return contents;
    }

    get rows(): number {
        return this._rowManager.contents.length;
    }

    getRow(index: number): LayoutContent[] {
        if (0 <= index && index < this._rowManager.contents.length) {
            const row: LinearLayout = this._rowManager.contents[index] as LinearLayout;
            return row.contents;
        }
        return [];
    }

    addContents(...contents: LayoutContent[]): FlexLayout {
        if (contents?.length > 0) {
            for (var i=0; i<contents.length; i++) {
                let content: LayoutContent = contents[i];
                let row: LinearLayout = this._getLastRow();
                if (row.width + content.width + this.padding > this.width) {
                    row = this._addRow();
                }
                row.addContents(content);
            }
    
            this.setSize(this.width, this._rowManager.height);
        }
        return this;
    }

    updateWidth(width: number): FlexLayout {
        this.setSize(width, 0);
        return this.refreshLayout();
    }

    refreshLayout(): FlexLayout {
        const contents: LayoutContent[] = this.removeAllContent(false);
        return this.addContents(...contents);
    }

    removeContent(content: LayoutContent, destroy: boolean = true): LayoutContent {
        let removed: LayoutContent;
        let contents: LayoutContent[] = this.removeAllContent(false);
        const index: number = contents.indexOf(content);
        if (index >= 0) {
            const r: LayoutContent[] = contents.splice(index, 1);
            removed = r?.shift();
            if (destroy) {
                removed?.destroy();
            }
        }
        this.addContents(...contents);
        return removed;
    }

    removeAllContent(destroy: boolean = true): LayoutContent[] {
        let contents: LayoutContent[] = [];
        for (var i=0; i<this._rowManager.contents.length; i++) {
            let row: LinearLayout = this._rowManager.contents[i] as LinearLayout;
            contents = contents.concat(row.removeAllContent(destroy));
        }
        this._rowManager.removeAllContent(true);
        return contents;
    }

    private _getLastRow(): LinearLayout {
        let row: LinearLayout;
        if (this._rowManager.contents.length <= 0) {
            row = this._addRow();
        } else {
            row = this._rowManager.contents[this._rowManager.contents.length - 1] as LinearLayout;
        }
        return row;
    }

    private _addRow(): LinearLayout {
        const row: LinearLayout = new LinearLayout(this.scene, {
            orientation: 'horizontal',
            padding: this.padding
        });
        this._rowManager.addContents(row);
        return row;
    }
}