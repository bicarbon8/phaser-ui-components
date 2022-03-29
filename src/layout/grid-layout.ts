import { GridCell } from "./grid-cell";
import { GridLayoutOptions } from "./grid-layout-options";
import { LayoutContent } from "./layout-content";

/**
 * divides the available area (based on specified width and height)
 * into a 12x12 grid allowing content to be arranged by specifying
 * which `GridCell` each items is contained within
 */
export class GridLayout extends Phaser.GameObjects.Container {
    public readonly padding: number;
    public readonly margins: number;
    public readonly rows: number;
    public readonly columns: number;

    private _grid: GridCell[][];
    private _top: number;
    private _bottom: number;
    private _left: number;
    private _right: number;

    constructor(scene: Phaser.Scene, options?: GridLayoutOptions) {
        super(scene, options?.x, options?.y);
        
        this.padding = options?.padding || 0;
        this.margins = options?.margins || 0;
        this.rows = options?.rows || 12;
        this.columns = options?.columns || 12;

        const width: number = options?.width || scene.sys.game.scale.gameSize.width;
        const height: number = options?.height || scene.sys.game.scale.gameSize.height;
        this.updateSize(width, height);
        
        this._createGrid();
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

    get cells(): GridCell[] {
        let cells: GridCell[] = [];
        this._grid.forEach((row: GridCell[]) => {
            cells = cells.concat(row);
        });
        return cells;
    }

    setGridCellContent(row: number, column: number, content: LayoutContent): void {
        const cell: GridCell = this.getGridCell(row, column);
        if (cell) {
            cell.setContent(content);
        }
    }

    getGridCell(row: number, column: number): GridCell {
        if (row >= 0 && row < this.rows && column >= 0 && column < this.columns) {
            return this._grid[row][column];
        }
        return null;
    }

    getRow(row: number): GridCell[] {
        if (row >= 0 && row < this.rows) {
            return this._grid[row];
        }
        return [];
    }

    getColumn(col: number): GridCell[] {
        const column: GridCell[] = [];
        if (col >= 0 && col < this.columns) {
            for (var row=0; row<this._grid.length; row++) {
                column.push(this._grid[row][col]);
            }
        }
        return column;
    }

    updateSize(width: number, height: number): void {
        this.setSize(width, height);
        this._top = this.y - (height / 2);
        this._bottom = this.y + (height / 2);
        this._left = this.x - (width / 2);
        this._right = this.x + (width / 2);
        
        if (this._grid?.length === this.rows) {
            const cellWidth: number = (this.width - (this.margins * (this.columns + 1))) / this.columns;
            const cellHeight: number = (this.height - (this.margins * (this.rows + 1))) / this.rows;
            let yOffset: number = -(this.height / 2) + this.margins;
            for (var row=0; row<this.rows; row++) {
                let xOffset: number = -(this.width / 2) + this.margins;
                for (var col=0; col<this.columns; col++) {
                    let cell: GridCell = this._grid[row][col];
                    cell.updateSize(cellWidth, cellHeight);
                    cell.setPosition(xOffset + (cellWidth / 2), yOffset + (cellHeight / 2));
                    xOffset += cellWidth + this.margins;
                }
                yOffset += cellHeight + this.margins;
            }
        }
    }

    private _createGrid(): void {
        this._grid = [];
        const cellWidth: number = (this.width - (this.margins * (this.columns + 1))) / this.columns;
        const cellHeight: number = (this.height - (this.margins * (this.rows + 1))) / this.rows;
        let yOffset: number = -(this.height / 2) + this.margins;
        for (var row=0; row<this.rows; row++) {
            this._grid[row] = [];
            let xOffset: number = -(this.width / 2) + this.margins;
            for (var col=0; col<this.columns; col++) {
                let cell: GridCell = new GridCell(this.scene, {
                    x: xOffset + (cellWidth / 2), 
                    y: yOffset + (cellHeight / 2),
                    width: cellWidth,
                    height: cellHeight,
                    row: row,
                    column: col,
                    padding: this.padding
                });
                this._grid[row][col] = cell;
                this.add(cell);
                xOffset += cellWidth + this.margins;
            }
            yOffset += cellHeight + this.margins;
        }
    }
}