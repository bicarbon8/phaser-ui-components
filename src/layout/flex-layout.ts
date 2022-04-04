import * as _ from "lodash";
import { FlexLayoutOptions } from "./flex-layout-options";
import { LayoutContent } from "./layout-content";
import { LayoutEvents } from "./layout-events";
import { LinearLayout } from "./linear-layout";

export class FlexLayout extends Phaser.GameObjects.Container {
    private readonly _rowManager: LinearLayout;
    private readonly _options: FlexLayoutOptions;
    
    constructor(scene: Phaser.Scene, options?: FlexLayoutOptions) {
        options = _.merge(FlexLayoutOptions.DEFAULT(scene), options);
        super(scene, options.x, options.y);

        this._options = options;
        this._rowManager = new LinearLayout(scene, {
            x: this._options.x,
            y: this._options.y,
            orientation: 'vertical',
            alignment: this._options.alignment
        });
        this.add(this._rowManager);
        this.updateWidth(this._options.width);
        this.addContents(...this._options.contents);
    }

    get padding(): number {
        return this._options.padding;
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
                if (content.displayWidth > (this.width + (this.padding * 2))) {
                    if (row.contents.length > 0) {
                        row = this._addRow();
                    }
                    const scale: number = (this.width + (this.padding * 2)) / content.displayWidth;
                    content.setScale(scale);
                }
                if (row.width + content.displayWidth + this.padding > this.width) {
                    row = this._addRow();
                }
                row.addContents(content);
            }
            this._rowManager.refreshLayout();
    
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
        this.addContents(...contents);
        this.emit(LayoutEvents.RESIZE, this.width, this.height);
        return this;
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
            padding: this.padding,
            alignment: this._options.alignment
        });
        this._rowManager.addContents(row);
        return row;
    }
}