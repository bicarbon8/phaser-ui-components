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
                        textConfig: { text: "Demonstration of GridLayout (6x6)" },
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
                                        textConfig: {text: '0x0', style: Styles.success().text},
                                        backgroundStyles: Styles.success().graphics,
                                        cornerRadius: 5
                                    }),,,,,new TextButton(scene, {
                                        textConfig: {text: '0x5', style: Styles.warning().text},
                                        backgroundStyles: Styles.warning().graphics,
                                        cornerRadius: 5
                                    })],,,,,[
                                        new TextButton(scene, {
                                            textConfig: {text: '5x0', style: Styles.warning().text},
                                            backgroundStyles: Styles.warning().graphics,
                                            cornerRadius: 5
                                        }),,,,,new TextButton(scene, {
                                            textConfig: {text: '5x5', style: Styles.danger().text},
                                            backgroundStyles: Styles.danger().graphics,
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
                        textConfig: { text: "Left Aligned Card Header" },
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
                                        textConfig: { text: "Primary" },
                                        cornerRadius: 5,
                                        padding: 10
                                    })),
                                    new TextButton(scene, TextButtonOptions.secondary({
                                        textConfig: { text: "Secondary" },
                                        cornerRadius: 5,
                                        padding: 10
                                    })),
                                    new TextButton(scene, TextButtonOptions.success({
                                        textConfig: { text: "Success" },
                                        cornerRadius: 5,
                                        padding: 10
                                    })),
                                    new TextButton(scene, TextButtonOptions.danger({
                                        textConfig: { text: "Danger" },
                                        cornerRadius: 5,
                                        padding: 10
                                    })),
                                    new TextButton(scene, TextButtonOptions.dark({
                                        textConfig: { text: "Dark" },
                                        cornerRadius: 5,
                                        padding: 10
                                    })),
                                    new TextButton(scene, TextButtonOptions.info({
                                        textConfig: { text: "Info" },
                                        cornerRadius: 5,
                                        padding: 10
                                    })),
                                    new TextButton(scene, TextButtonOptions.light({
                                        textConfig: { text: "Light" },
                                        cornerRadius: 5,
                                        padding: 10
                                    })),
                                    new TextButton(scene, TextButtonOptions.warning({
                                        textConfig: { text: "Warning" },
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
                        textConfig: {
                            text: "Default Alignment Card Header with background lineStyle width 2",
                            style: {
                                align: 'center',
                                wordWrap: {
                                    width: 480,
                                    useAdvancedWrap: true
                                }
                            }
                        },
                        backgroundStyles: { lineStyle: { width: 2 } }
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
                                        textConfig: { text: "Primary" },
                                        cornerRadius: 5,
                                        padding: 10
                                    })),
                                    new TextButton(scene, TextButtonOptions.Outline.secondary({
                                        textConfig: { text: "Secondary" },
                                        cornerRadius: 5,
                                        padding: 10
                                    })),
                                    new TextButton(scene, TextButtonOptions.Outline.success({
                                        textConfig: { text: "Success" },
                                        cornerRadius: 5,
                                        padding: 10
                                    })),
                                    new TextButton(scene, TextButtonOptions.Outline.danger({
                                        textConfig: { text: "Danger" },
                                        cornerRadius: 5,
                                        padding: 10
                                    })),
                                    new TextButton(scene, TextButtonOptions.Outline.dark({
                                        textConfig: { text: "Dark" },
                                        cornerRadius: 5,
                                        padding: 10
                                    })),
                                    new TextButton(scene, TextButtonOptions.Outline.info({
                                        textConfig: { text: "Info" },
                                        cornerRadius: 5,
                                        padding: 10
                                    })),
                                    new TextButton(scene, TextButtonOptions.Outline.light({
                                        textConfig: { text: "Light" },
                                        cornerRadius: 5,
                                        padding: 10
                                    })),
                                    new TextButton(scene, TextButtonOptions.Outline.warning({
                                        textConfig: { text: "Warning" },
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