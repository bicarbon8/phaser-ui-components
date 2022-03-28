import * as Phaser from 'phaser';
import { Colors } from '../color/colors';
import { TextButtonOptions } from "./text-button-options";

export class TextButton extends Phaser.GameObjects.Container {
    private readonly _options: TextButtonOptions;
    private _text: Phaser.GameObjects.Text;
    private _background: Phaser.GameObjects.Graphics;

    constructor(scene: Phaser.Scene, options?: TextButtonOptions) {
        super(scene, options?.x, options?.y);
        this._options = options || {};
        this._createGameObject();
    }

    get left(): number {
        return this.x - (this.width / 2);
    }

    get right(): number {
        return this.x + (this.width / 2);
    }

    get top(): number {
        return this.y - (this.height / 2);
    }

    get bottom(): number {
        return this.y + (this.height / 2);
    }

    get text(): Phaser.GameObjects.Text {
        return this._text;
    }

    get background(): Phaser.GameObjects.Graphics {
        return this._background;
    }

    private _createGameObject(): void {
        this.setText(this._options.text, this._options.textStyle);
        this.setBackground(this._options.background);
        
        if (this._options.interactive) { this.setInteractive(); }
    }

    setText(text?: string, style?: Phaser.Types.GameObjects.Text.TextStyle): void {
        if (this._text) {
            this._text.destroy();
            this._text = null;
        }
        
        if (text) {
            this._options.textStyle = style || this._options.textStyle || {};
            this._options.textStyle.fontSize = this._options.textStyle.fontSize || '20px';
            this._options.textStyle.fontFamily = this._options.textStyle.fontFamily || 'Courier';
            this._options.textStyle.color = this._options.textStyle.color || '#000000';
            const txt = this.scene.add.text(0, 0, text, this._options.textStyle);
            txt.setOrigin(0.5);
            this._options.padding = this._options.padding || 0;
            this._options.width = this._options.width || txt.width + (this._options.padding * 2);
            this._options.height = this._options.height || txt.height + (this._options.padding * 2);
            if (this._options.width < ((this._options.padding * 2) + txt.width)) {
                const scaleX: number = this._options.width / ((this._options.padding * 2) + txt.width);
                txt.setScale(scaleX);
            }
            this.add(txt);
            this._text = txt;
        }

        this.setSize(this._options.width, this._options.height);
    }

    setBackground(style?: Phaser.Types.GameObjects.Graphics.Styles): void {
        if (this._background) {
            this._background.destroy();
            this._background = null;
        }
        
        if (style) {
            this._options.background = style;
            this._options.width = this._options.width || 0;
            this._options.height = this._options.height || 0;
            this._options.padding = this._options.padding || 0;
            this._options.cornerRadius = this._options.cornerRadius || 0;
            const rect = this.scene.add.graphics(this._options.background);
            if (this._options.cornerRadius > 0) {
                if (this._options.background.fillStyle) {
                    rect.fillRoundedRect(-(this._options.width / 2), -(this._options.height / 2), this._options.width, this._options.height, this._options.cornerRadius);
                }
                if (this._options.background.lineStyle) {
                    rect.strokeRoundedRect(-(this._options.width / 2), -(this._options.height / 2), this._options.width, this._options.height, this._options.cornerRadius);
                }
            } else {
                if (this._options.background.fillStyle) {
                    rect.fillRect(-(this._options.width / 2), -(this._options.height / 2), this._options.width, this._options.height);
                }
                if (this._options.background.lineStyle) {
                    rect.strokeRect(-(this._options.width / 2), -(this._options.height / 2), this._options.width, this._options.height);
                }
            }
            this.add(rect);
            this.sendToBack(rect);
            this._background = rect;
        }

        this.setSize(this._options.width, this._options.height);
    }
}

