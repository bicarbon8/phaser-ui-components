import { Colors } from "../color/colors";
import { Styles } from "../style/styles";
import { Helpers } from "../utilities/helpers";

export interface TextButtonOptions {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    text?: string;
    textStyle?: Phaser.Types.GameObjects.Text.TextStyle;
    background?: Phaser.Types.GameObjects.Graphics.Styles;
    cornerRadius?: number;
    interactive?: boolean;
    padding?: number;
}

export module TextButtonOptions {
    export function DEFAULT(): TextButtonOptions {
        return {
            x: 0,
            y: 0,
            textStyle: {fontFamily: 'Courier', fontSize: '20px', color: '#000000'},
            padding: 0,
            cornerRadius: 0
        };
    }

    export function primary(options?: TextButtonOptions): TextButtonOptions { return get(Styles.primary(), options); }
    export function secondary(options?: TextButtonOptions): TextButtonOptions { return get(Styles.secondary(), options); }
    export function success(options?: TextButtonOptions): TextButtonOptions { return get(Styles.success(), options); }
    export function danger(options?: TextButtonOptions): TextButtonOptions { return get(Styles.danger(), options); }
    export function warning(options?: TextButtonOptions): TextButtonOptions { return get(Styles.info(), options); }
    export function info(options?: TextButtonOptions): TextButtonOptions { return get(Styles.info(), options); }
    export function light(options?: TextButtonOptions): TextButtonOptions { return get(Styles.light(), options); }
    export function dark(options?: TextButtonOptions): TextButtonOptions { return get(Styles.dark(), options); }

    export module Outline {
        export function primary(options?: TextButtonOptions): TextButtonOptions { return get(Styles.Outline.primary(), options); }
        export function secondary(options?: TextButtonOptions): TextButtonOptions { return get(Styles.Outline.secondary(), options); }
        export function success(options?: TextButtonOptions): TextButtonOptions { return get(Styles.Outline.success(), options); }
        export function danger(options?: TextButtonOptions): TextButtonOptions { return get(Styles.Outline.danger(), options); }
        export function warning(options?: TextButtonOptions): TextButtonOptions { return get(Styles.Outline.warning(), options); }
        export function info(options?: TextButtonOptions): TextButtonOptions { return get(Styles.Outline.info(), options); }
        export function light(options?: TextButtonOptions): TextButtonOptions { return get(Styles.Outline.light(), options); }
        export function dark(options?: TextButtonOptions): TextButtonOptions { return get(Styles.Outline.dark(), options); }
    }

    function get(style: Styles, options?: TextButtonOptions): TextButtonOptions {
        return Helpers.merge({
            textStyle: style.text,
            background: style.graphics
        }, options);
    }
}