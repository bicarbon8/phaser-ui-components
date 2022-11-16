import * as _ from "lodash";
import { Alignment } from "../layout/alignment";
import { Styles } from "../style/styles";

export type TextButtonOptions = {
    x?: number;
    y?: number;
    desiredWidth?: number;
    desiredHeight?: number;
    text?: Phaser.Types.GameObjects.Text.TextConfig;
    background?: Phaser.Types.GameObjects.Graphics.Styles;
    cornerRadius?: number | Phaser.Types.GameObjects.Graphics.RoundedRectRadius;
    interactive?: boolean;
    padding?: number;
    alignment?: Alignment;
}

export module TextButtonOptions {
    export function getDefaultOptions(): TextButtonOptions {
        return {
            x: 0,
            y: 0,
            text: {style: {fontFamily: 'Courier', fontSize: '20px', color: '#000000'}, origin: 0.5},
            padding: 0,
            cornerRadius: 0,
            alignment: {
                horizontal: 'center',
                vertical: 'middle'
            }
        };
    }
    export function setDefaultOptions(options: TextButtonOptions): TextButtonOptions {
        return _.merge(TextButtonOptions.getDefaultOptions(), options);
    }

    export function primary(options?: TextButtonOptions): TextButtonOptions { return get(Styles.primary(), options); }
    export function secondary(options?: TextButtonOptions): TextButtonOptions { return get(Styles.secondary(), options); }
    export function success(options?: TextButtonOptions): TextButtonOptions { return get(Styles.success(), options); }
    export function danger(options?: TextButtonOptions): TextButtonOptions { return get(Styles.danger(), options); }
    export function warning(options?: TextButtonOptions): TextButtonOptions { return get(Styles.warning(), options); }
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
        return _.merge({
            text: {style: style.text},
            background: style.graphics
        }, options);
    }
}