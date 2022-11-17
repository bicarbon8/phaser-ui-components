import * as _ from "lodash";
import { TextButton } from "../button/text-button";
import { TextButtonOptions } from "../button/text-button-options";

export class CardHeader extends TextButton {
    constructor(scene: Phaser.Scene, options?: TextButtonOptions) {
        options = _.merge(TextButtonOptions.getDefaultOptions(), options);
        options.cornerRadius = (typeof options.cornerRadius === 'number') ? 
            {tr: options.cornerRadius, tl: options.cornerRadius, br: 0, bl: 0} : 
            {tr: options.cornerRadius.tr, tl: options.cornerRadius.tl, br: 0, bl: 0};
        super(scene, options);
    }
}