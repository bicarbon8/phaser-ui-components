import { Colors } from "../../src/color/colors";
import { LinearLayout } from "../../src/layout/linear-layout";
import { TestUtils } from "../test-utils";

describe('LinearLayout', () => {
    beforeAll((done) => {
        TestUtils.game(done);
    });

    beforeEach(() => {
        TestUtils.clear();
    });
    
    it('can be created with no options', () => {
        const ll: LinearLayout = new LinearLayout(TestUtils.scene(), {});
        TestUtils.scene().add.existing(ll);

        expect(ll).toBeDefined();
    });

    it('will layout contents horizontally by default', () => {
        const ll: LinearLayout = new LinearLayout(TestUtils.scene(), {contents: [
            new Phaser.GameObjects.Text(TestUtils.scene(), 0, 0, 'text 0', {font: `20px Courier ${Colors.random()}`}),
            new Phaser.GameObjects.Text(TestUtils.scene(), 0, 0, 'text 1', {font: `20px Courier ${Colors.random()}`}),
            new Phaser.GameObjects.Text(TestUtils.scene(), 0, 0, 'text 2', {font: `20px Courier ${Colors.random()}`})
        ]});
        TestUtils.scene().add.existing(ll);

        let previousX: number = -Infinity;
        for (var i=0; i<ll.contents.length; i++) {
            let content = ll.getContentAt<Phaser.GameObjects.Text>(i);
            expect(previousX).toBeLessThan(content.x);
            previousX = content.x;
            expect(content.y).toBe(0);
        }
    });

    it('can layout contents vertically', () => {
        const ll: LinearLayout = new LinearLayout(TestUtils.scene(), {
            orientation: 'vertical',
            contents: [
                new Phaser.GameObjects.Text(TestUtils.scene(), 0, 0, 'text 0', {font: `20px Courier ${Colors.random()}`}),
                new Phaser.GameObjects.Text(TestUtils.scene(), 0, 0, 'text 1', {font: `20px Courier ${Colors.random()}`}),
                new Phaser.GameObjects.Text(TestUtils.scene(), 0, 0, 'text 2', {font: `20px Courier ${Colors.random()}`})
            ]
        });
        TestUtils.scene().add.existing(ll);

        let previousY: number = -Infinity;
        for (var i=0; i<ll.contents.length; i++) {
            let content = ll.getContentAt<Phaser.GameObjects.Text>(i);
            expect(previousY).toBeLessThan(content.y);
            previousY = content.y;
            expect(content.x).toBe(0);
        }
    });

    it('can remove all content at once', () => {
        const ll: LinearLayout = new LinearLayout(TestUtils.scene(), {
            contents: [
                new Phaser.GameObjects.Text(TestUtils.scene(), 0, 0, 'text 0', {font: `20px Courier ${Colors.random()}`}),
                new Phaser.GameObjects.Text(TestUtils.scene(), 0, 0, 'text 1', {font: `20px Courier ${Colors.random()}`}),
                new Phaser.GameObjects.Text(TestUtils.scene(), 0, 0, 'text 2', {font: `20px Courier ${Colors.random()}`})
            ]
        });
        TestUtils.scene().add.existing(ll);

        expect(ll.contents.length).toBe(3);

        spyOn(ll, 'refreshLayout').and.callThrough();
        ll.removeAllContent();

        expect(ll.contents.length).toBe(0);
        expect(ll.refreshLayout).toHaveBeenCalledTimes(1);
    });

    it('can remove individual contents', () => {
        const ll: LinearLayout = new LinearLayout(TestUtils.scene(), {
            contents: [
                new Phaser.GameObjects.Text(TestUtils.scene(), 0, 0, 'text 0', {font: `20px Courier ${Colors.random()}`}),
                new Phaser.GameObjects.Text(TestUtils.scene(), 0, 0, 'text 1', {font: `20px Courier ${Colors.random()}`}),
                new Phaser.GameObjects.Text(TestUtils.scene(), 0, 0, 'text 2', {font: `20px Courier ${Colors.random()}`})
            ]
        });
        TestUtils.scene().add.existing(ll);

        expect(ll.contents.length).withContext('only 3 contents added in constructor options').toBe(3);

        spyOn(ll, 'refreshLayout');
        ll.removeContent(ll.contents[1]);

        expect(ll.contents.length).toBe(2);
        expect(ll.refreshLayout).toHaveBeenCalledTimes(1);

        let previousX: number = -Infinity;
        for (var i=0; i<ll.contents.length; i++) {
            let content: Phaser.GameObjects.Text = ll.contents[i] as Phaser.GameObjects.Text;
            expect(previousX).toBeLessThan(content.x);
            previousX = content.x;
            expect(content.y).toBe(0);

            expect(content.text).not.toEqual('text 1');
        }
    });
});