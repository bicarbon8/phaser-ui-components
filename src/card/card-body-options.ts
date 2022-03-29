import { TextButtonOptions } from "../button/text-button-options";

export interface CardBodyOptions {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    title?: string;
    titleStyle?: Phaser.Types.GameObjects.Text.TextStyle;
    description?: string;
    descriptionStyle?: Phaser.Types.GameObjects.Text.TextStyle;
    buttons?: TextButtonOptions[];
    buttonSpacing?: number;
    background?: Phaser.Types.GameObjects.Graphics.Styles;
    cornerRadius?: number;
    padding?: number;
}