export module TextButton {
    /** Blue background with White text */
    export function primary(scene: Phaser.Scene, options?: TextButtonOptions): TextButton { return get(scene, options, {textStyle: {color: '#ffffff'}, background: {fillStyle: {color: Colors.primary}}}); }
    /** Gray background with White text */
    export function secondary(scene: Phaser.Scene, options?: TextButtonOptions): TextButton { return get(scene, options, {textStyle: {color: '#ffffff'}, background: {fillStyle: {color: Colors.secondary}}}); }
    /** Green background with White text */
    export function success(scene: Phaser.Scene, options?: TextButtonOptions): TextButton { return get(scene, options, {textStyle: {color: '#ffffff'}, background: {fillStyle: {color: Colors.success}}}); }
    /** Red background with White text */
    export function danger(scene: Phaser.Scene, options?: TextButtonOptions): TextButton { return get(scene, options, {textStyle: {color: '#ffffff'}, background: {fillStyle: {color: Colors.danger}}}); }
    /** Yellow background with Black text */
    export function warning(scene: Phaser.Scene, options?: TextButtonOptions): TextButton { return get(scene, options, {textStyle: {color: '#000000'}, background: {fillStyle: {color: Colors.warning}}}); }
    /** Light Blue background with Black text */
    export function info(scene: Phaser.Scene, options?: TextButtonOptions): TextButton { return get(scene, options, {textStyle: {color: '#000000'}, background: {fillStyle: {color: Colors.info}}}); }
    /** Light Gray background with Black text */
    export function light(scene: Phaser.Scene, options?: TextButtonOptions): TextButton { return get(scene, options, {textStyle: {color: '#000000'}, background: {fillStyle: {color: Colors.light}}}); }
    /** Dark Gray background with White text */
    export function dark(scene: Phaser.Scene, options?: TextButtonOptions): TextButton { return get(scene, options, {textStyle: {color: '#ffffff'}, background: {fillStyle: {color: Colors.dark}}}); }

    export module Outline {
        /** Blue outline with Blue text */
        export function primary(scene: Phaser.Scene, options?: TextButtonOptions): TextButton { return get(scene, options, {textStyle: {color: Colors.toHexString(Colors.primary)}, background: {lineStyle: {color: Colors.primary, width: 1}}}); }
        /** Gray outline with Gray text */
        export function secondary(scene: Phaser.Scene, options?: TextButtonOptions): TextButton { return get(scene, options, {textStyle: {color: Colors.toHexString(Colors.secondary)}, background: {lineStyle: {color: Colors.secondary, width: 1}}}); }
        /** Green outline with Green text */
        export function success(scene: Phaser.Scene, options?: TextButtonOptions): TextButton { return get(scene, options, {textStyle: {color: Colors.toHexString(Colors.success)}, background: {lineStyle: {color: Colors.success, width: 1}}}); }
        /** Red outline with Red text */
        export function danger(scene: Phaser.Scene, options?: TextButtonOptions): TextButton { return get(scene, options, {textStyle: {color: Colors.toHexString(Colors.danger)}, background: {lineStyle: {color: Colors.danger, width: 1}}}); }
        /** Yellow outline with Yellow text */
        export function warning(scene: Phaser.Scene, options?: TextButtonOptions): TextButton { return get(scene, options, {textStyle: {color: Colors.toHexString(Colors.warning)}, background: {lineStyle: {color: Colors.warning, width: 1}}}); }
        /** Light Blue outline with Light Blue text */
        export function info(scene: Phaser.Scene, options?: TextButtonOptions): TextButton { return get(scene, options, {textStyle: {color: Colors.toHexString(Colors.info)}, background: {lineStyle: {color: Colors.info, width: 1}}}); }
        /** Light Gray outline with Light Gray text */
        export function light(scene: Phaser.Scene, options?: TextButtonOptions): TextButton { return get(scene, options, {textStyle: {color: Colors.toHexString(Colors.light)}, background: {lineStyle: {color: Colors.light, width: 1}}}); }
        /** Dark Gray outline with Dark Gray text */
        export function dark(scene: Phaser.Scene, options?: TextButtonOptions): TextButton { return get(scene, options, {textStyle: {color: Colors.toHexString(Colors.dark)}, background: {lineStyle: {color: Colors.dark, width: 1}}}); }
    }

    function get(scene: Phaser.Scene, userOptions: TextButtonOptions, setOptions: TextButtonOptions): TextButton {
        const options: TextButtonOptions = {...userOptions, ...setOptions};
        return new TextButton(scene, options);
    }
}