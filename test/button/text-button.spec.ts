import * as Phaser from 'phaser';
import { TextButton } from "../../src/button/text-button";
import { TextButtonOptions } from '../../src/button/text-button-options';

var game: Phaser.Game;
var scene: Phaser.Scene;

describe('TextButton', () => {
    beforeAll((done) => {
        if (game) {game.destroy(true, true);}
        game = new Phaser.Game({
            type: Phaser.AUTO,
            scene: {
                init: function () {
                    scene = this;
                    done();
                }
            },
            callbacks: {
                postBoot: function () {
                    game.loop.stop();
                }
            }
        });
    });

    beforeEach(() => {
        scene.cameras.main.centerOn(0, 0);
        scene.children.each((c: Phaser.GameObjects.GameObject) => c.destroy());
    });

    it('sets its width based on text if not specified', () => {
        const opts: TextButtonOptions = {}; 
        opts.text = 'sample text';
        const button: TextButton = TextButton.info(scene, opts);
        scene.add.existing(button);
        
        expect(button.text.width).toBe(button.width);
    });

    it('scales the text if text is wider than specified width', () => {
        const opts: TextButtonOptions = {};
        opts.text = 'aaaaaaaabbbbbbbbccccccccddddddddeeeeeeeeffffffffgggggggghhhhhhhhiiiiiiiijjjjjjjjkkkkkkkkllllllll';
        opts.width = 100;
        const button: TextButton = TextButton.primary(scene, opts);
        scene.add.existing(button);

        expect(button.width).toBe(opts.width);
        expect(button.text.displayWidth).toBe(opts.width);
        expect(button.text.width).toBeGreaterThan(opts.width);
    });

    it('centers the text within the button', () => {
        const opts: TextButtonOptions = {};
        opts.text = '-';
        opts.width = 200;
        opts.height = 200;
        const button: TextButton = TextButton.Outline.warning(scene, opts);
        scene.add.existing(button);

        expect(button.text.originX).toBe(0.5);
        expect(button.text.originY).toBe(0.5);
        expect(button.text.x).toBe(0);
        expect(button.text.y).toBe(0);
        expect(button.width).toBeGreaterThan(button.text.width);
        const textBounds: Phaser.Geom.Rectangle = button.text.getBounds();
        expect(button.width).toBeGreaterThan(textBounds.width);
        expect(button.height).toBeGreaterThan(textBounds.height);
        expect(textBounds.left).toBeGreaterThan(button.left);
        expect(textBounds.right).toBeLessThan(button.right);
        expect(textBounds.top).toBeGreaterThan(button.top);
        expect(textBounds.bottom).toBeLessThan(button.bottom);
    });

    it('can add padding around the text', () => {
        const opts: TextButtonOptions = {};
        opts.text = 'Sample Text';
        opts.padding = 10;
        const button: TextButton = TextButton.info(scene, opts);
        scene.add.existing(button);

        expect(button.width).toBe(button.text.width + (opts.padding * 2));
        expect(button.height).toBe(button.text.height + (opts.padding * 2));
        const textBounds: Phaser.Geom.Rectangle = button.text.getBounds();
        expect(button.top).toBe(textBounds.top - opts.padding);
        expect(button.bottom).toBe(textBounds.bottom + opts.padding);
        expect(button.left).toBe(textBounds.left - opts.padding);
        expect(button.right).toBe(textBounds.right + opts.padding);
    });
});