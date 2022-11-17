import * as _ from "lodash";
import { Alignment } from "./alignment";
import { GridLayoutOptions } from "./grid-layout-options";
import { LayoutContainer } from "./layout-container";
import { LayoutContent } from "./layout-content";

/**
 * divides the available area (based on specified width and height)
 * into grid (12x12 by default) of equally sized fields allowing 
 * content to be arranged evenly within a specified area
 */
export class GridLayout extends Phaser.GameObjects.Container {
    public readonly alignment: Alignment;
    public readonly padding: number;
    public readonly rows: number;
    public readonly columns: number;
    public readonly cornerRadius: number | Phaser.Types.GameObjects.Graphics.RoundedRectRadius;

    private _grid: Array<LayoutContainer[]>;
    private _background: Phaser.GameObjects.Graphics;
    private _top: number;
    private _bottom: number;
    private _left: number;
    private _right: number;

    constructor(scene: Phaser.Scene, options: GridLayoutOptions) {
        options = _.merge(GridLayoutOptions.getDefaultOptions(), options);
        super(scene, options.x, options.y);
        
        this.alignment = options.alignment;
        this.padding = options.padding;
        this.rows = options.rows;
        this.columns = options.columns;
        this.cornerRadius = options.cornerRadius;

        const width: number = options.width ?? this.scene.sys.game.scale.gameSize.width;
        const height: number = options.height ?? this.scene.sys.game.scale.gameSize.height;
        this.updateSize(width, height);
        
        this._createGrid();

        this.setBackground(options.background);

        if (options.contents?.length) {
            for (var row=0; row<options.contents.length && row<this.rows; row++) {
                if (options.contents[row]?.length) {
                    for (var col=0; col<options.contents[row].length && col<this.columns; col++) {
                        const content = options.contents[row][col];
                        this.addContentAt(row, col, content);
                    }
                }
            }
        }
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

    get contents(): Array<LayoutContent> {
        const c = new Array<LayoutContent>();
        this._grid.forEach(row => c.push(...row));
        return c;
    }

    get background(): Phaser.GameObjects.Graphics {
        return this._background;
    }

    addContentAt(row: number, col: number, content: LayoutContent): this {
        const cell: LayoutContainer = this._getLayoutContainerAt(row, col);
        if (cell) {
            cell.setContent(content);
        }
        return this;
    }

    getContentAt<T extends LayoutContent>(row: number, col: number): T {
        return this._getLayoutContainerAt(row, col)?.contentAs<T>();
    }

    getRow(row: number): Array<LayoutContent> {
        if (row >= 0 && row < this.rows) {
            return this._grid[row].map(c => c.content);
        }
        return new Array<LayoutContent>();
    }

    getColumn(col: number): Array<LayoutContent> {
        const column: LayoutContainer[] = [];
        if (col >= 0 && col < this.columns) {
            for (var row=0; row<this._grid.length; row++) {
                column.push(this._grid[row][col]);
            }
        }
        return column.map(c => c.content);
    }

    updateSize(width: number, height: number): this {
        this.setSize(width, height);
        this._top = this.y - (height / 2);
        this._bottom = this.y + (height / 2);
        this._left = this.x - (width / 2);
        this._right = this.x + (width / 2);
        
        if (this._grid?.length === this.rows) {
            const cellWidth: number = this.width / this.columns;
            const cellHeight: number = this.height / this.rows;
            let yOffset: number = -(this.height / 2);
            for (var row=0; row<this.rows; row++) {
                let xOffset: number = -(this.width / 2);
                for (var col=0; col<this.columns; col++) {
                    let cell: LayoutContainer = this._grid[row][col];
                    cell.updateSize(cellWidth, cellHeight);
                    cell.setPosition(xOffset + (cellWidth / 2), yOffset + (cellHeight / 2));
                    xOffset += cellWidth;
                }
                yOffset += cellHeight;
            }
        }
        return this;
    }

    setBackground(styles?: Phaser.Types.GameObjects.Graphics.Styles): this {
        if (this._background) {
            this.remove(this._background, true);
        }
        if (styles) {
            const background: Phaser.GameObjects.Graphics = new Phaser.GameObjects.Graphics(this.scene, {
                fillStyle: styles.fillStyle,
                lineStyle: styles.lineStyle
            });
            this._background = background;
            if (styles.fillStyle) {
                background.fillRoundedRect(-(this.width / 2), -(this.height / 2), this.width, this.height, this.cornerRadius);
            }
            if (styles.lineStyle) {
                background.strokeRoundedRect(-(this.width / 2), -(this.height / 2), this.width, this.height, this.cornerRadius);
            }
            this.add(background);
            this.sendToBack(background);
        }
        return this;
    }

    private _getLayoutContainerAt(row: number, column: number): LayoutContainer {
        if (row >= 0 && row < this.rows && column >= 0 && column < this.columns) {
            return this._grid[row][column];
        }
        return null;
    }

    private _createGrid(): void {
        this._grid = new Array<LayoutContainer[]>();
        const cellWidth: number = this.width / this.columns;
        const cellHeight: number = this.height / this.rows;
        let yOffset: number = -(this.height / 2);
        for (var row=0; row<this.rows; row++) {
            this._grid[row] = [];
            let xOffset: number = -(this.width / 2);
            for (var col=0; col<this.columns; col++) {
                let cell: LayoutContainer = new LayoutContainer(this.scene, {
                    x: xOffset + (cellWidth / 2), 
                    y: yOffset + (cellHeight / 2),
                    width: cellWidth,
                    height: cellHeight,
                    padding: this.padding,
                    alignment: this.alignment
                });
                this._grid[row][col] = cell;
                this.add(cell);
                xOffset += cellWidth;
            }
            yOffset += cellHeight;
        }
    }
}