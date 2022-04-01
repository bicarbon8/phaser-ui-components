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
        opts.text = 'sample text';
        const button: TextButton = new TextButton(TestUtils.scene(), TextButtonOptions.info(opts));
        TestUtils.scene().add.existing(button);
        
        expect(button.text.width).toBe(button.width);
    });

    it('scales the text if text is wider than specified width', () => {
        const opts: TextButtonOptions = {};
        opts.text = 'aaaaaaaabbbbbbbbccccccccddddddddeeeeeeeeffffffffgggggggghhhhhhhhiiiiiiiijjjjjjjjkkkkkkkkllllllll';
        opts.width = 100;
        const button: TextButton = new TextButton(TestUtils.scene(), TextButtonOptions.primary(opts));
        TestUtils.scene().add.existing(button);

        expect(button.width).toBe(opts.width);
        expect(button.text.displayWidth).toBe(opts.width);
        expect(button.text.width).toBeGreaterThan(opts.width);
    });

    it('centers the text within the button', () => {
        const opts: TextButtonOptions = {};
        opts.text = '-';
        opts.width = 200;
        opts.height = 200;
        const button: TextButton = new TextButton(TestUtils.scene(), TextButtonOptions.Outline.warning(opts));
        TestUtils.scene().add.existing(button);

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
        const button: TextButton = new TextButton(TestUtils.scene(), TextButtonOptions.info(opts));
        TestUtils.scene().add.existing(button);

        expect(button.width).toBe(button.text.width + (opts.padding * 2));
        expect(button.height).toBe(button.text.height + (opts.padding * 2));
        const textBounds: Phaser.Geom.Rectangle = button.text.getBounds();
        expect(button.top).toBe(textBounds.top - opts.padding);
        expect(button.bottom).toBe(textBounds.bottom + opts.padding);
        expect(button.left).toBe(textBounds.left - opts.padding);
        expect(button.right).toBe(textBounds.right + opts.padding);
    });

    it('can add rounded corners', () => {
        const opts: TextButtonOptions = {};
        opts.text = 'Sample Text';
        opts.cornerRadius = 5;
        const button: TextButton = new TextButton(TestUtils.scene(), TextButtonOptions.info(opts));
        TestUtils.scene().add.existing(button);

        expect(button.width).toBe(button.text.width);
        expect(button.height).toBe(button.text.height);
    });

    it('will destroy existing text when new text is set', () => {
        const opts: TextButtonOptions = {};
        opts.text = 'Sample Text';
        opts.padding = 10;
        opts.cornerRadius = 5;
        const button: TextButton = new TextButton(TestUtils.scene(), TextButtonOptions.Outline.info(opts));
        TestUtils.scene().add.existing(button);

        expect(button.text.text).withContext('original text').toEqual(opts.text);

        const spy = spyOn(button.text, 'destroy').and.callThrough();
        button.setText('New Text');

        expect(button.text.text).withContext('updated text').toEqual('New Text');
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('will does not modify size when text changes', () => {
        const opts: TextButtonOptions = {};
        opts.text = 'Sample Long Text';
        opts.padding = 10;
        opts.cornerRadius = 5;
        const button: TextButton = new TextButton(TestUtils.scene(), TextButtonOptions.Outline.info(opts));
        TestUtils.scene().add.existing(button);

        const originalWidth: number = button.width;

        button.setText('Short Text');

        expect(button.width).withContext('shorter text').toBe(originalWidth);

        button.setText('Some Even Longer Long Text');

        expect(button.width).withContext('longer text').toBe(originalWidth);
    });

    it('allows background style to be udpated', () => {
        const opts: TextButtonOptions = {};
        opts.text = 'Sample Text';
        opts.padding = 10;
        opts.cornerRadius = 5;
        const button: TextButton = new TextButton(TestUtils.scene(), TextButtonOptions.Outline.success(opts));
        TestUtils.scene().add.existing(button);

        expect(button.background.defaultStrokeColor).withContext('original color').toEqual(Colors.success);

        const spy = spyOn(button.background, 'destroy').and.callThrough();
        button.setBackground({fillStyle: {color: Colors.warning}});

        expect(button.background.defaultFillColor).withContext('new color').toEqual(Colors.warning);
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('can align the text horizontally left', () => {
        const button: TextButton = new TextButton(TestUtils.scene(), TextButtonOptions.Outline.secondary({
            width: 500,
            text: 'align left',
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
            width: 500,
            text: 'align right',
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
            height: 200,
            text: 'align top',
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
            height: 200,
            text: 'align bottom',
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
            width: 500,
            height: 200,
            text: 'align top left',
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
});