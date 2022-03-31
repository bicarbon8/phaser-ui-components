import { Colors } from "../color/colors";

export interface Styles {
    text: Phaser.Types.GameObjects.Text.TextStyle;
    graphics: Phaser.Types.GameObjects.Graphics.Styles;
}

export module Styles {
    export function primary(): Styles {
        return {
            text: { color: '#ffffff' },
            graphics: { fillStyle: { color: Colors.primary } }
        }
    }
    export function secondary(): Styles {
        return {
            text: { color: '#ffffff' },
            graphics: { fillStyle: { color: Colors.secondary } }
        }
    }
    export function success(): Styles {
        return {
            text: { color: '#ffffff' },
            graphics: { fillStyle: { color: Colors.success } }
        }
    }
    export function danger(): Styles {
        return {
            text: { color: '#ffffff' },
            graphics: { fillStyle: { color: Colors.danger } }
        }
    }
    export function dark(): Styles {
        return {
            text: { color: '#ffffff' },
            graphics: { fillStyle: { color: Colors.dark } }
        }
    }
    export function warning(): Styles {
        return {
            text: { color: '#000000' },
            graphics: { fillStyle: { color: Colors.warning } }
        }
    }
    export function info(): Styles {
        return {
            text: { color: '#000000' },
            graphics: { fillStyle: { color: Colors.info } }
        }
    }
    export function light(): Styles {
        return {
            text: { color: '#000000' },
            graphics: { fillStyle: { color: Colors.light } }
        }
    }

    export module Outline {
        export function primary(): Styles {
            return {
                text: { color: Colors.toHexString(Colors.primary) },
                graphics: { lineStyle: { color: Colors.primary, width: 1 } }
            }
        }
        export function secondary(): Styles {
            return {
                text: { color: Colors.toHexString(Colors.secondary) },
                graphics: { lineStyle: { color: Colors.secondary, width: 1 } }
            }
        }
        export function success(): Styles {
            return {
                text: { color: Colors.toHexString(Colors.success) },
                graphics: { lineStyle: { color: Colors.success, width: 1 } }
            }
        }
        export function danger(): Styles {
            return {
                text: { color: Colors.toHexString(Colors.danger) },
                graphics: { lineStyle: { color: Colors.danger, width: 1 } }
            }
        }
        export function dark(): Styles {
            return {
                text: { color: Colors.toHexString(Colors.dark) },
                graphics: { lineStyle: { color: Colors.dark, width: 1 } }
            }
        }
        export function warning(): Styles {
            return {
                text: { color: Colors.toHexString(Colors.warning) },
                graphics: { lineStyle: { color: Colors.warning, width: 1 } }
            }
        }
        export function info(): Styles {
            return {
                text: { color: Colors.toHexString(Colors.info) },
                graphics: { lineStyle: { color: Colors.info, width: 1 } }
            }
        }
        export function light(): Styles {
            return {
                text: { color: Colors.toHexString(Colors.light) },
                graphics: { lineStyle: { color: Colors.light, width: 1 } }
            }
        }
    }
}