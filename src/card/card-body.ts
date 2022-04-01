import { TextButton } from "../button/text-button";
import { TextButtonOptions } from "../button/text-button-options";
import { FlexLayout } from "../layout/flex-layout";
import { LayoutContent } from "../layout/layout-content";
import { LinearLayout } from "../layout/linear-layout";
import { LinearLayoutOptions } from "../layout/linear-layout-options";
import { Helpers } from "../utilities/helpers";
import { CardBodyOptions } from "./card-body-options";
import { CardDescription } from "./card-description";
import { CardDescriptionOptions } from "./card-description-options";
import { CardTitle } from "./card-title";
import { CardTitleOptions } from "./card-title-options";

export class CardBody extends LinearLayout {
    private _title: CardTitle;
    private _description: CardDescription;
    private _buttons: TextButton[];
    private _buttonsLayout: FlexLayout;
    private _background: Phaser.GameObjects.Graphics;

    private readonly _opts: CardBodyOptions;

    constructor(scene: Phaser.Scene, options?: CardBodyOptions) {
        options = Helpers.merge(CardBodyOptions.DEFAULT(scene), options);
        const opts: LinearLayoutOptions = {
            x: options.x,
            y: options.y,
            width: options.width,
            orientation: 'vertical',
            padding: options.padding
        };
        super(scene, opts);
        this._opts = options;
        this._buttons = [];
        this._createGameObject();
    }

    get cornerRadius(): number {
        return this._opts.cornerRadius;
    }

    get title(): CardTitle {
        return this._title;
    }

    get description(): CardDescription {
        return this._description;
    }

    get buttons(): TextButton[] {
        return this._buttons;
    }

    get background(): Phaser.GameObjects.Graphics {
        return this._background;
    }

    private _createGameObject(): void {
        this.setTitle(this._opts.title);
        this.setDescription(this._opts.description);
        this.addButtons(...this._opts.buttons);
        this._createBackgroundObject(this._opts.background);
    }

    setTitle(titleOptions?: CardTitleOptions): CardBody {
        if (this._title) {
            this.removeContent(this._title, true);
            this._title = null;
        }
        if (titleOptions) {
            this._opts.title = Helpers.merge({
                width: this._opts.width,
                padding: this._opts.padding
            }, titleOptions);
            const title: CardTitle = new CardTitle(this.scene, this._opts.title);
            this._opts.width = this._opts.width || title.width + (this.padding * 2);
            const availableWidth: number = this._opts.width;
            let scaleX: number = 1;
            if (availableWidth < (title.width + (this.padding * 2))) {
                scaleX = availableWidth / (title.width + this.padding * 2);
                title.setScale(scaleX);
            }
            this._title = title;
            const contents: LayoutContent[] = this.removeAllContent(false);
            this.addContents(title, ...contents);
            this._createBackgroundObject(this._opts.background);
        }
        return this;
    }

    setDescription(descriptionOptions?: CardDescriptionOptions): CardBody {
        if (this._description) {
            this.removeContent(this._description, true);
            this._description = null;
        }
        if (descriptionOptions) {
            this._opts.description = Helpers.merge({
                width: this._opts.width,
                padding: this._opts.padding
            }, descriptionOptions);
            const description: CardDescription = new CardDescription(this.scene, this._opts.description);
            this._opts.width = this._opts.width || description.width + (this.padding * 2);
            const availableWidth: number = this._opts.width;
            let scaleX: number = 1;
            if (availableWidth < (description.width + (this.padding * 2))) {
                scaleX = availableWidth / (description.width + (this.padding * 2));
                description.setScale(scaleX);
            }
            this._description = description;
            const contents: LayoutContent[] = [];
            if (this.title) { contents.push(this.removeContent(this.title, false)); }
            contents.push(this._description);
            if (this._buttonsLayout) { contents.push(this.removeContent(this._buttonsLayout, false)); }
            this.addContents(...contents);
            this._createBackgroundObject(this._opts.background);
        }
        return this;
    }

    addButtons(...buttonOpts: TextButtonOptions[]): void {
        if (!this._buttonsLayout) {
            this._buttonsLayout = new FlexLayout(this.scene, {
                width: this._opts.width,
                padding: this._opts.buttonSpacing
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
            this._opts.width = this._opts.width || this._buttonsLayout.width + (this.padding * 2);
            const availableWidth: number = this._opts.width;
            let scaleX: number = 1;
            if (availableWidth < (this._buttonsLayout.width + (this.padding * 2))) {
                scaleX = availableWidth / (this._buttonsLayout.width + (this.padding * 2));
                this._buttonsLayout.setScale(scaleX);
            }
            this.refreshLayout();
            this._createBackgroundObject(this._opts.background);
        }
    }

    removeButton(index: number, destroy?: boolean): TextButton {
        if (index != null && index < this._buttons.length) {
            let button: TextButton = this._buttons.splice(index, 1)[0];
            const removed: TextButton = this._buttonsLayout.removeContent(button, destroy) as TextButton;
            this.refreshLayout();
            this._createBackgroundObject(this._opts.background);
            return removed;
        }
        return null;
    }

    removeAllButtons(destroy: boolean = true): TextButton[] {
        const buttons: TextButton[] = this._buttonsLayout.removeAllContent(destroy) as TextButton[];
        this._buttons = [];
        this.refreshLayout();
        this._createBackgroundObject(this._opts.background);
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
                background.fillRoundedRect(-(this._opts.width / 2), -(this.height / 2), this._opts.width, this.height, {
                    tl: 0,
                    tr: 0,
                    bl: this._opts.cornerRadius,
                    br: this._opts.cornerRadius
                });
            }
            if (styles.lineStyle) {
                background.strokeRoundedRect(-(this._opts.width / 2), -(this.height / 2), this._opts.width, this.height, {
                    tl: 0,
                    tr: 0,
                    bl: this._opts.cornerRadius,
                    br: this._opts.cornerRadius
                });
            }
            this.add(background);
            this.sendToBack(background);
        }
        this.setSize(this._opts.width, this.height);
    }
}