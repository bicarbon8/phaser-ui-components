import { GridLayout, Colors, TextButton, Styles, LayoutContent } from "../../src";
import { TestUtils } from "../test-utils";

describe('GridLayout', () => {
    beforeAll((done) => {
        TestUtils.game(done);
    });

    beforeEach(() => {
        TestUtils.clear();
    });
    
    it('defaults to 12 rows and columns', () => {
        const grid: GridLayout = new GridLayout(TestUtils.scene(), {});
        TestUtils.scene().add.existing(grid);

        expect(grid).withContext('grid object should be non-null').toBeDefined();
        expect(grid.rows).withContext('grid should have 12 rows').toBe(12);
        expect(grid.columns).withContext('grid should have 12 columns').toBe(12);
        expect(grid.padding).withContext('default padding should be 0').toBe(0);
    });

    it('defaults to max width and height', () => {
        const grid: GridLayout = new GridLayout(TestUtils.scene(), {});
        TestUtils.scene().add.existing(grid);

        expect(grid.width).withContext('default width should be screen width').toBe(TestUtils.scene().sys.game.scale.gameSize.width);
        expect(grid.height).withContext('default height should be screen height').toBe(TestUtils.scene().sys.game.scale.gameSize.height);
    });

    it('can be resized', () => {
        const monitoredA = new TextButton(TestUtils.scene(), {
            width: Math.floor(500 / 12), 
            textConfig: {text: 'a'},
            background: Styles.success().graphics
        });
        const monitoredASpy = spyOn(monitoredA, 'setScale').and.callThrough();
        const monitoredZ = new TextButton(TestUtils.scene(), {
            width: Math.floor(500 / 12), 
            textConfig: {text: 'z'},
            background: Styles.danger().graphics
        });
        const monitoredZSpy = spyOn(monitoredZ, 'setScale').and.callThrough();
        const grid: GridLayout = new GridLayout(TestUtils.scene(), {
            width: 500,
            height: 500,
            contents: [
                [monitoredA],
                ,
                ,
                ,
                ,
                ,
                ,
                ,
                ,
                ,
                ,
                [,,,,,,,,,,,monitoredZ]
            ]
        });
        TestUtils.scene().add.existing(grid);

        expect(monitoredASpy).withContext('expect original content A to not be scaled').not.toHaveBeenCalled();
        expect(monitoredZSpy).withContext('expect original content Z to not be scaled').not.toHaveBeenCalled();

        const originalWidth: number = grid.width;
        const originalHeight: number = grid.height;
        const halfWidth: number = originalWidth / 2;
        const halfHeight: number = originalHeight / 2;

        grid.updateSize(halfWidth, halfHeight);

        expect(monitoredASpy).withContext('expect content A to be scaled after resize').toHaveBeenCalled();
        expect(monitoredZSpy).withContext('expect content Z to be scaled after resize').toHaveBeenCalled();
        expect(grid.width).toBe(halfWidth);
        expect(grid.height).toBe(halfHeight);
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

    it('can set contents of cell', () => {
        const scene = TestUtils.scene();
        const grid: GridLayout = new GridLayout(TestUtils.scene(), {
            width: scene.sys.game.scale.gameSize.width,
            height: scene.sys.game.scale.gameSize.height
        });
        TestUtils.scene().add.existing(grid);
        for (var row=0; row<grid.rows; row++) {
            for (var col=0; col<grid.columns; col++) {
                let txt: string = `text at ${row}x${col}`;
                grid.addContentAt(row, col, new Phaser.GameObjects.Text(TestUtils.scene(), 0, 0, txt, {
                    fontSize: '20px',
                    color: Colors.random()
                }));
            }
        }

        for (var row=0; row<grid.rows; row++) {
            for (var col=0; col<grid.columns; col++) {
                let text = grid.getContentAt<Phaser.GameObjects.Text>(row, col);
                let expected: string = `text at ${row}x${col}`;
                expect(text.text).toEqual(expected);
            }
        }
    });

    it('can remove content in a specific cell', () => {
        const scene = TestUtils.scene();
        const grid: GridLayout = new GridLayout(TestUtils.scene(), {});
        TestUtils.scene().add.existing(grid);
        for (var row=0; row<grid.rows; row++) {
            for (var col=0; col<grid.columns; col++) {
                let txt: string = `text at ${row}x${col}`;
                grid.addContentAt(row, col, new Phaser.GameObjects.Text(TestUtils.scene(), 0, 0, txt, {
                    fontSize: '20px',
                    color: Colors.random()
                }));
            }
        }

        for (var row=0; row<grid.rows; row++) {
            for (var col=0; col<grid.columns; col++) {
                // remove even row, col content
                if (row%2 === 0 && col%2 === 0) {
                    grid.removeContentAt<Phaser.GameObjects.Text>(row, col);
                }
            }
        }

        for (var row=0; row<grid.rows; row++) {
            for (var col=0; col<grid.columns; col++) {
                if (row%2 === 0 && col%2 === 0) {
                    let none = grid.getContentAt(row, col);
                    expect(none).withContext('content should be null').toBeNull();
                } else {
                    let text = grid.getContentAt<Phaser.GameObjects.Text>(row, col);
                    let expected: string = `text at ${row}x${col}`;
                    expect(text.text).toEqual(expected);
                }
            }
        }
    });

    it('can return a row of cell', () => {
        const grid: GridLayout = new GridLayout(TestUtils.scene(), {});
        for (var row=0; row<grid.rows; row++) {
            for (var col=0; col<grid.columns; col++) {
                let txt: string = `text at ${row}x${col}`;
                grid.addContentAt(row, col, new Phaser.GameObjects.Text(TestUtils.scene(), 0, 0, txt, {
                    fontSize: '20px',
                    color: Colors.random()
                }));
            }
        }
        TestUtils.scene().add.existing(grid);

        for (var row=0; row<grid.rows; row++) {
            let rowCells: Array<LayoutContent> = grid.getRow(row);
            expect(rowCells.length).toBe(grid.columns);
            for (var col=0; col<rowCells.length; col++) {
                let text = rowCells[col] as Phaser.GameObjects.Text;
                expect(text.text).withContext('expect text to have correct column value').toEqual(`text at ${row}x${col}`);
            }
        }
    });

    it('returns empty array if invalid row passed to getRow function', () => {
        const grid: GridLayout = new GridLayout(TestUtils.scene(), {});
        TestUtils.scene().add.existing(grid);

        expect(grid.getRow(-1)).withContext('less than 0').toHaveSize(0);
        expect(grid.getRow(12)).withContext('greater than length').toHaveSize(0);
    });

    it('can return a column of LayoutContent', () => {
        const grid: GridLayout = new GridLayout(TestUtils.scene(), {});
        TestUtils.scene().add.existing(grid);
        for (var row=0; row<grid.rows; row++) {
            for (var col=0; col<grid.columns; col++) {
                let txt: string = `text at ${row}x${col}`;
                grid.addContentAt(row, col, new Phaser.GameObjects.Text(TestUtils.scene(), 0, 0, txt, {
                    fontSize: '20px',
                    color: Colors.random()
                }));
            }
        }

        for (var col=0; col<grid.columns; col++) {
            let colCells: Array<LayoutContent> = grid.getColumn(col);
            expect(colCells.length).toBe(grid.rows);
            for (var row=0; row<colCells.length; row++) {
                let text = colCells[row] as Phaser.GameObjects.Text;
                expect(text.text).withContext('expect text to have correct column value').toEqual(`text at ${row}x${col}`);
            }
        }
    });

    it('returns empty array if invalid column passed to getColumn function', () => {
        const grid: GridLayout = new GridLayout(TestUtils.scene(), {});
        TestUtils.scene().add.existing(grid);

        expect(grid.getColumn(-1)).withContext('less than 0').toHaveSize(0);
        expect(grid.getColumn(12)).withContext('greater than length').toHaveSize(0);
    });

    it('can return an array of all the cell', () => {
        const grid: GridLayout = new GridLayout(TestUtils.scene(), {});
        TestUtils.scene().add.existing(grid);

        expect(grid.contents).toHaveSize(12 * 12);
    });

    it('returns undefined for invalid row and column on call to getGridCell', () => {
        const grid: GridLayout = new GridLayout(TestUtils.scene(), {});
        TestUtils.scene().add.existing(grid);

        expect(grid.getContentAt(-1, -1)).withContext('row and column less than 0').toBeUndefined();
        expect(grid.getContentAt(-1, 0)).withContext('row less than 0 and valid column').toBeUndefined();
        expect(grid.getContentAt(0, -1)).withContext('column less than 0 and valid row').toBeUndefined();
        expect(grid.getContentAt(12, 12)).withContext('row and column greater than lengths').toBeUndefined();
        expect(grid.getContentAt(12, 0)).withContext('row greater than number of rows and column 0').toBeUndefined();
        expect(grid.getContentAt(0, 12)).withContext('column greater than number of columns and row 0').toBeUndefined();
    });
});