import * as _ from "lodash";
import { LayoutContent } from "../layout/layout-content";
import { LinearLayoutOptions } from "../layout/linear-layout-options";
import { Styles } from "../style/styles";

export type CardBodyOptions = LinearLayoutOptions & {
    background?: Phaser.Types.GameObjects.Graphics.Styles;
    cornerRadius?: number | Phaser.Types.GameObjects.Graphics.RoundedRectRadius;
}

export module CardBodyOptions {
    export function getDefaultOptions(): CardBodyOptions {
        return {
            x: 0,
            y: 0,
            orientation: 'vertical',
            contents: new Array<LayoutContent>(),
            cornerRadius: {tl: 0, tr: 0, bl: 0, br: 0},
            padding: 0
        };
    }
    export function setDefaultOptions(options?: CardBodyOptions): CardBodyOptions {
        return _.merge(CardBodyOptions.getDefaultOptions(), options);
    }

    export function primary(options?: CardBodyOptions): CardBodyOptions { return get(Styles.primary(), options); }
    export function secondary(options?: CardBodyOptions): CardBodyOptions { return get(Styles.secondary(), options); }
    export function success(options?: CardBodyOptions): CardBodyOptions { return get(Styles.success(), options); }
    export function danger(options?: CardBodyOptions): CardBodyOptions { return get(Styles.danger(), options); }
    export function dark(options?: CardBodyOptions): CardBodyOptions { return get(Styles.dark(), options); }
    export function warning(options?: CardBodyOptions): CardBodyOptions { return get(Styles.warning(), options); }
    export function info(options?: CardBodyOptions): CardBodyOptions { return get(Styles.info(), options); }
    export function light(options?: CardBodyOptions): CardBodyOptions { return get(Styles.light(), options); }

    export module Outline {
        export function primary(options?: CardBodyOptions): CardBodyOptions { return get(Styles.Outline.primary(), options); }
        export function secondary(options?: CardBodyOptions): CardBodyOptions { return get(Styles.Outline.secondary(), options); }
        export function success(options?: CardBodyOptions): CardBodyOptions { return get(Styles.Outline.success(), options); }
        export function danger(options?: CardBodyOptions): CardBodyOptions { return get(Styles.Outline.danger(), options); }
        export function dark(options?: CardBodyOptions): CardBodyOptions { return get(Styles.Outline.dark(), options); }
        export function warning(options?: CardBodyOptions): CardBodyOptions { return get(Styles.Outline.warning(), options); }
        export function info(options?: CardBodyOptions): CardBodyOptions { return get(Styles.Outline.info(), options); }
        export function light(options?: CardBodyOptions): CardBodyOptions { return get(Styles.Outline.light(), options); }
    }

    function get(style: Styles, options?: CardBodyOptions): CardBodyOptions {
        const backgroundStyle: Phaser.Types.GameObjects.Graphics.Styles = {...style.graphics};
        return _.merge({
            background: backgroundStyle
        }, options);
    }
}