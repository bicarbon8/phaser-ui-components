import { TextButton } from "../button/text-button";
import { Helpers } from "../utilities/helpers";
import { CardHeaderOptions } from "./card-header-options";

export class CardHeader extends TextButton {
    constructor(scene: Phaser.Scene, options?: CardHeaderOptions) {
        options = Helpers.merge(CardHeaderOptions.DEFAULT(scene), options);
        options.cornerRadius = (typeof options.cornerRadius === 'object') ? options.cornerRadius : {
            tl: options.cornerRadius,
            tr: options.cornerRadius,
            bl: 0,
            br: 0
        }
        super(scene, options);
    }
}