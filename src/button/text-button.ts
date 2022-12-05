import * as _ from 'lodash';
import * as Phaser from 'phaser';
import { LayoutContainer } from '../layout/layout-container';
import { TextButtonOptions } from "./text-button-options";

export class TextButton extends LayoutContainer {
    private _text: Phaser.GameObjects.Text;
    private _textConfig: Phaser.Types.GameObjects.Text.TextConfig;

    constructor(scene: Phaser.Scene, options: TextButtonOptions) {
        options = TextButtonOptions.setDefaultOptions(options);
        super(scene, options);
        
        this._textConfig = options.textConfig;
        
        this.setText(options.textConfig)
            .setOnClick(options.onClick)
            .setOnHover(options.onHover);
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

    /**
     * sets the function to be run when a pointer down event is fired on this `TextButton`
     * and also sets the behaviour when pointer up and pointer out events occur to reset the 
     * `TextButton` back to its previous state
     * @param func a function to be run when the `Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN`
     * event is fired on this object
     * @returns the current instance of this `TextButton`
     */
    setOnClick(func: () => void): this {
        this.off(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN)
            .off(Phaser.Input.Events.GAMEOBJECT_POINTER_UP);

        if (func) {
            this.setInteractive();
            const origTxtCfg = _.clone(this._textConfig);
            const origBkgCfg = _.clone(this.backgroundStyles);
            this.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => func());
            this.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                this.setText(origTxtCfg);
                this.setBackground(origBkgCfg);
            }).on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.setText(origTxtCfg);
                this.setBackground(origBkgCfg);
            });
        }

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
        this.off(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER);

        if (func) {
            this.setInteractive();
            const origTxtCfg = _.clone(this._textConfig);
            const origBkgCfg = _.clone(this.backgroundStyles);
            this.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => func());
            this.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                this.setText(origTxtCfg);
                this.setBackground(origBkgCfg);
            });
        }

        return this;
    }
}