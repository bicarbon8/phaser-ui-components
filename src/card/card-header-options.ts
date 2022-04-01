import { TextButtonOptions } from "../button/text-button-options";
import { Styles } from "../style/styles";
import { Helpers } from "../utilities/helpers";

export interface CardHeaderOptions extends TextButtonOptions {
    
}

export module CardHeaderOptions {
    export function DEFAULT(scene: Phaser.Scene): CardHeaderOptions {
        return {
            x: 0,
            y: 0,
            width: scene.sys.game.scale.gameSize.width,
            textStyle: {fontFamily: 'Courier', fontSize: '20px', color: '#000000'},
            cornerRadius: 0,
            padding: 0,
        };
    }

    export function primary(options?: CardHeaderOptions): CardHeaderOptions { return get(Styles.primary(), options); }
    export function secondary(options?: CardHeaderOptions): CardHeaderOptions { return get(Styles.secondary(), options); }
    export function success(options?: CardHeaderOptions): CardHeaderOptions { return get(Styles.success(), options); }
    export function danger(options?: CardHeaderOptions): CardHeaderOptions { return get(Styles.danger(), options); }
    export function warning(options?: CardHeaderOptions): CardHeaderOptions {return get(Styles.warning(), options); }
    export function info(options?: CardHeaderOptions): CardHeaderOptions { return get(Styles.info(), options); }
    export function light(options?: CardHeaderOptions): CardHeaderOptions { return get(Styles.light(), options); }
    export function dark(options?: CardHeaderOptions): CardHeaderOptions { return get(Styles.dark(), options); }

    export module Outline {
        export function primary(options?: CardHeaderOptions): CardHeaderOptions { return get(Styles.Outline.primary(), options); }
        export function secondary(options?: CardHeaderOptions): CardHeaderOptions { return get(Styles.Outline.secondary(), options); }
        export function success(options?: CardHeaderOptions): CardHeaderOptions { return get(Styles.Outline.success(), options); }
        export function danger(options?: CardHeaderOptions): CardHeaderOptions { return get(Styles.Outline.danger(), options); }
        export function warning(options?: CardHeaderOptions): CardHeaderOptions {return get(Styles.Outline.warning(), options); }
        export function info(options?: CardHeaderOptions): CardHeaderOptions { return get(Styles.Outline.info(), options); }
        export function light(options?: CardHeaderOptions): CardHeaderOptions { return get(Styles.Outline.light(), options); }
        export function dark(options?: CardHeaderOptions): CardHeaderOptions { return get(Styles.Outline.dark(), options); }
    }

    function get(style: Styles, options?: CardHeaderOptions): CardHeaderOptions {
        return Helpers.merge({
            textStyle: style.text,
            background: style.graphics
        }, options);
    }
}