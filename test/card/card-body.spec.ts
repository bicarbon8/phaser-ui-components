import { CardBody, CardBodyOptions, Colors, TextButton, TextButtonOptions } from "../../src";
import { TestUtils } from "../test-utils";

describe('CardBody', () => {
    beforeAll((done) => {
        TestUtils.game(done);
    });

    beforeEach(() => {
        TestUtils.clear();
    });
    
    it('can be created without options', () => {
        const body: CardBody = new CardBody(TestUtils.scene());
        TestUtils.scene().add.existing(body);

        const defaultOpts: CardBodyOptions = CardBodyOptions.SET_DEFAULTS(TestUtils.scene());
        expect(body).withContext('CardBody is not null or undefined').toBeDefined();
        expect(body.title).withContext('title should not be defined').toBeUndefined();
        expect(body.description).withContext('description should not be defined').toBeUndefined();
        expect(body.background).withContext('background should not be defined').toBeUndefined();
        expect(body.width).withContext('width should be default value').toBe(defaultOpts.width);
        expect(body.height).withContext('height should be 0').toBe(0);
        expect(body.padding).withContext('padding should be default value').toBe(defaultOpts.padding);
    });

    it('can be created with only a title', () => {
        const body: CardBody = new CardBody(TestUtils.scene(), {
            width: 300,
            title: {
                text:'sample title text', 
                style: {color: Colors.toHexString(Colors.warning)}
            }
        });
        TestUtils.scene().add.existing(body);

        expect(body.title).withContext('title is defined').toBeDefined();
        expect(body['_title'].y).withContext('title is at y=0').toBe(0);
        expect(body.background).withContext('background should not be defined').not.toBeDefined();
        expect(body.width).withContext('body should be wider than title text').toBeGreaterThan(body['_title'].width);
        expect(body.height).withContext('body should be height of title text').toBe(body['_title'].height);
    });

    it('allows the title to be set later', () => {
        const body: CardBody = new CardBody(TestUtils.scene(), {
            width: 300
        });
        TestUtils.scene().add.existing(body);

        expect(body.title).toBeUndefined();

        body.setTitle({text: 'new title text', style: {stroke: Colors.toHexString(Colors.light)}});

        expect(body.title.text).toEqual('new title text');
    });

    it('removing and re-adding title text maintains correct positioning', () => {
        const body: CardBody = new CardBody(TestUtils.scene(), CardBodyOptions.Outline.success({
            width: 300,
            title: {text:'sample title text'},
            description: {text:'sample description'},
            buttons: [TextButtonOptions.Outline.danger({
                text: {text:'button text'},
                padding: 10
            })]
        }));
        TestUtils.scene().add.existing(body);

        body.setTitle({text:'new title text'});

        expect(body.title.text).withContext('updated text').toEqual('new title text');
        expect(body.contents.length).withContext('should have 3 contents').toBe(3);
        expect(body.contents[0]).withContext('first contents should be title').toBe(body['_title']);
        expect(body.description).withContext('description should be defined').toBeDefined();
        expect(body.contents[1]).withContext('second contents should be description').toBe(body['_description']);
        expect(body.buttons.length).withContext('button should still exist').toBe(1);
    });

    it('can be created with only a description', () => {
        const body: CardBody = new CardBody(TestUtils.scene(), {
            width: 300,
            description: {
                text: 'sample description',
                style: {color: Colors.toHexString(Colors.light)}
            }
        });
        TestUtils.scene().add.existing(body);

        expect(body.description).withContext('description is defined').toBeDefined();
        expect(body['_description'].y).withContext('description is at y=0').toBe(0);
        expect(body.background).withContext('background should not be defined').not.toBeDefined();
        expect(body.width).withContext('body should be wider than description text').toBeGreaterThan(body['_description'].width);
        expect(body.height).withContext('body should be height of description text').toBe(body['_description'].height);
    });

    it('allows the description to be set later', () => {
        const body: CardBody = new CardBody(TestUtils.scene(), {
            width: 300
        });
        TestUtils.scene().add.existing(body);

        expect(body.description).toBeUndefined();

        body.setDescription({text: 'new description', style: {color: Colors.toHexString(Colors.light), stroke: Colors.toHexString(Colors.dark)}});

        expect(body.description.text).toEqual('new description');
    });

    it('removing and re-adding description text maintains correct positioning', () => {
        const body: CardBody = new CardBody(TestUtils.scene(), CardBodyOptions.Outline.success({
            width: 300,
            title: {text: 'sample title text'},
            description: {text: 'sample description'},
            buttons: [TextButtonOptions.Outline.danger({
                text: {text:'button text'},
                padding: 10
            })]
        }));
        TestUtils.scene().add.existing(body);

        body.setDescription({text: 'new description'});

        expect(body.description.text).withContext('updated text').toEqual('new description');
        expect(body.contents.length).withContext('should have 3 contents').toBe(3);
        expect(body.contents[0]).withContext('first contents should be title').toBe(body['_title']);
        expect(body.description).withContext('description should be defined').toBeDefined();
        expect(body.contents[1]).withContext('second contents should be description').toBe(body['_description']);
        expect(body.buttons.length).withContext('button should still exist').toBe(1);
    });

    it('can be created with a title and a background', () => {
        const body: CardBody = new CardBody(TestUtils.scene(), CardBodyOptions.danger({
            width: 300,
            title: {text: 'sample title text'}
        }));
        TestUtils.scene().add.existing(body);

        expect(body.title).withContext('title is defined').toBeDefined();
        expect(body.background).withContext('background is defined').toBeDefined();
        expect(body.width).withContext('width').toBe(300);
        expect(body.height).withContext('height').toBe(body['_title'].height);
    });

    it('can be created with only buttons', () => {
        const body: CardBody = new CardBody(TestUtils.scene(), {
            width: 500,
            buttons: [
                TextButtonOptions.Outline.success({
                    text: {text: 'button one'},
                    width: 200,
                    padding: 10,
                    cornerRadius: 5
                }),
                TextButtonOptions.info({
                    text: {text: 'button two'},
                    width: 200,
                    padding: 10,
                    cornerRadius: 5
                })
            ]
        });
        TestUtils.scene().add.existing(body);

        expect(body.buttons.length).withContext('buttons exist').toBe(2);
        body.buttons.forEach((b: TextButton) => {
            expect(b.y).withContext('button should be at y=0').toBe(0);
        });
        expect(body.background).withContext('background is not defined').not.toBeDefined();
        expect(body.width).withContext('width').toBe(500);
        expect(body.height).withContext('height').toBe(body.buttons[0].height);
    });

    it('allows the buttons to be set later', () => {
        const body: CardBody = new CardBody(TestUtils.scene(), {
            width: 300
        });
        TestUtils.scene().add.existing(body);

        expect(body.buttons).withContext('buttons array empty').toHaveSize(0);

        body.addButtons(TextButtonOptions.light({
            text: {text:'button text'},
            padding: 10,
            cornerRadius: 5
        }));

        expect(body.buttons).withContext('buttons array size').toHaveSize(1);
    });

    it('removing and re-adding buttons text maintains correct positioning', () => {
        const body: CardBody = new CardBody(TestUtils.scene(), CardBodyOptions.Outline.success({
            width: 300,
            title: {text: 'sample title text'},
            description: {text: 'sample description'},
            buttons: [TextButtonOptions.Outline.danger({
                text: {text:'button text'},
                padding: 10
            })]
        }));
        TestUtils.scene().add.existing(body);

        body.removeAllButtons();
        body.addButtons(TextButtonOptions.light({
            text: {text:'new button'},
            padding: 10,
            cornerRadius: 5
        }));

        expect(body.buttons[0].text.text).withContext('updated button').toEqual('new button');
        expect(body.contents.length).withContext('should have 3 contents').toBe(3);
        expect(body.contents[0]).withContext('first contents should be title').toBe(body['_title']);
        expect(body.description).withContext('description should be defined').toBeDefined();
        expect(body.contents[1]).withContext('second contents should be description').toBe(body['_description']);
    });
});