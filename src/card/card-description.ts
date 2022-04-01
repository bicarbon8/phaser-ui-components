import { LayoutContent } from "../layout/layout-content";
import { LinearLayout } from "../layout/linear-layout";
import { Helpers } from "../utilities/helpers";
import { CardDescriptionOptions } from "./card-description-options";

export class CardDescription extends LinearLayout {
    private readonly _opts: CardDescriptionOptions;
    
    constructor(scene: Phaser.Scene, options?: CardDescriptionOptions) {
        options = Helpers.merge(CardDescriptionOptions.DEFAULT(scene), options);
        super(scene, {
            x: options.x,
            y: options.y,
            width: options.width,
            height: options.height,
            padding: options.padding,
            alignment: options.alignment,
            orientation: 'vertical'
        });
        this._opts = options;
        this.setText(this._opts.text, this._opts.textStyle);
    }

    get text(): string {
        return this.contents
        .map((t: LayoutContent) => (t as Phaser.GameObjects.Text)?.text)
        .filter((t: string) => t != null)
        .join(' ');
    }

    setText(text: string, textStyle?: Phaser.Types.GameObjects.Text.TextStyle): CardDescription {
        if (this.contents.length) {
            this.removeAllContent(true);
        }
        if (text) {
            this._opts.text = text;
            this._opts.textStyle = textStyle;
            const words: string[] = this._opts.text.split(' ');
            if (words?.length > 0) {
                for (var i=0; i<words.length; i++) {
                    let word: string = words[i];
                    let line: Phaser.GameObjects.Text = this._getLastLine();
                    let lineWords: string = line.text;
                    if (line.width < this._opts.width) {
                        if (lineWords.length > 0) {
                            line.setText(`${lineWords} ${word}`);
                        } else {
                            line.setText(word);
                        }
                        if (line.width > this._opts.width) {
                            // reset and create new line
                            line.setText(lineWords);
                            this._newLine(word);
                        }
                    }
                }
                this.refreshLayout();
            }
        }
        return this;
    }
    
    getLine(index: number): string {
        if (0 <= index && index < this.contents.length) {
            const row: Phaser.GameObjects.Text = this.contents[index] as Phaser.GameObjects.Text;
            return row.text;
        }
        return null;
    }

    private _getLastLine(): Phaser.GameObjects.Text {
        let line: Phaser.GameObjects.Text;
        if (this.contents.length <= 0) {
            line = this._newLine('');
        } else {
            line = this.contents[this.contents.length - 1] as Phaser.GameObjects.Text;
        }
        return line;
    }

    private _newLine(text: string): Phaser.GameObjects.Text {
        const line: Phaser.GameObjects.Text = new Phaser.GameObjects.Text(this.scene, 0, 0, text, this._opts.textStyle);
        this.addContents(line);
        return line;
    }
}