import * as Phaser from 'phaser';
import { Colors, Styles } from '../../src';
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
        opts.textConfig = {text: 'sample text'};
        const button: TextButton = new TextButton(TestUtils.scene(), TextButtonOptions.info(opts));
        TestUtils.scene().add.existing(button);

        const txt = button.text;
        
        expect(txt.width).toBe(button.width);
    });

    it('scales the text if text is wider than specified width', () => {
        const opts: TextButtonOptions = {
            textConfig: {text: 'aaaaaaaabbbbbbbbccccccccddddddddeeeeeeeeffffffffgggggggghhhhhhhhiiiiiiiijjjjjjjjkkkkkkkkllllllll'},
            width: 100
        };
        const button: TextButton = new TextButton(TestUtils.scene(), TextButtonOptions.primary(opts));
        TestUtils.scene().add.existing(button);

        const txt = button.text;

        expect(button.width).withContext('button.width').toBe(opts.width);
        expect(txt.displayWidth).withContext('txt.displayWidth').toBe(opts.width);
        expect(txt.width).withContext('text width expected to be greater than container').toBeGreaterThan(opts.width);
    });

    it('centers the text within the button', () => {
        const opts: TextButtonOptions = {};
        opts.textConfig = {text: '-'};
        opts.width = 200;
        opts.height = 200;
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
        const opts: TextButtonOptions = {
            textConfig: {text: 'Sample Text'},
            padding: 10
        };
        const button: TextButton = new TextButton(TestUtils.scene(), TextButtonOptions.info(opts));
        TestUtils.scene().add.existing(button);

        const txt = button.text;

        expect(button.width).withContext('expect button to be width of text plus padding').toBe(txt.width + (opts.padding * 2));
        expect(button.height).withContext('expect button to be height of text plus padding').toBe(txt.height + (opts.padding * 2));
        const textBounds: Phaser.Geom.Rectangle = txt.getBounds();
        expect(button.top).toBe(textBounds.top - opts.padding);
        expect(button.bottom).toBe(textBounds.bottom + opts.padding);
        expect(button.left).toBe(textBounds.left - opts.padding);
        expect(button.right).toBe(textBounds.right + opts.padding);
    });

    it('can add rounded corners', () => {
        const opts: TextButtonOptions = {};
        opts.textConfig = {text: 'Sample Text'};
        opts.cornerRadius = 5;
        const button: TextButton = new TextButton(TestUtils.scene(), TextButtonOptions.info(opts));
        TestUtils.scene().add.existing(button);

        const txt = button.text;

        expect(button.width).toBe(txt.width);
        expect(button.height).toBe(txt.height);
    });

    it('will destroy existing text when new text is set', () => {
        const opts: TextButtonOptions = {};
        opts.textConfig = {text: 'Sample Text'};
        opts.padding = 10;
        opts.cornerRadius = 5;
        const button: TextButton = new TextButton(TestUtils.scene(), TextButtonOptions.Outline.info(opts));
        TestUtils.scene().add.existing(button);

        expect(button.text.text).withContext('original text').toEqual(opts.textConfig.text);

        const spy = spyOn<any>(button['_text'], 'destroy').and.callThrough();
        button.setText({text: 'New Text'});

        expect(button.text.text).withContext('updated text').toEqual('New Text');
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('updates size when text changes if desiredWidth not set', () => {
        const opts: TextButtonOptions = {};
        opts.textConfig = {text: 'Sample Long Text'};
        opts.padding = 10;
        opts.cornerRadius = 5;
        const button: TextButton = new TextButton(TestUtils.scene(), TextButtonOptions.Outline.info(opts));
        TestUtils.scene().add.existing(button);

        const originalWidth: number = button.width;

        button.setText({text: 'Short Text'});

        expect(button.width).withContext('shorter text').not.toBe(originalWidth);

        button.setText({text: 'Some Even Longer Long Text'});

        expect(button.width).withContext('longer text').not.toBe(originalWidth);
    });

    it('does not update size when text changes if desiredWidth set', () => {
        const opts: TextButtonOptions = {
            width: 300
        };
        opts.textConfig = {text: 'Sample Long Text'};
        opts.padding = 10;
        opts.cornerRadius = 5;
        const button: TextButton = new TextButton(TestUtils.scene(), TextButtonOptions.Outline.info(opts));
        TestUtils.scene().add.existing(button);

        const originalWidth: number = button.width;
        expect(originalWidth).withContext('original width should be desiredWidth').toBe(300);

        button.setText({text: 'Short Text'});

        expect(button.width).withContext('shorter text').toBe(originalWidth);

        button.setText({text: 'Some Even Longer Long Text'});

        expect(button.width).withContext('longer text').toBe(originalWidth);
    });

    it('allows background style to be udpated', () => {
        const opts: TextButtonOptions = {};
        opts.textConfig = {text: 'Sample Text'};
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
            width: 500,
            textConfig: {
                text: 'align left', 
                style: Styles.Outline.secondary().text
            },
            alignment: {horizontal: 'left'},
            padding: 5,
            cornerRadius: 5
        }));
        TestUtils.scene().add.existing(button);

        expect(button.text.x).withContext('x should be less than 0').toBeLessThan(0);
        expect(button.text.x - (button.text.displayWidth / 2)).withContext('text should be offset by padding').toBe(-(button.width / 2) + 5);
        expect(button.text.y).withContext('text should be vertically centered').toBe(0);
    });

    it('can align the text horizontally right', () => {
        const button: TextButton = new TextButton(TestUtils.scene(), TextButtonOptions.Outline.warning({
            width: 500,
            textConfig: {text: 'align right'},
            alignment: {horizontal: 'right'},
            padding: 5,
            cornerRadius: 5
        }));
        TestUtils.scene().add.existing(button);

        expect(button.text.x).toBeGreaterThan(0);
        expect(button.text.x + (button.text.displayWidth / 2)).toBe((button.width / 2) - 5);
        expect(button.text.y).toBe(0);
    });

    it('can align the text vertically top', () => {
        const button: TextButton = new TextButton(TestUtils.scene(), TextButtonOptions.light({
            height: 200,
            textConfig: {text: 'align top'},
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
            textConfig: {text: 'align bottom'},
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
            textConfig: {text: 'align top left'},
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

    it('can set the onClick behaviour via ctor options', () => {
        const button: TextButton = new TextButton(TestUtils.scene(), TextButtonOptions.secondary({
            textConfig: {text: 'interactive'},
            padding: 10,
            cornerRadius: 10,
            onClick: () => {
                button.setText({
                    text: 'clicked',
                    style: Styles.warning().text
                });
                button.setBackground(Styles.warning().graphics);
            }
        }));
        TestUtils.scene().add.existing(button);
        
        expect(button).toBeDefined();
        expect(button.text.text).withContext('expect original text').toEqual('interactive');

        button.setClicking(true);
        expect(button.text.text).withContext('expect text change on click').toEqual('clicked');

        button.setClicking(false);
        expect(button.text.text).withContext('expect original text').toEqual('interactive');
    });

    it('can set the onHover behaviour via ctor options', () => {
        const button: TextButton = new TextButton(TestUtils.scene(), TextButtonOptions.secondary({
            textConfig: {text: 'interactive'},
            padding: 10,
            cornerRadius: 10,
            onHover: () => {
                button.setText({
                    text: 'hovering',
                    style: Styles.success().text
                });
                button.setBackground(Styles.success().graphics);
            }
        }));
        TestUtils.scene().add.existing(button);
        
        expect(button).toBeDefined();
        expect(button.text.text).withContext('expect original text').toEqual('interactive');

        button.setHovering(true);
        expect(button.text.text).withContext('expect text change on click').toEqual('hovering');

        button.setHovering(false);
        expect(button.text.text).withContext('expect original text').toEqual('interactive');
    });

    it('can set the onClick and onHover behaviour via ctor options', () => {
        const button: TextButton = new TextButton(TestUtils.scene(), TextButtonOptions.secondary({
            textConfig: {text: 'interactive'},
            padding: 10,
            cornerRadius: 10,
            onClick: () => {
                button.setText({
                    text: 'clicked',
                    style: Styles.warning().text
                });
                button.setBackground(Styles.warning().graphics);
            },
            onHover: () => {
                button.setText({
                    text: 'hovering',
                    style: Styles.success().text
                });
                button.setBackground(Styles.success().graphics);
            }
        }));
        TestUtils.scene().add.existing(button);
        
        expect(button).toBeDefined();
        expect(button.text.text).withContext('expect original text').toEqual('interactive');

        button.setHovering(true);
        expect(button.hovering).withContext('expect hovering state to be true').toBeTrue();
        expect(button.text.text).withContext('expect text change on click').toEqual('hovering');
        button.setClicking(true);
        expect(button.clicking).withContext('expect clicking state to be true').toBeTrue();
        expect(button.text.text).withContext('expect text change on click').toEqual('clicked');

        button.setClicking(false);
        expect(button.clicking).withContext('expect clicking state to be false').toBeFalse();
        expect(button.text.text).withContext('expect original text').toEqual('hovering');
        button.setHovering(false);
        expect(button.hovering).withContext('expect hovering state to be false').toBeFalse();
        expect(button.text.text).withContext('expect original text').toEqual('interactive');

        button.setClicking(true); 
        expect(button.hovering).withContext('expect hovering state to be true when clicking').toBeTrue();

        button.setHovering(false);
        expect(button.clicking).withContext('expect clicking state to be false when hovering stops').toBeFalse();
    });

    it('allows the text colour to be updated without resetting the text or other styles', () => {
        const button: TextButton = new TextButton(TestUtils.scene(), TextButtonOptions.danger({
            textConfig: {text: 'sample text', style: {color: Colors.toHexString(Colors.light)}},
            padding: 10,
            cornerRadius: {tl: 5, bl: 5}
        }));
        TestUtils.scene().add.existing(button);

        expect(button.text.style.color).withContext('original color is set').toEqual(Colors.toHexString(Colors.light));

        button.setText({style: {color: Colors.toHexString(Colors.warning)}});

        expect(button.text.text).withContext('text is still set').toEqual('sample text');
        expect(button.text.style.color).withContext('new color is set').toEqual(Colors.toHexString(Colors.warning));
    });

    it('can be disabled via contructor options', () => {
        const button: TextButton = new TextButton(TestUtils.scene(), TextButtonOptions.secondary({
            textConfig: {text: 'disabled'},
            disabled: true
        }));

        expect(button.enabled).withContext('expect button.enabled is false').toBeFalse();
    });

    it('defaults to enabled if not set in contructor options', () => {
        const button: TextButton = new TextButton(TestUtils.scene(), TextButtonOptions.secondary({
            textConfig: {text: 'enabled'}
        }));

        expect(button.enabled).withContext('expect button.enabled is true').toBeTrue();
    });

    it('allows modification of the enabled state after creation', () => {
        const button: TextButton = new TextButton(TestUtils.scene(), TextButtonOptions.secondary({
            textConfig: {text: 'enabled'}
        }));
        button.setEnabled(false);

        expect(button.enabled).withContext('expect button.enabled is false').toBeFalse();
    });
});