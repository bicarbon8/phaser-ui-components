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

    it('can be created with a header image and a body', () => {
        const card: Card = new Card(TestUtils.scene(), {
            width: 200,
            background: {lineStyle: {color: Colors.primary}},
            cornerRadius: 5,
            header: {
                text: 'header text',
                textStyle: {color: Colors.toHexString(Colors.success)}
            },
            image: {},
            body: {
                title: 'title text',
                titleStyle: {color: Colors.toHexString(Colors.light)},
                description: 'description text',
                descriptionStyle: {color: Colors.toHexString(Colors.warning)}
            }
        });
        TestUtils.scene().add.existing(card);

        expect(card).toBeDefined();
        expect(card.header).toBeDefined();        
        expect(card.header.text).toBeDefined();
        expect(card.image).toBeDefined();
        expect(card.image.sprite).toBeUndefined();
        expect(card.image.background).toBeDefined();
        expect(card.image.height).withContext('card image height should be same as card width if not specified').toBe(200);
        expect(card.cardbody).toBeDefined();
        expect(card.cardbody.title).toBeDefined();
        expect(card.cardbody.description).toBeDefined();
        expect(card.width).withContext('card width should be as specified').toBe(200);
        expect(card.width).withContext('card header width should be same as card width').toEqual(card.header.width);
        expect(card.width).withContext('card body width should be same as card width').toEqual(card.cardbody.width);
        expect(card.height).withContext('card height should be over 200').toBeGreaterThan(200);
        expect(card.height).withContext('card should be height of all parts combined').toEqual(card.header.height + card.cardbody.height + 200);
    });

    it('can remove header', () => {
        const card: Card = new Card(TestUtils.scene(), {
            width: 200,
            background: {lineStyle: {color: Colors.primary}},
            cornerRadius: 5,
            header: {
                text: 'header text',
                textStyle: {color: Colors.toHexString(Colors.success)}
            },
            image: {},
            body: {
                title: 'title text',
                titleStyle: {color: Colors.toHexString(Colors.light)},
                description: 'description text',
                descriptionStyle: {color: Colors.toHexString(Colors.warning)}
            }
        });
        TestUtils.scene().add.existing(card);

        expect(card).toBeDefined();
        expect(card.header).toBeDefined();

        spyOn(card, 'refreshLayout').and.callThrough();
        card.removeHeader();

        expect(card.header).toBeNull();
        expect(card.refreshLayout).toHaveBeenCalledTimes(1);
    });

    it('can remove image', () => {
        const card: Card = new Card(TestUtils.scene(), {
            width: 200,
            background: {lineStyle: {color: Colors.primary}},
            cornerRadius: 5,
            header: {
                text: 'header text',
                textStyle: {color: Colors.toHexString(Colors.success)}
            },
            image: {},
            body: {
                title: 'title text',
                titleStyle: {color: Colors.toHexString(Colors.light)},
                description: 'description text',
                descriptionStyle: {color: Colors.toHexString(Colors.warning)}
            }
        });
        TestUtils.scene().add.existing(card);

        expect(card).toBeDefined();
        expect(card.image).toBeDefined();

        spyOn(card, 'refreshLayout').and.callThrough();
        card.removeImage();

        expect(card.image).toBeNull();
        expect(card.refreshLayout).toHaveBeenCalledTimes(1);
    });

    it('can remove cardbody', () => {
        const card: Card = new Card(TestUtils.scene(), {
            width: 200,
            background: {lineStyle: {color: Colors.primary}},
            cornerRadius: 5,
            header: {
                text: 'header text',
                textStyle: {color: Colors.toHexString(Colors.success)}
            },
            image: {},
            body: {
                title: 'title text',
                titleStyle: {color: Colors.toHexString(Colors.light)},
                description: 'description text',
                descriptionStyle: {color: Colors.toHexString(Colors.warning)}
            }
        });
        TestUtils.scene().add.existing(card);

        expect(card).toBeDefined();
        expect(card.cardbody).toBeDefined();

        spyOn(card, 'refreshLayout').and.callThrough();
        card.removeCardBody();

        expect(card.cardbody).toBeNull();
        expect(card.refreshLayout).toHaveBeenCalledTimes(1);
    });
});