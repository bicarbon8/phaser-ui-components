import { Colors } from "../../src";
import { Card } from "../../src/card/card";
import { TestUtils } from "../test-utils";

describe('Card', () => {
    beforeAll((done) => {
        TestUtils.game(done);
    });

    beforeEach(() => {
        TestUtils.clear();
    });

    it('can be created empty', () => {
        const card: Card = new Card(TestUtils.scene());
        TestUtils.scene().add.existing(card);

        expect(card).toBeDefined();
        expect(card.x).toBe(0);
        expect(card.y).toBe(0);
        expect(card.width).toBe(0);
        expect(card.height).toBe(0);
        expect(card.header).toBeUndefined();
        expect(card.image).toBeUndefined();
        expect(card.cardbody).toBeUndefined();
    });

    it('can be created with only a header', () => {
        const card: Card = new Card(TestUtils.scene(), {header: {
            text: 'sample text',
            textStyle: {fontSize: '40px', color: Colors.toHexString(Colors.dark)}
        }});
        TestUtils.scene().add.existing(card);

        expect(card).toBeDefined();
        expect(card.image).toBeUndefined();
        expect(card.cardbody).toBeUndefined();
        expect(card.header).toBeDefined();
        expect(card.header.text).toBeDefined();
        expect(card.width).toBeGreaterThan(0);
        expect(card.width).toEqual(card.header.width);
        expect(card.height).toBeGreaterThan(0);
        expect(card.height).toEqual(card.header.height);
    });

    it('can be created with only a body', () => {
        const card: Card = new Card(TestUtils.scene(), {body: {
            title: 'title text',
            titleStyle: {fontSize: '40px', color: Colors.toHexString(Colors.light)},
            description: 'description text',
            descriptionStyle: {fontSize: '20px', color: Colors.toHexString(Colors.warning)}
        }});
        TestUtils.scene().add.existing(card);

        expect(card).toBeDefined();
        expect(card.image).toBeUndefined();
        expect(card.header).toBeUndefined();
        expect(card.cardbody).toBeDefined();
        expect(card.cardbody.title).toBeDefined();
        expect(card.cardbody.description).toBeDefined();
        expect(card.width).toBeGreaterThan(0);
        expect(card.width).toEqual(card.cardbody.width);
        expect(card.height).toBeGreaterThan(0);
        expect(card.height).toEqual(card.cardbody.height);
    });

    it('can be created with a header and a body', () => {
        const card: Card = new Card(TestUtils.scene(), {
            header: {
                text: 'header text',
                textStyle: {fontSize: '40px', color: Colors.toHexString(Colors.success)}
            },
            body: {
                title: 'title text',
                titleStyle: {fontSize: '40px', color: Colors.toHexString(Colors.light)},
                description: 'description text',
                descriptionStyle: {fontSize: '20px', color: Colors.toHexString(Colors.warning)}
            }
        });
        TestUtils.scene().add.existing(card);

        expect(card).toBeDefined();
        expect(card.image).toBeUndefined();
        expect(card.header).toBeDefined();
        expect(card.header.text).toBeDefined();
        expect(card.cardbody).toBeDefined();
        expect(card.cardbody.title).toBeDefined();
        expect(card.cardbody.description).toBeDefined();
        expect(card.width).toBeGreaterThan(0);
        expect(card.width).toEqual(card.header.width);
        expect(card.width).toEqual(card.cardbody.width);
        expect(card.height).toBeGreaterThan(0);
        expect(card.height).toEqual(card.header.height + card.cardbody.height);
    });
});