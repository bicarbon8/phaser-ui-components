import * as _ from "lodash";
import { TextButton } from "../button/text-button";
import { TextButtonOptions } from "../button/text-button-options";
import { FlexLayout } from "../layout/flex-layout";
import { LayoutContent } from "../layout/layout-content";
import { LayoutEvents } from "../layout/layout-events";
import { LinearLayout } from "../layout/linear-layout";
import { LinearLayoutOptions } from "../layout/linear-layout-options";
import { CardBodyOptions } from "./card-body-options";

export class CardBody extends LinearLayout {
    private _title: Phaser.GameObjects.Text;
    private _description: Phaser.GameObjects.Text;
    private _buttonsLayout: FlexLayout;
    private _background: Phaser.GameObjects.Graphics;

    private readonly _opts: CardBodyOptions;

    constructor(scene: Phaser.Scene, options?: CardBodyOptions) {
        options = CardBodyOptions.SET_DEFAULTS(scene, options);
        const opts: LinearLayoutOptions = {
            x: options.x,
            y: options.y,
            width: options.width,
            orientation: 'vertical',
            padding: options.padding
        };
        super(scene, opts);
        this._opts = options;
        
        this.setTitle(this._opts.title)
            .setDescription(this._opts.description)
            .addButtons(...this._opts.buttons);
    }

    get cornerRadius(): number {
        return this._opts.cornerRadius;
    }

    get title(): Phaser.GameObjects.Text {
        return _.clone(this._title);
    }

    get description(): Phaser.GameObjects.Text {
        return _.clone(this._description);
    }

    get buttons(): TextButton[] {
        return this._buttonsLayout.contents as TextButton[];
    }

    get background(): Phaser.GameObjects.Graphics {
        return _.clone(this._background);
    }

    setTitle(config?: Phaser.Types.GameObjects.Text.TextConfig): CardBody {
        if (this._title) {
            this.removeContent(this._title, true);
            this._title = null;
        }
        if (config?.text) {
            this._opts.title = _.merge(CardBodyOptions.SET_DEFAULTS(this.scene, this._opts).title, config);
            const title = this.scene.make.text(this._opts.title, false);
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
        }
        this._createBackgroundObject(this._opts.background);
        return this;
    }

    setDescription(config?: Phaser.Types.GameObjects.Text.TextConfig): CardBody {
        if (this._description) {
            this.removeContent(this._description, true);
            this._description = null;
        }
        if (config?.text) {
            this._opts.description = _.merge(CardBodyOptions.SET_DEFAULTS(this.scene, this._opts).description, config);
            const desc = this.scene.make.text(this._opts.description, false);
            this._opts.width = this._opts.width || desc.width + (this.padding * 2);
            const availableWidth: number = this._opts.width;
            let scaleX: number = 1;
            if (availableWidth < (desc.width + (this.padding * 2))) {
                scaleX = availableWidth / (desc.width + this.padding * 2);
                desc.setScale(scaleX);
            }
            this._description = desc;
            const contents: LayoutContent[] = [];
            if (this.title) { contents.push(this.removeContent(this._title, false)); }
            contents.push(this._description);
            if (this._buttonsLayout) { contents.push(this.removeContent(this._buttonsLayout, false)); }
            this.addContents(...contents);
        }
        this._createBackgroundObject(this._opts.background);
        return this;
    }

    addButtons(...buttonOpts: TextButtonOptions[]): CardBody {
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
        return this;
    }

    removeButton(index: number, destroy?: boolean): TextButton {
        let removed: TextButton;
        if (index != null && index < this._buttonsLayout.contents.length) {
            let button: TextButton = this._buttonsLayout.contents[index] as TextButton;
            removed = this._buttonsLayout.removeContent(button, destroy) as TextButton;
            this.refreshLayout();
            this._createBackgroundObject(this._opts.background);
        }
        return removed;
    }

    removeAllButtons(destroy: boolean = true): TextButton[] {
        const buttons: TextButton[] = this._buttonsLayout.removeAllContent(destroy) as TextButton[];
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
        this.emit(LayoutEvents.RESIZE, this.width, this.height);
    }
}