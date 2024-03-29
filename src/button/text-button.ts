import * as _ from 'lodash';
import * as Phaser from 'phaser';
import { LayoutContainer } from '../layout/layout-container';
import { TextButtonOptions } from "./text-button-options";

export class TextButton extends LayoutContainer {
    private _text: Phaser.GameObjects.Text;
    private _textConfig: Phaser.Types.GameObjects.Text.TextConfig;
    private _enabled: boolean;
    private _hovering: boolean;
    private _clicking: boolean;
    private _textConfigState: Phaser.Types.GameObjects.Text.TextConfig;
    private _backgroundState: Phaser.Types.GameObjects.Graphics.Styles;
    private _onClickAction: () => void;
    private _onHoverAction: () => void;

    constructor(scene: Phaser.Scene, options: TextButtonOptions) {
        options = TextButtonOptions.setDefaultOptions(options);
        super(scene, options);
        
        this._hovering = false;
        this._textConfig = options.textConfig;
        
        this.setText(options.textConfig)
            .setOnClick(options.onClick)
            .setOnHover(options.onHover)
            .setEnabled(!options.disabled);
        
        this._setupHandlers();
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

    /**
     * indicates if this button will run the `onClick` and `onHover` actions
     * when hovered or clicked
     */
    get enabled(): boolean {
        return this._enabled;
    }

    /**
     * indicates if this button is being hovered (pointer over)
     */
    get hovering(): boolean {
        return this._hovering;
    }

    /**
     * indicates if this button is being clicked (pointer down)
     */
    get clicking(): boolean {
        return this._clicking;
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

        return this;
    }

    override setBackground(style?: Phaser.Types.GameObjects.Graphics.Styles): this {
        super.setBackground(style);
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
    setOnClick(func?: () => void): this {
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
    setOnHover(func?: () => void): this {
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

    /**
     * allows for manually simulating a UI Pointer Hover event
     * @param hovering a boolean used to simulate actual UI hover event
     * @returns the current instance of this `TextButton`
     */
    setHovering(hovering: boolean): this {
        if (hovering) {
            if (!this._hovering) {
                this._onHoverHandler();
            }
        } else {
            if (this._hovering) {
                this._offHoverHandler();
            }
        }
        return this;
    }

    /**
     * allows for manually simulating a UI Pointer Touch / Click event
     * @param clicking a boolean used to simulate actual UI click event
     * @returns the current instance of this `TextButton`
     */
    setClicking(clicking: boolean): this {
        if (clicking) {
            if (!this._clicking) {
                this._onClickHandler();
            }
        } else {
            if (this._clicking) {
                this._offClickHandler();
            }
        }
        return this;
    }

    private _setupHandlers(): void {
        this.removeAllListeners(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER);
        this.removeAllListeners(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN);
        this.removeAllListeners(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT);
        this.removeAllListeners(Phaser.Input.Events.GAMEOBJECT_POINTER_UP);

        this.setInteractive();
        this.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => this.setHovering(true));
        this.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => this.setClicking(true));
        this.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => this.setHovering(false));
        this.on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => this.setClicking(false));
    }

    private _onClickHandler(): void {
        this._clicking = true;
        if (this.enabled && this._onClickAction) {
            this._saveState();
            this.setHovering(true); // always enable hover when clicking
            this._onClickAction();
        }
    }

    private _offClickHandler(): void {
        this._clicking = false;
        this._restoreState();
        if (this._hovering) {
            this._onHoverHandler();
        }
    }

    private _onHoverHandler(): void {
        this._hovering = true;
        if (this.enabled && this._onHoverAction) {
            this._saveState();
            this._onHoverAction();
        }
    }

    private _offHoverHandler(): void {
        this._hovering = false;
        this._restoreState();
        this.setClicking(false); // always disable click when disable hover
    }

    /**
     * only save state if not already saved to avoid overwriting between
     * hover and click
     */
    private _saveState(): void {
        if (!this._textConfigState) {
            this._textConfigState = _.cloneDeep(this._textConfig);
        }
        if (!this._backgroundState) {
            this._backgroundState = _.cloneDeep(this.backgroundStyles);
        }
    }

    private _restoreState(): void {
        if (this._textConfigState) {
            this.setText(this._textConfigState);
            this._textConfigState = null;
        }
        if (this._backgroundState) {
            this.setBackground(this._backgroundState);
            this._backgroundState = null;
        }
    }
}