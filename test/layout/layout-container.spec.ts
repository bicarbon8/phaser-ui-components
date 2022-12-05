import { LayoutContainer } from "../../src";
import { TestUtils } from "../test-utils";

describe('LayoutContainer', () => {
    beforeAll((done) => {
        TestUtils.game(done);
    });

    beforeEach(() => {
        TestUtils.clear();
    });
    
    it('will set size based on content if not specified', () => {
        const scene = TestUtils.scene();
        const text = scene.make.text({text: 'sample text to verify dimensions'}, false);
        const container = new LayoutContainer(scene, {
            content: text
        });
        scene.add.existing(container);

        expect(text.width).withContext('container width should match content width').toEqual(container.width);
        expect(text.height).withContext('container height should match content height').toEqual(container.height);
    });

    it('can have width and height specified', () => {
        const scene = TestUtils.scene();
        const text = scene.make.text({text: 'sample text to verify dimensions'}, false);
        const container = new LayoutContainer(scene, {
            width: 500,
            height: 200,
            content: text
        });
        scene.add.existing(container);

        expect(container.width).withContext('container width should be greater than content width').toBeGreaterThan(text.width);
        expect(container.height).withContext('container height should be greater than content height').toBeGreaterThan(text.height);
    });

    it('can align content left', () => {
        const scene = TestUtils.scene();
        const graphics = scene.make.graphics({fillStyle: {color: 0xff6060}}, false);
        graphics.fillRect(-25, -2, 50, 4);
        const gContainer = scene.add.container(0, 0, [graphics]);
        gContainer.setSize(50, 4);
        const container = new LayoutContainer(scene, {
            width: 102,
            height: 6,
            padding: 1,
            content: gContainer,
            alignment: {horizontal: 'left'},
            background: {fillStyle: {color: 0xffffff}}
        });
        scene.add.existing(container);

        expect(gContainer.x).withContext('content should be at -25 x').toEqual(-25);
        expect(gContainer.y).withContext('content should be at 0 y').toEqual(0);
    });

    it('can align content right', () => {
        const scene = TestUtils.scene();
        const graphics = scene.make.graphics({fillStyle: {color: 0xff6060}}, false);
        graphics.fillRect(-25, -2, 50, 4);
        const gContainer = scene.add.container(0, 0, [graphics]);
        gContainer.setSize(50, 4);
        const container = new LayoutContainer(scene, {
            width: 102,
            height: 6,
            padding: 1,
            content: gContainer,
            alignment: {horizontal: 'right'},
            background: {fillStyle: {color: 0xffffff}}
        });
        scene.add.existing(container);

        expect(gContainer.x).withContext('content should be at 25 x').toEqual(25);
        expect(gContainer.y).withContext('content should be at 0 y').toEqual(0);
    });
})