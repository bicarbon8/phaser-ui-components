import { Card, CardBodyOptions, Colors, FlexLayout, GridLayout, Styles, TextButton, TextButtonOptions } from "../src";
import { TestUtils } from "./test-utils";

describe('demo', () => {
    beforeAll((done) => {
        TestUtils.game(done);
    });

    beforeEach(() => {
        TestUtils.clear();
    });

    it('all features', () => {
        const scene = TestUtils.scene();
        const flex = new FlexLayout(scene, {
            padding: 5,
            contents: [
                new Card(scene, {
                    desiredWidth: 500,
                    padding: 10,
                    cornerRadius: 5,
                    header: TextButtonOptions.info({
                        text: { text: "Demonstration of GridLayout (6x6)" },
                        alignment: { horizontal: "left" }
                    }),
                    body: CardBodyOptions.light({
                        cornerRadius: 5,
                        alignment: { horizontal: 'left', vertical: 'top' },
                        contents: [
                            new GridLayout(scene, {
                                width: 480,
                                height: 300,
                                rows: 6,
                                columns: 6,
                                background: Styles.secondary().graphics,
                                cornerRadius: 5,
                                padding: 10,
                                contents: [
                                    [new TextButton(scene, {
                                        text: {text: '0x0', style: Styles.success().text},
                                        background: Styles.success().graphics,
                                        cornerRadius: 5
                                    }),,,,,new TextButton(scene, {
                                        text: {text: '0x5', style: Styles.warning().text},
                                        background: Styles.warning().graphics,
                                        cornerRadius: 5
                                    })],,,,,[
                                        new TextButton(scene, {
                                            text: {text: '5x0', style: Styles.warning().text},
                                            background: Styles.warning().graphics,
                                            cornerRadius: 5
                                        }),,,,,new TextButton(scene, {
                                            text: {text: '5x5', style: Styles.danger().text},
                                            background: Styles.danger().graphics,
                                            cornerRadius: 5
                                        })
                                    ]
                                ]
                            })
                        ]
                    })
                }),
                new Card(scene, {
                    desiredWidth: 500,
                    padding: 10,
                    cornerRadius: 5,
                    header: TextButtonOptions.primary({
                        text: { text: "Left Aligned Card Header" },
                        alignment: { horizontal: "left" }
                    }),
                    body: CardBodyOptions.light({
                        cornerRadius: 5,
                        alignment: { horizontal: 'left', vertical: 'top' },
                        contents: [
                            scene.make.text({
                                text: 'Left & Top Aligned Card Body with FlexLayout content containing filled style TextButtons',
                                style: {
                                    color: Colors.toHexString(Colors.dark),
                                    wordWrap: {
                                        width: 480,
                                        useAdvancedWrap: true
                                    }
                                }
                            }, false),
                            new FlexLayout(scene, {
                                padding: 5,
                                width: 480,
                                contents: [
                                    new TextButton(scene, TextButtonOptions.primary({
                                        text: { text: "Primary" },
                                        cornerRadius: 5,
                                        padding: 10
                                    })),
                                    new TextButton(scene, TextButtonOptions.secondary({
                                        text: { text: "Secondary" },
                                        cornerRadius: 5,
                                        padding: 10
                                    })),
                                    new TextButton(scene, TextButtonOptions.success({
                                        text: { text: "Success" },
                                        cornerRadius: 5,
                                        padding: 10
                                    })),
                                    new TextButton(scene, TextButtonOptions.danger({
                                        text: { text: "Danger" },
                                        cornerRadius: 5,
                                        padding: 10
                                    })),
                                    new TextButton(scene, TextButtonOptions.dark({
                                        text: { text: "Dark" },
                                        cornerRadius: 5,
                                        padding: 10
                                    })),
                                    new TextButton(scene, TextButtonOptions.info({
                                        text: { text: "Info" },
                                        cornerRadius: 5,
                                        padding: 10
                                    })),
                                    new TextButton(scene, TextButtonOptions.light({
                                        text: { text: "Light" },
                                        cornerRadius: 5,
                                        padding: 10
                                    })),
                                    new TextButton(scene, TextButtonOptions.warning({
                                        text: { text: "Warning" },
                                        cornerRadius: 5,
                                        padding: 10
                                    }))
                                ]
                            })
                        ]
                    })
                }),
                new Card(scene, {
                    desiredWidth: 500,
                    padding: 10,
                    cornerRadius: 5,
                    header: TextButtonOptions.Outline.primary({
                        text: {
                            text: "Default Alignment Card Header with background lineStyle width 2",
                            style: {
                                align: 'center',
                                wordWrap: {
                                    width: 480,
                                    useAdvancedWrap: true
                                }
                            }
                        },
                        background: { lineStyle: { width: 2 } }
                    }),
                    body: CardBodyOptions.Outline.secondary({
                        cornerRadius: 5,
                        background: { lineStyle: { width: 2 } },
                        contents: [
                            scene.make.text({
                                text: 'default Aligned Card Body with FlexLayout content containing outline style TextButtons',
                                style: {
                                    color: Colors.toHexString(Colors.light),
                                    align: 'center',
                                    wordWrap: {
                                        width: 480,
                                        useAdvancedWrap: true
                                    }
                                }
                            }, false),
                            new FlexLayout(scene, {
                                padding: 5,
                                width: 480,
                                contents: [
                                    new TextButton(scene, TextButtonOptions.Outline.primary({
                                        text: { text: "Primary" },
                                        cornerRadius: 5,
                                        padding: 10
                                    })),
                                    new TextButton(scene, TextButtonOptions.Outline.secondary({
                                        text: { text: "Secondary" },
                                        cornerRadius: 5,
                                        padding: 10
                                    })),
                                    new TextButton(scene, TextButtonOptions.Outline.success({
                                        text: { text: "Success" },
                                        cornerRadius: 5,
                                        padding: 10
                                    })),
                                    new TextButton(scene, TextButtonOptions.Outline.danger({
                                        text: { text: "Danger" },
                                        cornerRadius: 5,
                                        padding: 10
                                    })),
                                    new TextButton(scene, TextButtonOptions.Outline.dark({
                                        text: { text: "Dark" },
                                        cornerRadius: 5,
                                        padding: 10
                                    })),
                                    new TextButton(scene, TextButtonOptions.Outline.info({
                                        text: { text: "Info" },
                                        cornerRadius: 5,
                                        padding: 10
                                    })),
                                    new TextButton(scene, TextButtonOptions.Outline.light({
                                        text: { text: "Light" },
                                        cornerRadius: 5,
                                        padding: 10
                                    })),
                                    new TextButton(scene, TextButtonOptions.Outline.warning({
                                        text: { text: "Warning" },
                                        cornerRadius: 5,
                                        padding: 10
                                    }))
                                ]
                            })
                        ]
                    })
                })
            ]
        });
        scene.add.existing(flex);
    })
});