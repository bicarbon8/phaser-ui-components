import * as _ from "lodash";
import { TextButtonOptions } from "../button/text-button-options";
import { Colors } from "../color/colors";
import { Styles } from "../style/styles";

export interface CardBodyOptions {
    x?: number;
    y?: number;
    width?: number;
    title?: Phaser.Types.GameObjects.Text.TextConfig;
    description?: Phaser.Types.GameObjects.Text.TextConfig;
    buttons?: TextButtonOptions[];
    buttonSpacing?: number;
    background?: Phaser.Types.GameObjects.Graphics.Styles;
    cornerRadius?: number;
    padding?: number;
}

export module CardBodyOptions {
    export function SET_DEFAULTS(scene: Phaser.Scene, options?: CardBodyOptions): CardBodyOptions {
        const defaults: CardBodyOptions = {
            x: 0,
            y: 0,
            width: scene.sys.game.scale.gameSize.width,
            title: {style: {wordWrap: {useAdvancedWrap: true}, align: 'left'}, origin: 0.5},
            description: {style: {wordWrap: {useAdvancedWrap: true}, align: 'left'}, origin: 0.5},
            buttons: [],
            buttonSpacing: 0,
            cornerRadius: 0,
            padding: 0
        };
        const w: number = options?.width || scene.sys.game.scale.gameSize.width;
        const p: number = options?.padding || 0;
        defaults.title.style.wordWrap.width = w - (p * 2);
        defaults.description.style.wordWrap.width = w - (p * 2);
        return _.merge(defaults, options);
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
        const titleStyle: Phaser.Types.GameObjects.Text.TextStyle = {...style.text};
        const descriptionStyle: Phaser.Types.GameObjects.Text.TextStyle = {...style.text};
        descriptionStyle.color = (Colors.isDark(titleStyle.color)) ? Colors.lighten(descriptionStyle.color, 2) : Colors.darken(descriptionStyle.color, 2);
        return _.merge({
            title: {style: titleStyle},
            description: {style: descriptionStyle},
            background: backgroundStyle
        }, options);
    }
}