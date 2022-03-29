import { GridLayout } from "../../src/layout/grid-layout";
import { Colors } from "../../src/color/colors";
import { TestUtils } from "../test-utils";
import { GridCell } from "../../src";

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

        expect(grid).toBeDefined();
        expect(grid.rows).toBe(12);
        expect(grid.columns).toBe(12);
        expect(grid.padding).toBe(0);
        expect(grid.margins).toBe(0);
    });

    it('defaults to max width and height', () => {
        const grid: GridLayout = new GridLayout(TestUtils.scene());
        TestUtils.scene().add.existing(grid);

        expect(grid.width).toBe(TestUtils.scene().sys.game.scale.gameSize.width);
        expect(grid.height).toBe(TestUtils.scene().sys.game.scale.gameSize.height);
    });

    it('sets expected size for GridCells', () => {
        const grid: GridLayout = new GridLayout(TestUtils.scene());
        TestUtils.scene().add.existing(grid);

        const expectedWidth: number = TestUtils.scene().sys.game.scale.gameSize.width / 12;
        const expectedHeight: number = TestUtils.scene().sys.game.scale.gameSize.height / 12;
        
        for (var row=0; row<grid.rows; row++) {
            for (var col=0; col<grid.columns; col++) {
                let cell: GridCell = grid.getGridCell(row, col);

                expect(cell.width).toBe(expectedWidth);
                expect(cell.height).toBe(expectedHeight);
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
});