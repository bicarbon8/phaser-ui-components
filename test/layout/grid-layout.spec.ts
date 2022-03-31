import { GridLayout, Colors, GridCell } from "../../src";
import { TestUtils } from "../test-utils";

describe('GridLayout', () => {
    beforeAll((done) => {
        TestUtils.game(done);
    });

    beforeEach(() => {
        TestUtils.clear();
    });
    
    it('defaults to 12 rows and columns', () => {
        const grid: GridLayout = new GridLayout(TestUtils.scene());
        TestUtils.scene().add.existing(grid);

        expect(grid).withContext('grid object should be non-null').toBeDefined();
        expect(grid.rows).withContext('grid should have 12 rows').toBe(12);
        expect(grid.columns).withContext('grid should have 12 columns').toBe(12);
        expect(grid.padding).withContext('default padding should be 0').toBe(0);
        expect(grid.margins).withContext('default margins should be 0').toBe(0);
    });

    it('defaults to max width and height', () => {
        const grid: GridLayout = new GridLayout(TestUtils.scene());
        TestUtils.scene().add.existing(grid);

        expect(grid.width).withContext('default width should be screen width').toBe(TestUtils.scene().sys.game.scale.gameSize.width);
        expect(grid.height).withContext('default height should be screen height').toBe(TestUtils.scene().sys.game.scale.gameSize.height);
    });

    it('sets expected size for GridCells', () => {
        const grid: GridLayout = new GridLayout(TestUtils.scene());
        TestUtils.scene().add.existing(grid);

        const expectedWidth: number = TestUtils.scene().sys.game.scale.gameSize.width / 12;
        const expectedHeight: number = TestUtils.scene().sys.game.scale.gameSize.height / 12;
        
        for (var row=0; row<grid.rows; row++) {
            for (var col=0; col<grid.columns; col++) {
                let cell: GridCell = grid.getGridCell(row, col);

                expect(cell.width).withContext('width').toBe(expectedWidth);
                expect(cell.height).withContext('height').toBe(expectedHeight);
            }
        }
    });

    it('can be resized', () => {
        const grid: GridLayout = new GridLayout(TestUtils.scene());
        TestUtils.scene().add.existing(grid);

        const originalWidth: number = grid.width;
        const originalHeight: number = grid.height;
        const halfWidth: number = originalWidth / 2;
        const halfHeight: number = originalHeight / 2;

        grid.updateSize(halfWidth, halfHeight);

        expect(grid.width).toBe(halfWidth);
        expect(grid.height).toBe(halfHeight);

        const expectedWidth: number = halfWidth / 12;
        const expectedHeight: number = halfHeight / 12;
        
        for (var row=0; row<grid.rows; row++) {
            for (var col=0; col<grid.columns; col++) {
                let cell: GridCell = grid.getGridCell(row, col);

                expect(cell.width).toBe(expectedWidth);
                expect(cell.height).toBe(expectedHeight);
            }
        }
    });

    it('can specify the number of rows', () => {
        const grid: GridLayout = new GridLayout(TestUtils.scene(), {rows: 1});
        TestUtils.scene().add.existing(grid);

        expect(grid.rows).toBe(1);
        expect(grid.columns).toBe(12);
    });

    it('can specify the number of columns', () => {
        const grid: GridLayout = new GridLayout(TestUtils.scene(), {columns: 1});
        TestUtils.scene().add.existing(grid);

        expect(grid.rows).toBe(12);
        expect(grid.columns).toBe(1);
    });

    it('can set contents of GridCells', () => {
        const grid: GridLayout = new GridLayout(TestUtils.scene());
        TestUtils.scene().add.existing(grid);
        for (var row=0; row<grid.rows; row++) {
            for (var col=0; col<grid.columns; col++) {
                let txt: string = `text at ${row}x${col}`;
                grid.setGridCellContent(row, col, new Phaser.GameObjects.Text(TestUtils.scene(), 0, 0, txt, {
                    fontSize: '20px',
                    color: Colors.random()
                }));
            }
        }

        for (var row=0; row<grid.rows; row++) {
            for (var col=0; col<grid.columns; col++) {
                let cell: GridCell = grid.getGridCell(row, col);
                let text: Phaser.GameObjects.Text = cell.contentAs<Phaser.GameObjects.Text>();
                let expected: string = `text at ${row}x${col}`;
                expect(text.text).toEqual(expected);
            }
        }
    });

    it('can return a row of GridCells', () => {
        const grid: GridLayout = new GridLayout(TestUtils.scene());
        TestUtils.scene().add.existing(grid);

        let y: number;
        for (var row=0; row<grid.rows; row++) {
            let rowCells: GridCell[] = grid.getRow(row);
            expect(rowCells.length).toBe(grid.columns);
            for (var i=0; i<rowCells.length; i++) {
                let cell: GridCell = rowCells[i];
                if (y) {
                    expect(y).withContext('expect y coordinate to be the same for all row cells').toBe(cell.y);
                }
                y = cell.y;
            }
            y = null;
        }
    });

    it('returns empty array if invalid row passed to getRow function', () => {
        const grid: GridLayout = new GridLayout(TestUtils.scene());
        TestUtils.scene().add.existing(grid);

        expect(grid.getRow(-1)).withContext('less than 0').toHaveSize(0);
        expect(grid.getRow(12)).withContext('greater than length').toHaveSize(0);
    });

    it('can return a column of GridCells', () => {
        const grid: GridLayout = new GridLayout(TestUtils.scene());
        TestUtils.scene().add.existing(grid);

        let x: number;
        for (var col=0; col<grid.columns; col++) {
            let colCells: GridCell[] = grid.getColumn(col);
            expect(colCells.length).toBe(grid.rows);
            for (var i=0; i<colCells.length; i++) {
                let cell: GridCell = colCells[i];
                if (x) {
                    expect(x).withContext('expect x coordinate to be the same for all column cells').toBe(cell.x);
                }
                x = cell.x;
            }
            x = null;
        }
    });

    it('returns empty array if invalid column passed to getColumn function', () => {
        const grid: GridLayout = new GridLayout(TestUtils.scene());
        TestUtils.scene().add.existing(grid);

        expect(grid.getColumn(-1)).withContext('less than 0').toHaveSize(0);
        expect(grid.getColumn(12)).withContext('greater than length').toHaveSize(0);
    });

    it('can return an array of all the GridCells', () => {
        const grid: GridLayout = new GridLayout(TestUtils.scene());
        TestUtils.scene().add.existing(grid);

        expect(grid.cells).toHaveSize(12 * 12);
    });

    it('returns null for invalid row and column on call to getGridCell', () => {
        const grid: GridLayout = new GridLayout(TestUtils.scene());
        TestUtils.scene().add.existing(grid);

        expect(grid.getGridCell(-1, -1)).withContext('row and column less than 0').toBeNull();
        expect(grid.getGridCell(-1, 0)).withContext('row less than 0 and valid column').toBeNull();
        expect(grid.getGridCell(0, -1)).withContext('column less than 0 and valid row').toBeNull();
        expect(grid.getGridCell(12, 12)).withContext('row and column greater than lengths').toBeNull();
        expect(grid.getGridCell(12, 0)).withContext('row greater than number of rows and column 0').toBeNull();
        expect(grid.getGridCell(0, 12)).withContext('column greater than number of columns and row 0').toBeNull();
    });
});