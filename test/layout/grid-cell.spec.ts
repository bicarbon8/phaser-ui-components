import { Colors, GridCell } from "../../src";
import { TestUtils } from "../test-utils";

describe('GridCell', () => {
    beforeAll((done) => {
        TestUtils.game(done);
    });

    beforeEach(() => {
        TestUtils.clear();
    });
    
    it('can be instantiated with no options', () => {
        const cell: GridCell = new GridCell(TestUtils.scene());
        TestUtils.scene().add.existing(cell);

        expect(cell).toBeDefined();
        expect(cell.width).toBe(0);
        expect(cell.height).toBe(0);
        expect(cell.x).toBe(0);
        expect(cell.y).toBe(0);
    });

    it('can set content from options', () => {
        const content: Phaser.GameObjects.Text = new Phaser.GameObjects.Text(TestUtils.scene(), 0, 0, 'sample text', {font: 'Courier 20px #ffffff'});
        const cell: GridCell = new GridCell(TestUtils.scene(), {
            width: 200,
            height: 200,
            content: content
        });
        TestUtils.scene().add.existing(cell);

        expect(cell.content).toBe(content);
    });

    it('can be resized', () => {
        const cell: GridCell = new GridCell(TestUtils.scene(), {
            width: 200,
            height: 200
        });
        TestUtils.scene().add.existing(cell);
        cell.setContent(new Phaser.GameObjects.Text(TestUtils.scene(), 0, 0, 'sample text', {font: 'Courier 20px #ffffff'}))
        .setBackground({fillStyle: {color: Colors.danger}, lineStyle: {color: Colors.dark}});
        const originalWidth: number = cell.width;
        const originalHeight: number = cell.height;
        const halfWidth: number = originalWidth / 2;
        const halfHeight: number = originalHeight / 2;

        cell.updateSize(halfWidth, halfHeight);

        expect(cell.width).toBe(halfWidth);
        expect(cell.height).toBe(halfHeight);
    });

    it('setting content removes and destroys pre-existing content', () => {
        const original: Phaser.GameObjects.Text = new Phaser.GameObjects.Text(TestUtils.scene(), 0, 0, 'sample text', {font: 'Courier 20px #ffffff'});
        const cell: GridCell = new GridCell(TestUtils.scene(), {
            width: 200,
            height: 30,
            content: original
        });
        TestUtils.scene().add.existing(cell);

        expect(cell.content).withContext('verify original content is set').toBe(original);

        spyOn(cell, 'removeContent').and.callThrough();
        spyOn(cell, 'remove').and.callThrough();
        cell.setContent(new Phaser.GameObjects.Text(TestUtils.scene(), 0, 0, 'new text', {font: 'Courier 40px #d0d0d0'}));

        expect(cell.contentAs<Phaser.GameObjects.Text>().text).withContext('verify new content is set').toEqual('new text');
        expect(cell.removeContent).toHaveBeenCalledOnceWith(true);
        expect(cell.remove).toHaveBeenCalledOnceWith(original, true);
    });

    it('handles calling removeContent when there is none', () => {
        const cell: GridCell = new GridCell(TestUtils.scene());
        TestUtils.scene().add.existing(cell);

        expect(() => {
            cell.removeContent();
        }).not.toThrow();
    });
});