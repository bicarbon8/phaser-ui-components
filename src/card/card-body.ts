import { TextButton } from "../button/text-button";
import { TextButtonOptions } from "../button/text-button-options";
import { FlexLayout } from "../layout/flex-layout";
import { LayoutContent } from "../layout/layout-content";
import { LinearLayout } from "../layout/linear-layout";
import { LinearLayoutOptions } from "../layout/linear-layout-options";
import { Helpers } from "../utilities/helpers";
import { CardBodyOptions } from "./card-body-options";

export class CardBody extends LinearLayout {
    private _title: Phaser.GameObjects.Text;
    private _description: Phaser.GameObjects.Text;
    private _buttons: TextButton[];
    private _buttonsLayout: FlexLayout;
    private _background: Phaser.GameObjects.Graphics;

    private readonly _options: CardBodyOptions;

    constructor(scene: Phaser.Scene, options?: CardBodyOptions) {
        options = Helpers.merge(CardBodyOptions.DEFAULT(scene), options);
        const opts: LinearLayoutOptions = {
            x: options.x,
            y: options.y,
            orientation: 'vertical',
            padding: options.padding
        };
        super(scene, opts);
        this._options = options;
        this._buttons = [];
        this._createGameObject();
    }

    get cornerRadius(): number {
        return this._options.cornerRadius;
    }

    get title(): Phaser.GameObjects.Text {
        return this._title;
    }

    get description(): Phaser.GameObjects.Text {
        return this._description;
    }

    get buttons(): TextButton[] {
        return this._buttons;
    }

    get background(): Phaser.GameObjects.Graphics {
        return this._background;
    }

    private _createGameObject(): void {
        this.setTitle(this._options.title, this._options.titleStyle);
        this.setDescription(this._options.description, this._options.descriptionStyle);
        this.addButtons(...this._options.buttons);
        this._createBackgroundObject(this._options.background);
    }

    setTitle(title?: string, style?: Phaser.Types.GameObjects.Text.TextStyle): CardBody {
        if (this._title) {
            this.removeContent(this._title, true);
            this._title = null;
        }
        if (title) {
            this._options.title = title;
            this._options.titleStyle = style || this._options.titleStyle;
            const titleText: Phaser.GameObjects.Text = new Phaser.GameObjects.Text(this.scene, 0, 0, this._options.title, this._options.titleStyle);
            this._options.width = this._options.width || titleText.width + (this.padding * 2);
            const availableWidth: number = this._options.width;
            let scaleX: number = 1;
            if (availableWidth < (titleText.width + (this.padding * 2))) {
                scaleX = availableWidth / (titleText.width + this.padding * 2);
                titleText.setScale(scaleX);
            }
            this._title = titleText;
            const contents: LayoutContent[] = this.removeAllContent(false);
            this.addContents(titleText, ...contents);
            this._createBackgroundObject(this._options.background);
        }
        return this;
    }

    setDescription(description?: string, style?: Phaser.Types.GameObjects.Text.TextStyle): CardBody {
        if (this._description) {
            this.removeContent(this._description, true);
            this._description = null;
        }
        if (description) {
            this._options.description = description;
            this._options.descriptionStyle = style || this._options.descriptionStyle;
            const descText: Phaser.GameObjects.Text = new Phaser.GameObjects.Text(this.scene, 0, 0, this._options.description, this._options.descriptionStyle);
            this._options.width = this._options.width || descText.width + (this.padding * 2);
            const availableWidth: number = this._options.width;
            let scaleX: number = 1;
            if (availableWidth < (descText.width + (this.padding * 2))) {
                scaleX = availableWidth / (descText.width + (this.padding * 2));
                descText.setScale(scaleX);
            }
            this._description = descText;
            const contents: LayoutContent[] = [];
            if (this.title) { contents.push(this.removeContent(this.title, false)); }
            contents.push(this._description);
            if (this._buttonsLayout) { contents.push(this.removeContent(this._buttonsLayout, false)); }
            this.addContents(...contents);
            this._createBackgroundObject(this._options.background);
        }
        return this;
    }

    addButtons(...buttonOpts: TextButtonOptions[]): void {
        if (!this._buttonsLayout) {
            this._buttonsLayout = new FlexLayout(this.scene, {
                width: this._options.width,
                padding: this._options.buttonSpacing
            });
            this.addContents(this._buttonsLayout);
        }
        if (buttonOpts) {
            for (var i=0; i<buttonOpts.length; i++) {
                let opts: TextButtonOptions = buttonOpts[i];
                let button: TextButton = new TextButton(this.scene, opts);
                this._buttonsLayout.addContents(button);
                this._buttons.push(button);
            }
            this._options.width = this._options.width || this._buttonsLayout.width + (this.padding * 2);
            const availableWidth: number = this._options.width;
            let scaleX: number = 1;
            if (availableWidth < (this._buttonsLayout.width + (this.padding * 2))) {
                scaleX = availableWidth / (this._buttonsLayout.width + (this.padding * 2));
                this._buttonsLayout.setScale(scaleX);
            }
            this.refreshLayout();
            this._createBackgroundObject(this._options.background);
        }
    }

    removeButton(index: number, destroy?: boolean): TextButton {
        if (index != null && index < this._buttons.length) {
            let button: TextButton = this._buttons.splice(index, 1)[0];
            const removed: TextButton = this._buttonsLayout.removeContent(button, destroy) as TextButton;
            this.refreshLayout();
            this._createBackgroundObject(this._options.background);
            return removed;
        }
        return null;
    }

    removeAllButtons(destroy: boolean = true): TextButton[] {
        const buttons: TextButton[] = this._buttonsLayout.removeAllContent(destroy) as TextButton[];
        this._buttons = [];
        this.refreshLayout();
        this._createBackgroundObject(this._options.background);
        return buttons;
    }

    private _createBackgroundObject(styles?: Phaser.Types.GameObjects.Graphics.Styles): void {
        this.remove(this._background, true);
        if (styles) {
            const background: Phaser.GameObjects.Graphics = new Phaser.GameObjects.Graphics(this.scene, {
                fillStyle: styles.fillStyle,
                lineStyle: styles.lineStyle
            });
            this._background = background;
            if (styles.fillStyle) {
                background.fillRoundedRect(-(this._options.width / 2), -(this.height / 2), this._options.width, this.height, {
                    tl: 0,
                    tr: 0,
                    bl: this._options.cornerRadius,
                    br: this._options.cornerRadius
                });
            }
            if (styles.lineStyle) {
                background.strokeRoundedRect(-(this._options.width / 2), -(this.height / 2), this._options.width, this.height, {
                    tl: 0,
                    tr: 0,
                    bl: this._options.cornerRadius,
                    br: this._options.cornerRadius
                });
            }
            this.add(background);
            this.sendToBack(background);
        }
        this.setSize(this._options.width, this.height);
    }
}