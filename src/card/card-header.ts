import * as _ from "lodash";
import { TextButton } from "../button/text-button";
import { TextButtonOptions } from "../button/text-button-options";

export class CardHeader extends TextButton {
    constructor(scene: Phaser.Scene, options?: TextButtonOptions) {
        options = _.merge(TextButtonOptions.DEFAULT(), options);
        options.cornerRadius = (typeof options.cornerRadius === 'object') ? options.cornerRadius : {
            tl: options.cornerRadius,
            tr: options.cornerRadius,
            bl: 0,
            br: 0
        }
        super(scene, options);
    }
}