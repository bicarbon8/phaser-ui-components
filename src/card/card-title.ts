import { TextButton } from "../button/text-button";
import { TextButtonOptions } from "../button/text-button-options";
import { Helpers } from "../utilities/helpers";
import { CardTitleOptions } from "./card-title-options";

export class CardTitle extends TextButton {
    constructor(scene: Phaser.Scene, options?: CardTitleOptions) {
        options = Helpers.merge(CardTitleOptions.DEFAULT(), options);
        const opts: TextButtonOptions = {
            width: options.width,
            height: options.height,
            text: options.text,
            textStyle: options.textStyle,
            alignment: options.alignment
        };
        super(scene, opts);
    }
}