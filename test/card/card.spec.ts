import { CardBodyOptions, Colors, Styles, TextButton, TextButtonOptions } from "../../src";
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
        const card: Card = new Card(TestUtils.scene(), {});
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
        const card: Card = new Card(TestUtils.scene(), {
            header: {
                text: {
                    text:'sample text', 
                    style: {fontSize: '40px', color: Colors.toHexString(Colors.dark)}
                }
            }
        });
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
            contents: [
                new TextButton(TestUtils.scene(), {
                    text: {
                        text: 'title text',
                        style: {fontSize: '40px', color: Colors.toHexString(Colors.light)}
                    }}
                )
            ]
        }});
        TestUtils.scene().add.existing(card);

        expect(card).toBeDefined();
        expect(card.image).toBeUndefined();
        expect(card.header).toBeUndefined();
        expect(card.cardbody).toBeDefined();
        expect(card.cardbody.contents[0]).toBeDefined();
        expect(card.width).toBeGreaterThan(0);
        expect(card.width).toEqual(card.cardbody.width);
        expect(card.height).toBeGreaterThan(0);
        expect(card.height).toEqual(card.cardbody.height);
    });

    it('can be created with a header and a body', () => {
        const card: Card = new Card(TestUtils.scene(), {
            desiredWidth: 300,
            header: {
                text: {text:'header text', style: {fontSize: '40px', color: Colors.toHexString(Colors.success)}}
            },
            body: {
                contents: [
                    new TextButton(TestUtils.scene(), {
                        text: {text: 'body contents', style: {fontSize: '20px', color: Colors.toHexString(Colors.primary)}}
                    })
                ]
            }
        });
        TestUtils.scene().add.existing(card);

        expect(card).toBeDefined();
        expect(card.image).toBeUndefined();
        expect(card.header).toBeDefined();
        expect(card.header.text).toBeDefined();
        expect(card.cardbody).toBeDefined();
        expect(card.cardbody.contents[0]).toBeDefined();
        expect(card.width).toBeGreaterThan(0);
        expect(card.width).withContext('card width should be equal to header width').toEqual(card.header.width);
        expect(card.width).withContext('card width should be equal to body width').toEqual(card.cardbody.width);
        expect(card.height).toBeGreaterThan(0);
        expect(card.height).withContext('card height should be header plus body height').toEqual(card.header.height + card.cardbody.height);
    });

    it('can be created with a header image and a body', () => {
        const card: Card = new Card(TestUtils.scene(), {
            desiredWidth: 200,
            cornerRadius: 5,
            header: {
                text: {text: 'header text', style: {color: Colors.toHexString(Colors.success)}}
            },
            image: {
                image: {key: 'sample-spritesheet', index: 0},
                background: Styles.secondary().graphics
            },
            body: {
                contents: [
                    new TextButton(TestUtils.scene(), {
                        text: {text: 'body contents', style: Styles.primary().text}
                    })
                ]
            }
        });
        TestUtils.scene().add.existing(card);

        expect(card).toBeDefined();
        expect(card.header).toBeDefined();        
        expect(card.header.text).toBeDefined();
        expect(card.image).toBeDefined();
        expect(card.image.sprite).toBeDefined();
        expect(card.image.background).withContext('card image background should default to undefined').toBeDefined();
        expect(card.image.height).withContext('card image height should be same as card width if not specified').toBe(200);
        expect(card.cardbody).toBeDefined();
        expect(card.cardbody.contents[0]).toBeDefined();
        expect(card.width).withContext('card width should be as specified').toBe(200);
        expect(card.width).withContext('card header width should be same as card width').toEqual(card.header.width);
        expect(card.width).withContext('card body width should be same as card width').toEqual(card.cardbody.width);
        expect(card.height).withContext('card height should be over 200').toBeGreaterThan(200);
        expect(card.height).withContext('card should be height of all parts combined').toEqual(card.header.height + card.cardbody.height + 200);
    });

    it('can be created with everything', () => {
        const card: Card = new Card(TestUtils.scene(), {
            desiredWidth: 200,
            cornerRadius: 5,
            padding: 10,
            header: TextButtonOptions.primary({
                text: {text:'header text'}
            }),
            image: {
                image: {key: 'sample-image'},
                background: Styles.secondary().graphics
            },
            body: CardBodyOptions.light({
                contents: [
                    new TextButton(TestUtils.scene(), {
                        text: {text: 'body contents', style: {fontSize: '20px', color: Colors.toHexString(Colors.primary)}}
                    })
                ]
            })
        });
        TestUtils.scene().add.existing(card);

        expect(card).toBeDefined();
        expect(card.header).toBeDefined();
        expect(card.header.padding).withContext('header padding').toBe(10);
        expect(card.header.cornerRadius).withContext('header cornerRadius').toEqual({tl: 5, tr: 5, bl: 0, br: 0});
        expect(card.image).toBeDefined();
        expect(card.cardbody).toBeDefined();
        expect(card.cardbody.padding).withContext('cardbody padding').toBe(10);
        expect(card.cardbody.cornerRadius).withContext('cardbody cornerRadius').toEqual({tl: 0, tr: 0, bl: 5, br: 5});
        expect(card.width).withContext('card width should be as specified').toBe(200);
        expect(card.width).withContext('card header width should be same as card width').toEqual(card.header.width);
        expect(card.width).withContext('card body width should be same as card width').toEqual(card.cardbody.width);
        expect(card.height).withContext('card height should be over 200').toBeGreaterThan(200);
        expect(card.height).withContext('card should be height of all parts combined').toEqual(card.header.height + card.image.height + card.cardbody.height);
    });

    it('can remove header', () => {
        const card: Card = new Card(TestUtils.scene(), {
            desiredWidth: 200,
            cornerRadius: 5,
            header: {
                text: {text:'header text', style: {color: Colors.toHexString(Colors.success)}}
            },
            image: {},
            body: {
                contents: [
                    new TextButton(TestUtils.scene(), {
                        text: {text: 'body contents'}
                    })
                ]
            }
        });
        TestUtils.scene().add.existing(card);

        expect(card).toBeDefined();
        expect(card.header).toBeDefined();

        spyOn(card, 'refreshLayout').and.callThrough();
        card.setHeader();

        expect(card.header).toBeNull();
        expect(card.refreshLayout).toHaveBeenCalledTimes(1);
    });

    it('can remove image', () => {
        const card: Card = new Card(TestUtils.scene(), {
            desiredWidth: 200,
            cornerRadius: 5,
            header: {
                text: {text: 'header text', style: {color: Colors.toHexString(Colors.success)}}
            },
            image: {},
            body: {
                contents: [
                    new TextButton(TestUtils.scene(), {
                        text: {text: 'body contents'}
                    })
                ]
            }
        });
        TestUtils.scene().add.existing(card);

        expect(card).toBeDefined();
        expect(card.image).toBeDefined();

        spyOn(card, 'refreshLayout').and.callThrough();
        card.setImage();

        expect(card.image).toBeNull();
        expect(card.refreshLayout).toHaveBeenCalledTimes(1);
    });

    it('can remove cardbody', () => {
        const card: Card = new Card(TestUtils.scene(), {
            desiredWidth: 200,
            cornerRadius: 5,
            header: {
                text: {text: 'header text', style: {color: Colors.toHexString(Colors.success)}}
            },
            image: {},
            body: {
                contents: [
                    new TextButton(TestUtils.scene(), {
                        text: {text: 'body contents'}
                    })
                ]
            }
        });
        TestUtils.scene().add.existing(card);

        expect(card).toBeDefined();
        expect(card.cardbody).toBeDefined();

        spyOn(card, 'refreshLayout').and.callThrough();
        card.setCardBody();

        expect(card.cardbody).toBeNull();
        expect(card.refreshLayout).toHaveBeenCalledTimes(1);
    });

    it('will call refreshLayout when contents of CardBody is updated', () => {
        const card: Card = new Card(TestUtils.scene(), {
            desiredWidth: 200,
            padding: 5,
            cornerRadius: 10,
            header: TextButtonOptions.primary({text: {text:'sample header'}}),
            image: {background: {fillStyle: {color: Colors.info}}},
            body: CardBodyOptions.secondary({
                contents: [
                    new TextButton(TestUtils.scene(), {
                        text: {
                            text: 'body contents',
                            style: {
                                wordWrap: {
                                    useAdvancedWrap: true, 
                                    width: 180
                                }, 
                                align: 'left'
                            }, 
                            origin: 0.5
                        }
                    })
                ]
            })
        });
        TestUtils.scene().add.existing(card);

        const startingHeight: number = card.height;

        expect(startingHeight).withContext('startingHeight').toBeGreaterThan(0);

        card.cardbody.getContentAt<TextButton>(0).setText({text: 'some long text that will wrap around... some long text that will wrap around... some long text that will wrap around...'});

        expect(card.height).withContext('height after update').toBeGreaterThan(startingHeight);
    });
});