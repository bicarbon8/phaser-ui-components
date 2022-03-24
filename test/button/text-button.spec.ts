import * as Phaser from 'phaser';
import { ButtonStyle } from '../../src';
import { TextButton } from "../../src/button/text-button";

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
        const button: TextButton = new TextButton(scene, {
            text: 'sample text',
            buttonStyle: ButtonStyle.info
        });
        scene.add.existing(button);
        
        expect(button.text.width).toBe(button.width);
    });

    it('scales the text if text is wider than specified width', () => {
        const button: TextButton = new TextButton(scene, {
            text: 'aaaaaaaabbbbbbbbccccccccddddddddeeeeeeeeffffffffgggggggghhhhhhhhiiiiiiiijjjjjjjjkkkkkkkkllllllll',
            width: 100,
            buttonStyle: ButtonStyle.primary
        });
        scene.add.existing(button);

        expect(button.width).toBe(100);
        expect(button.text.displayWidth).toBe(100);
        expect(button.text.width).toBeGreaterThan(100);
    });

    it('centers the text within the button', () => {
        const button: TextButton = new TextButton(scene, {
            text: '-',
            width: 200,
            height: 200,
            buttonStyle: ButtonStyle.danger
        });
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
        const button: TextButton = new TextButton(scene, {
            text: 'Sample Text',
            padding: 10,
            buttonStyle: ButtonStyle.info
        });
        scene.add.existing(button);

        expect(button.width).toBe(button.text.width + 20);
        expect(button.height).toBe(button.text.height + 20);
        const textBounds: Phaser.Geom.Rectangle = button.text.getBounds();
        expect(button.top).toBe(textBounds.top - 10);
        expect(button.bottom).toBe(textBounds.bottom + 10);
        expect(button.left).toBe(textBounds.left - 10);
        expect(button.right).toBe(textBounds.right + 10);
    });
});