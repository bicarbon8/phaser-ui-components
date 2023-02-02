import * as _ from 'lodash';
import * as Phaser from 'phaser';
import { LayoutContainer } from '../layout/layout-container';
import { TextButtonOptions } from "./text-button-options";

export class TextButton extends LayoutContainer {
    private _text: Phaser.GameObjects.Text;
    private _textConfig: Phaser.Types.GameObjects.Text.TextConfig;
    private _enabled: boolean;
    private _onClickAction: () => void;
    private _onHoverAction: () => void;

    constructor(scene: Phaser.Scene, options: TextButtonOptions) {
        options = TextButtonOptions.setDefaultOptions(options);
        super(scene, options);
        
        this._textConfig = options.textConfig;
        
        this.setText(options.textConfig)
            .setOnClick(options.onClick)
            .setOnHover(options.onHover)
            .setEnabled(!options.disabled);
    }

    /**
     * returns the `Phaser.GameObjects.Text` used to display text in this button.
     * 
     * **WARNING!** this SHOULD NOT be modified directly. use the `TextButton.setText(config)`
     * function instead
     */
    get text(): Phaser.GameObjects.Text {
        return this._text;
    }

    /**
     * returns the current `Phaser.Types.GameObjects.Text.TextConfig` used
     * for the text in this `TextButton`
     */
    get textConfig(): Phaser.Types.GameObjects.Text.TextConfig {
        return this._textConfig;
    }

    get enabled(): boolean {
        return this._enabled;
    }

    /**
     * sets the `text` and `style` to be added
     * @param config a `Phaser.Types.GameObjects.Text.TextConfig` object
     * containing the `text` and `style` to be applied to a `Phaser.GameObjects.Text`
     * object
     * @returns the current instance of this `TextButton`
     */
    setText(config?: Phaser.Types.GameObjects.Text.TextConfig): this {
        if (this._text) {
            this._text.destroy();
            this._text = null;
        }
        
        if (config) {
            config = _.merge(this._textConfig, config);
            const txt = this.scene.make.text(config, false);
            this.setContent(txt);
            this._text = txt;
            this._textConfig = config;
        }

        this._setupHandlers();

        return this;
    }

    override setBackground(style?: Phaser.Types.GameObjects.Graphics.Styles): this {
        super.setBackground(style);

        this._setupHandlers();

        return this;
    }

    /**
     * sets the function to be run when a pointer down event is fired on this `TextButton`
     * and also sets the behaviour when pointer up and pointer out events occur to reset the 
     * `TextButton` back to its previous state
     * @param func a function to be run when the `Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN`
     * event is fired on this object
     * @returns the current instance of this `TextButton`
     */
    setOnClick(func: () => void): this {
        this._onClickAction = func;
        return this;
    }

    /**
     * sets the function to be run when a pointer over event is fired on this `TextButton`
     * and also sets the behaviour when a pointer out event occurs to reset the `TextButton`
     * back to its previous state
     * @param func a function to be run when the `Phaser.Input.Events.GAMEOBJECT_POINTER_OVER`
     * event is fired on this object
     * @returns the current instance of this `TextButton`
     */
    setOnHover(func: () => void): this {
        this._onHoverAction = func;
        return this;
    }

    /**
     * allows setting the `enabled` state of this `TextButton` so that hover and click events will
     * be handled if `true` and not if `false`
     * @param enabled a boolean indicating if `onClick` and `onHover` actions should be
     * run
     * @returns the current instance of this `TextButton`
     */
    setEnabled(enabled: boolean = true): this {
        this._enabled = enabled;
        return this;
    }

    private _setupHandlers(): void {
        this.removeAllListeners(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER);
        this.removeAllListeners(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN);
        this.removeAllListeners(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT);
        this.removeAllListeners(Phaser.Input.Events.GAMEOBJECT_POINTER_UP);

        this.setInteractive();
        const origTxtCfg = _.cloneDeep(this._textConfig);
        const origBkgCfg = _.cloneDeep(this.backgroundStyles);
        this.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => this._onHoverHandler());
        this.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => this._onClickHandler());
        this.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
            this.setText(origTxtCfg);
            this.setBackground(origBkgCfg);
        }).on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
            this.setText(origTxtCfg);
            this.setBackground(origBkgCfg);
        });
    }

    private _onClickHandler(): void {
        if (this.enabled && this._onClickAction) {
            this._onClickAction();
        }
    }

    private _onHoverHandler(): void {
        if (this.enabled && this._onHoverAction) {
            this._onHoverAction();
        }
    }
}