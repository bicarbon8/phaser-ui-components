import { Colors } from "../color/colors";
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

    export function primary(options?: TextButtonOptions): TextButtonOptions {
        return Helpers.merge({
            textStyle: {color: '#ffffff'},
            background: {fillStyle: {color: Colors.primary}}
        }, options);
    }
    export function secondary(options?: TextButtonOptions): TextButtonOptions {
        return Helpers.merge({
            textStyle: {color: '#ffffff'},
            background: {fillStyle: {color: Colors.secondary}}
        }, options);
    }
    export function success(options?: TextButtonOptions): TextButtonOptions {
        return Helpers.merge({
            textStyle: {color: '#ffffff'},
            background: {fillStyle: {color: Colors.success}}
        }, options);
    }
    export function danger(options?: TextButtonOptions): TextButtonOptions {
        return Helpers.merge({
            textStyle: {color: '#ffffff'},
            background: {fillStyle: {color: Colors.danger}}
        }, options);
    }
    export function warning(options?: TextButtonOptions): TextButtonOptions {
        return Helpers.merge({
            textStyle: {color: '#000000'},
            background: {fillStyle: {color: Colors.warning}}
        }, options);
    }
    export function info(options?: TextButtonOptions): TextButtonOptions {
        return Helpers.merge({
            textStyle: {color: '#000000'},
            background: {fillStyle: {color: Colors.info}}
        }, options);
    }
    export function light(options?: TextButtonOptions): TextButtonOptions {
        return Helpers.merge({
            textStyle: {color: '#000000'},
            background: {fillStyle: {color: Colors.light}}
        }, options);
    }
    export function dark(options?: TextButtonOptions): TextButtonOptions {
        return Helpers.merge({
            textStyle: {color: '#ffffff'},
            background: {fillStyle: {color: Colors.dark}}
        }, options);
    }

    export module Outline {
        export function primary(options?: TextButtonOptions): TextButtonOptions {
            return Helpers.merge({
                textStyle: {color: Colors.toHexString(Colors.primary)},
                background: {lineStyle: {color: Colors.primary, width: 1}}
            }, options);
        }
        export function secondary(options?: TextButtonOptions): TextButtonOptions {
            return Helpers.merge({
                textStyle: {color: Colors.toHexString(Colors.secondary)},
                background: {lineStyle: {color: Colors.secondary, width: 1}}
            }, options);
        }
        export function success(options?: TextButtonOptions): TextButtonOptions {
            return Helpers.merge({
                textStyle: {color: Colors.toHexString(Colors.success)},
                background: {lineStyle: {color: Colors.success, width: 1}}
            }, options);
        }
        export function danger(options?: TextButtonOptions): TextButtonOptions {
            return Helpers.merge({
                textStyle: {color: Colors.toHexString(Colors.danger)},
                background: {lineStyle: {color: Colors.danger, width: 1}}
            }, options);
        }
        export function warning(options?: TextButtonOptions): TextButtonOptions {
            return Helpers.merge({
                textStyle: {color: Colors.toHexString(Colors.warning)},
                background: {lineStyle: {color: Colors.warning, width: 1}}
            }, options);
        }
        export function info(options?: TextButtonOptions): TextButtonOptions {
            return Helpers.merge({
                textStyle: {color: Colors.toHexString(Colors.info)},
                background: {lineStyle: {color: Colors.info, width: 1}}
            }, options);
        }
        export function light(options?: TextButtonOptions): TextButtonOptions {
            return Helpers.merge({
                textStyle: {color: Colors.toHexString(Colors.light)},
                background: {lineStyle: {color: Colors.light, width: 1}}
            }, options);
        }
        export function dark(options?: TextButtonOptions): TextButtonOptions {
            return Helpers.merge({
                textStyle: {color: Colors.toHexString(Colors.dark)},
                background: {lineStyle: {color: Colors.dark, width: 1}}
            }, options);
        }
    }
}