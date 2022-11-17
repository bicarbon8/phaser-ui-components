import { Colors, LayoutContent } from "../../src";
import { FlexLayout } from "../../src/layout/flex-layout";
import { TestUtils } from "../test-utils";

describe('FlexLayout', () => {
    beforeAll((done) => {
        TestUtils.game(done);
    });

    beforeEach(() => {
        TestUtils.clear();
    });
    
    it('can be instantiated with no options', () => {
        const flex: FlexLayout = new FlexLayout(TestUtils.scene());
        TestUtils.scene().add.existing(flex);

        expect(flex).withContext('FlexLayout is created').toBeDefined();
        expect(flex.width).withContext('width defaults to game width').toBe(TestUtils.scene().sys.game.scale.gameSize.width);
        expect(flex.rows).withContext('expect no rows').toBe(0);
    });

    it('wraps content automatically when it exceeds layout width', () => {
        const flex: FlexLayout = new FlexLayout(TestUtils.scene(), {
            width: 300,
            contents: [
                new Phaser.GameObjects.Rectangle(TestUtils.scene(), 0, 0, 150, 20, Colors.warning),
                new Phaser.GameObjects.Rectangle(TestUtils.scene(), 0, 0, 150, 40, Colors.danger),
                new Phaser.GameObjects.Rectangle(TestUtils.scene(), 0, 0, 100, 30, Colors.light),
                new Phaser.GameObjects.Rectangle(TestUtils.scene(), 0, 0, 100, 20, Colors.success),
                new Phaser.GameObjects.Rectangle(TestUtils.scene(), 0, 0, 100, 30, Colors.info),
                new Phaser.GameObjects.Rectangle(TestUtils.scene(), 0, 0, 300, 20, Colors.primary)
            ]
        });
        TestUtils.scene().add.existing(flex);

        expect(flex.rows).withContext('should wrap to 3 rows').toBe(3);
        expect(flex.width).withContext('width should stay as specified').toBe(300);
        expect(flex.height).withContext('height should be based on tallest object in each row').toBe(40 + 30 + 20);
    });

    it('allows removal of content individually', () => {
        const removeMe: LayoutContent = new Phaser.GameObjects.Rectangle(TestUtils.scene(), 0, 0, 100, 20, Colors.success);
        const flex: FlexLayout = new FlexLayout(TestUtils.scene(), {
            width: 300,
            contents: [
                new Phaser.GameObjects.Rectangle(TestUtils.scene(), 0, 0, 150, 20, Colors.warning),
                new Phaser.GameObjects.Rectangle(TestUtils.scene(), 0, 0, 150, 40, Colors.danger),
                new Phaser.GameObjects.Rectangle(TestUtils.scene(), 0, 0, 100, 30, Colors.light),
                removeMe,
                new Phaser.GameObjects.Rectangle(TestUtils.scene(), 0, 0, 100, 30, Colors.info),
                new Phaser.GameObjects.Rectangle(TestUtils.scene(), 0, 0, 300, 20, Colors.primary)
            ]
        });
        TestUtils.scene().add.existing(flex);
        flex.removeContent(removeMe);

        expect(flex.rows).withContext('removing content should not affect rows due to content sizes').toBe(3);
        expect(flex.contents.length).withContext('expect one content removed').toBe(5);
    });

    it('can pad the content', () => {
        const flex: FlexLayout = new FlexLayout(TestUtils.scene(), {
            width: 300,
            padding: 5,
            contents: [
                new Phaser.GameObjects.Rectangle(TestUtils.scene(), 0, 0, 142.5, 20, Colors.warning),
                new Phaser.GameObjects.Rectangle(TestUtils.scene(), 0, 0, 142.5, 40, Colors.danger),
                new Phaser.GameObjects.Rectangle(TestUtils.scene(), 0, 0, 93, 30, Colors.light),
                new Phaser.GameObjects.Rectangle(TestUtils.scene(), 0, 0, 93, 20, Colors.success),
                new Phaser.GameObjects.Rectangle(TestUtils.scene(), 0, 0, 93, 30, Colors.info),
                new Phaser.GameObjects.Rectangle(TestUtils.scene(), 0, 0, 290, 20, Colors.primary)
            ]
        });
        TestUtils.scene().add.existing(flex);

        expect(flex.rows).withContext('expect 3 rows').toBe(3);
    });

    it('will scale contents that are too wide to fit', () => {
        const flex: FlexLayout = new FlexLayout(TestUtils.scene(), {
            width: 300,
            contents: [
                new Phaser.GameObjects.Rectangle(TestUtils.scene(), 0, 0, 100, 20, Colors.warning),
                new Phaser.GameObjects.Rectangle(TestUtils.scene(), 0, 0, 301, 40, Colors.danger)
            ]
        });
        TestUtils.scene().add.existing(flex);

        expect(flex.rows).withContext('expect 2 rows').toBe(2);
        expect((flex.contents[1] as Phaser.GameObjects.Rectangle).scaleX).toBeLessThan(1);
    });
});