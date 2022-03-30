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

        expect(flex.rows).toBe(3);
    });

    it('allows removal of content individually', () => {
        const removeMe: LayoutContent = new Phaser.GameObjects.Rectangle(TestUtils.scene(), 0, 0, 300, 20, Colors.primary);
        const flex: FlexLayout = new FlexLayout(TestUtils.scene(), {
            width: 300,
            contents: [
                new Phaser.GameObjects.Rectangle(TestUtils.scene(), 0, 0, 150, 20, Colors.warning),
                new Phaser.GameObjects.Rectangle(TestUtils.scene(), 0, 0, 150, 40, Colors.danger),
                new Phaser.GameObjects.Rectangle(TestUtils.scene(), 0, 0, 100, 30, Colors.light),
                new Phaser.GameObjects.Rectangle(TestUtils.scene(), 0, 0, 100, 20, Colors.success),
                new Phaser.GameObjects.Rectangle(TestUtils.scene(), 0, 0, 100, 30, Colors.info),
                removeMe
            ]
        });
        TestUtils.scene().add.existing(flex);
        flex.removeContent(removeMe);

        expect(flex.rows).toBe(2);
    });
});