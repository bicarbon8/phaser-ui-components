import * as Phaser from 'phaser';
import { Colors } from '../../src';
import { TextButton } from "../../src/button/text-button";
import { TextButtonOptions } from '../../src/button/text-button-options';
import { TestUtils } from '../test-utils';

describe('TextButton', () => {
    beforeAll((done) => {
        TestUtils.game(done);
    });

    beforeEach(() => {
        TestUtils.clear();
    });

    it('sets its width based on text if not specified', () => {
        const opts: TextButtonOptions = {}; 
        opts.text = {text: 'sample text'};
        const button: TextButton = new TextButton(TestUtils.scene(), TextButtonOptions.info(opts));
        TestUtils.scene().add.existing(button);

        const txt = button.getFirst('text', 'sample text') as Phaser.GameObjects.Text;
        
        expect(txt.width).toBe(button.width);
    });

    it('scales the text if text is wider than specified width', () => {
        const opts: TextButtonOptions = {};
        opts.text = {text: 'aaaaaaaabbbbbbbbccccccccddddddddeeeeeeeeffffffffgggggggghhhhhhhhiiiiiiiijjjjjjjjkkkkkkkkllllllll'};
        opts.desiredWidth = 100;
        const button: TextButton = new TextButton(TestUtils.scene(), TextButtonOptions.primary(opts));
        TestUtils.scene().add.existing(button);

        const txt = button.getFirst('text', 'aaaaaaaabbbbbbbbccccccccddddddddeeeeeeeeffffffffgggggggghhhhhhhhiiiiiiiijjjjjjjjkkkkkkkkllllllll') as Phaser.GameObjects.Text;

        expect(button.width).toBe(opts.desiredWidth);
        expect(txt.displayWidth).toBe(opts.desiredWidth);
        expect(txt.width).toBeGreaterThan(opts.desiredWidth);
    });

    it('centers the text within the button', () => {
        const opts: TextButtonOptions = {};
        opts.text = {text: '-'};
        opts.desiredWidth = 200;
        opts.desiredHeight = 200;
        const button: TextButton = new TextButton(TestUtils.scene(), TextButtonOptions.Outline.warning(opts));
        TestUtils.scene().add.existing(button);

        const txt = button.getFirst('text', '-') as Phaser.GameObjects.Text;

        expect(txt.originX).toBe(0.5);
        expect(txt.originY).toBe(0.5);
        expect(txt.x).toBe(0);
        expect(txt.y).toBe(0);
        expect(button.width).toBeGreaterThan(txt.width);
        const textBounds: Phaser.Geom.Rectangle = txt.getBounds();
        expect(button.width).toBeGreaterThan(textBounds.width);
        expect(button.height).toBeGreaterThan(textBounds.height);
        expect(textBounds.left).toBeGreaterThan(button.left);
        expect(textBounds.right).toBeLessThan(button.right);
        expect(textBounds.top).toBeGreaterThan(button.top);
        expect(textBounds.bottom).toBeLessThan(button.bottom);
    });

    it('can add padding around the text', () => {
        const opts: TextButtonOptions = {};
        opts.text = {text: 'Sample Text'};
        opts.padding = 10;
        const button: TextButton = new TextButton(TestUtils.scene(), TextButtonOptions.info(opts));
        TestUtils.scene().add.existing(button);

        const txt = button.getFirst('text', 'Sample Text') as Phaser.GameObjects.Text;

        expect(button.width).toBe(txt.width + (opts.padding * 2));
        expect(button.height).toBe(txt.height + (opts.padding * 2));
        const textBounds: Phaser.Geom.Rectangle = txt.getBounds();
        expect(button.top).toBe(textBounds.top - opts.padding);
        expect(button.bottom).toBe(textBounds.bottom + opts.padding);
        expect(button.left).toBe(textBounds.left - opts.padding);
        expect(button.right).toBe(textBounds.right + opts.padding);
    });

    it('can add rounded corners', () => {
        const opts: TextButtonOptions = {};
        opts.text = {text: 'Sample Text'};
        opts.cornerRadius = 5;
        const button: TextButton = new TextButton(TestUtils.scene(), TextButtonOptions.info(opts));
        TestUtils.scene().add.existing(button);

        const txt = button.getFirst('text', 'Sample Text') as Phaser.GameObjects.Text;

        expect(button.width).toBe(txt.width);
        expect(button.height).toBe(txt.height);
    });

    it('will destroy existing text when new text is set', () => {
        const opts: TextButtonOptions = {};
        opts.text = {text: 'Sample Text'};
        opts.padding = 10;
        opts.cornerRadius = 5;
        const button: TextButton = new TextButton(TestUtils.scene(), TextButtonOptions.Outline.info(opts));
        TestUtils.scene().add.existing(button);

        expect(button.text.text).withContext('original text').toEqual(opts.text.text);

        const spy = spyOn<any>(button['_text'], 'destroy').and.callThrough();
        button.setText({text: 'New Text'});

        expect(button.text.text).withContext('updated text').toEqual('New Text');
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('will does not modify size when text changes', () => {
        const opts: TextButtonOptions = {};
        opts.text = {text: 'Sample Long Text'};
        opts.padding = 10;
        opts.cornerRadius = 5;
        const button: TextButton = new TextButton(TestUtils.scene(), TextButtonOptions.Outline.info(opts));
        TestUtils.scene().add.existing(button);

        const originalWidth: number = button.width;

        button.setText({text: 'Short Text'});

        expect(button.width).withContext('shorter text').toBe(originalWidth);

        button.setText({text: 'Some Even Longer Long Text'});

        expect(button.width).withContext('longer text').toBe(originalWidth);
    });

    it('allows background style to be udpated', () => {
        const opts: TextButtonOptions = {};
        opts.text = {text: 'Sample Text'};
        opts.padding = 10;
        opts.cornerRadius = 5;
        const button: TextButton = new TextButton(TestUtils.scene(), TextButtonOptions.Outline.success(opts));
        TestUtils.scene().add.existing(button);

        expect(button.background.defaultStrokeColor).withContext('original color').toEqual(Colors.success);

        const spy = spyOn<any>(button['_background'], 'destroy').and.callThrough();
        button.setBackground({fillStyle: {color: Colors.warning}});

        expect(button.background.defaultFillColor).withContext('new color').toEqual(Colors.warning);
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('can align the text horizontally left', () => {
        const button: TextButton = new TextButton(TestUtils.scene(), TextButtonOptions.Outline.secondary({
            desiredWidth: 500,
            text: {text: 'align left'},
            alignment: {horizontal: 'left'},
            padding: 5,
            cornerRadius: 5
        }));
        TestUtils.scene().add.existing(button);

        expect(button.text.x).toBeLessThan(0);
        expect(button.text.x - (button.text.width / 2)).toBe(-(button.width / 2) + 5);
        expect(button.text.y).toBe(0);
    });

    it('can align the text horizontally right', () => {
        const button: TextButton = new TextButton(TestUtils.scene(), TextButtonOptions.Outline.warning({
            desiredWidth: 500,
            text: {text: 'align right'},
            alignment: {horizontal: 'right'},
            padding: 5,
            cornerRadius: 5
        }));
        TestUtils.scene().add.existing(button);

        expect(button.text.x).toBeGreaterThan(0);
        expect(button.text.x + (button.text.width / 2)).toBe((button.width / 2) - 5);
        expect(button.text.y).toBe(0);
    });

    it('can align the text vertically top', () => {
        const button: TextButton = new TextButton(TestUtils.scene(), TextButtonOptions.light({
            desiredHeight: 200,
            text: {text: 'align top'},
            alignment: {vertical: 'top'},
            padding: 5,
            cornerRadius: 5
        }));
        TestUtils.scene().add.existing(button);

        expect(button.text.y).toBeLessThan(0);
        expect(button.text.y - (button.text.height / 2)).toBe(-(button.height / 2) + 5);
        expect(button.text.x).toBe(0);
    });

    it('can align the text vertically bottom', () => {
        const button: TextButton = new TextButton(TestUtils.scene(), TextButtonOptions.Outline.dark({
            desiredHeight: 200,
            text: {text: 'align bottom'},
            alignment: {vertical: 'bottom'},
            padding: 5,
            cornerRadius: 5
        }));
        TestUtils.scene().add.existing(button);

        expect(button.text.y).toBeGreaterThan(0);
        expect(button.text.y + (button.text.height / 2)).toBe((button.height / 2) - 5);
        expect(button.text.x).toBe(0);
    });

    it('can align the text to top left', () => {
        const button: TextButton = new TextButton(TestUtils.scene(), TextButtonOptions.light({
            desiredWidth: 500,
            desiredHeight: 200,
            text: {text: 'align top left'},
            alignment: {horizontal: 'left', vertical: 'top'},
            padding: 5,
            cornerRadius: 5
        }));
        TestUtils.scene().add.existing(button);

        expect(button.text.x).toBeLessThan(0);
        expect(button.text.x - (button.text.width / 2)).toBe(-(button.width / 2) + 5);
        expect(button.text.y).toBeLessThan(0);
        expect(button.text.y - (button.text.height / 2)).toBe(-(button.height / 2) + 5);
    });

    it('can set the container to be interactive', () => {
        const button: TextButton = new TextButton(TestUtils.scene(), TextButtonOptions.secondary({
            text: {text: 'interactive'},
            padding: 10,
            cornerRadius: 10,
            interactive: true
        }));
        TestUtils.scene().add.existing(button);
        
        expect(() => {
            button.on(Phaser.Input.Keyboard.Events.ANY_KEY_DOWN, () => {
                const foo = 'bar';
            });
        }).not.toThrow();
    });

    it('allows the text colour to be updated without resetting the text or other styles', () => {
        const button: TextButton = new TextButton(TestUtils.scene(), TextButtonOptions.danger({
            text: {text: 'sample text', style: {color: Colors.toHexString(Colors.light)}},
            padding: 10,
            cornerRadius: {tl: 5, bl: 5}
        }));
        TestUtils.scene().add.existing(button);

        expect(button.text.style.color).withContext('original color is set').toEqual(Colors.toHexString(Colors.light));

        button.setText({style: {color: Colors.toHexString(Colors.warning)}});

        expect(button.text.text).withContext('text is still set').toEqual('sample text');
        expect(button.text.style.color).withContext('new color is set').toEqual(Colors.toHexString(Colors.warning));
    });

    it('only allows modification of text through setText function', () => {
        const button: TextButton = new TextButton(TestUtils.scene(), TextButtonOptions.warning({
            text: {text: 'sample text'},
            padding: 10
        }));
        TestUtils.scene().add.existing(button);

        button.text.setText('foo');
        button.text.text = 'bar';

        expect(button.text.text).toEqual('sample text');
    });
});