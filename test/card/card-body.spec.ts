import { CardBody, CardBodyOptions, Colors, Styles, TextButton } from "../../src";
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

        const defaultOpts: CardBodyOptions = CardBodyOptions.setDefaultOptions();
        expect(body).withContext('CardBody is not null or undefined').toBeDefined();
        expect(body.background).withContext('background should not be defined').toBeUndefined();
        expect(body.width).withContext('width should be 0').toBe(0);
        expect(body.height).withContext('height should be 0').toBe(0);
        expect(body.padding).withContext('padding should be default value').toBe(defaultOpts.padding);
    });

    it('can be created with only a title', () => {
        const body: CardBody = new CardBody(TestUtils.scene(), {
            desiredWidth: 300,
            contents: [
                new TextButton(TestUtils.scene(), {
                    text: { 
                        text:'sample title text', 
                        style: {color: Colors.toHexString(Colors.warning)}
                    }
                })
            ]
        });
        TestUtils.scene().add.existing(body);

        expect(body.contents?.length).withContext('contents size is 1').toEqual(1);
        expect(body.getContentAt<TextButton>(0).width).withContext('TextButton content at index 0 has width greater than 0').toBeGreaterThan(0);
        expect(body.background).withContext('background should not be defined').not.toBeDefined();
        expect(body.width).withContext('body should be wider than title text').toBeGreaterThan(body.contents[0].width);
        expect(body.height).withContext('body should be height of title text').toBe(body.contents[0].height);
    });

    it('allows contents to be added after creation', () => {
        const body: CardBody = new CardBody(TestUtils.scene(), {
            desiredWidth: 300
        });
        TestUtils.scene().add.existing(body);

        expect(body.contents?.length).toEqual(0);

        body.addContents(new TextButton(TestUtils.scene(), {text: {text: 'new title text', style: {stroke: Colors.toHexString(Colors.light)}}}));

        expect((body.getContentAt<TextButton>(0)).text.text).toEqual('new title text');
    });

    it('contents can be updated after creation', () => {
        const body: CardBody = new CardBody(TestUtils.scene(), CardBodyOptions.Outline.success({
            desiredWidth: 300,
            contents: [
                new TextButton(TestUtils.scene(), {text: {text:'sample title text'}}),
                new TextButton(TestUtils.scene(), {text: {text:'sample description'}}),
                new TextButton(TestUtils.scene(), {
                    text: {
                        text:'button text', 
                        style: Styles.Outline.danger().text
                    },
                    background: Styles.Outline.danger().graphics, 
                    padding: 10})
            ]
        }));
        TestUtils.scene().add.existing(body);

        body.getContentAt<TextButton>(0).setText({text:'new title text'});

        expect(body.getContentAt<TextButton>(0).text.text).withContext('updated text').toEqual('new title text');
        expect(body.contents.length).withContext('should have 3 contents').toBe(3);
    });
});