import { CardImage, Styles } from "../../src";
import { TestUtils } from "../test-utils";

describe('CardImage', () => {
    beforeAll((done) => {
        TestUtils.game(done);
    });

    beforeEach(() => {
        TestUtils.clear();
    });

    it('can be instantiated with no options', () => {
        const image: CardImage = new CardImage(TestUtils.scene());
        TestUtils.scene().add.existing(image);

        expect(image).withContext('object should be defined').toBeDefined();
        expect(image.sprite).withContext('sprite should not be defined').toBeUndefined();
        expect(image.background).withContext('background should not be defined').toBeUndefined();
        expect(image.width).withContext('full width').toBe(TestUtils.scene().sys.game.scale.gameSize.width);
        expect(image.height).withContext('height defaults to width').toBe(image.width);
    });

    it('can be created with only a background', () => {
        const image: CardImage = new CardImage(TestUtils.scene(), {
            width: 200,
            background: Styles.Outline.danger().graphics
        });
        TestUtils.scene().add.existing(image);

        expect(image.background).withContext('background should be defined').toBeDefined();
        expect(image.sprite).withContext('sprite should not be defined').toBeUndefined();
        expect(image.width).withContext('width is set').toBe(200);
        expect(image.height).withContext('height defaults to width').toBe(200);
    });

    it('can be created with an image', () => {
        const image: CardImage = new CardImage(TestUtils.scene(), {
            width: 200,
            spriteKey: 'sample-spritesheet'
        });
        TestUtils.scene().add.existing(image);

        expect(image.background).withContext('background should not be defined').toBeUndefined();
        expect(image.sprite).withContext('sprite should be defined').toBeDefined();
        expect(image.width).withContext('width is set').toBe(200);
        expect(image.height).withContext('height defaults to width').toBe(200);
    });

    it('can have the image added after instantiation', () => {
        const image: CardImage = new CardImage(TestUtils.scene(), {
            width: 200
        });
        TestUtils.scene().add.existing(image);

        expect(image.sprite).withContext('sprite should not be defined').toBeUndefined();

        image.setSprite('sample-spritesheet');

        expect(image.sprite).withContext('sprite should be defined').toBeDefined();
        expect(image.sprite.width).withContext('image actual size is greater than CardImage width').toBeGreaterThan(200);
        expect(image.sprite.displayWidth).withContext('image should be scaled to specified width').toBe(200);
        expect(image.sprite.displayHeight).withContext('image height should be scaled with width').toBe(200);
    });

    it('can have the background added after instantiation', () => {
        const image: CardImage = new CardImage(TestUtils.scene(), {
            width: 200
        });
        TestUtils.scene().add.existing(image);

        expect(image.background).withContext('background should not be defined').toBeUndefined();

        image.setBackground(Styles.light().graphics);

        expect(image.background).withContext('background should be defined').toBeDefined();
    });
});