# phaser-ui-components
phaser.io UI component library for use in browser games using the Phaser3 game engine

# UI Interactive Components

## Text Button

a `Phaser.GameObjects.Container` that can contain a centre-aligned text string and a background with either rounded or square corners. `TextButtonOptions` include the following:
```javascript
{
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    text?: string;
    textStyle?: Phaser.Types.GameObjects.Text.TextStyle;
    background?: Phaser.Types.GameObjects.Graphics.Styles;
    cornerRadius?: number | Phaser.Types.GameObject.Graphics.RoundedRectRadius;
    interactive?: boolean;
    padding?: number;
}
```

- **x**: [`number`] the x coordinate within your scene where this button will be centred _(optional - defaults to 0)_
- **y**: [`number`] the y coordinate within your scene where this button will be centred _(optional - defaults to 0)_
- **width**: [`number`] the width of the button. if specified and the text string provided is wider than this width, the text will be scaled down to fit _(optional - defaults to the text string width or 0 if no text provided)_
- **height**: [`number`] the height of the button. if specified and the text string provided is taller than this height, the text will be scaled down to fit _(optional - defaults to the text string height or 0 if no text provided)_
- **text**: [`string`] the text string to display within the button _(optional - defaults to null)_
- **textStyle**: [`Phaser.Types.GameObjects.Text.TextStyle`] an object allowing full control over the text styling _(optional - defaults to `20px Courier #000000`)_
  - **NOTE**: presets are provided in the `TextButtonOptions` module and can be used like `TextButtonOptions.primary(...)` or `TextButtonOptions.Outline.info(...)`
- **background**: [`Phaser.Types.GameObjects.Graphics.Styles`] an object allowing full control over the background styling _(optional - defaults to undefined)_
  - **NOTE**: presets are provided in the `TextButtonOptions` module and can be used like `TextButtonOptions.primary(...)` or `TextButtonOptions.Outline.info(...)`
- **cornerRadius**: [`number`] allows specifying a rounded corner radius for the button background _(optional - defaults to 0)_
- **interactive**: [`boolean`] if _true_ you can set Phaser EventListener functions like `Phaser.Input.Events.POINTER_DOWN` on this button _(optional - defaults to false)_
- **padding**: [`number`] an amount to pad any text from the edge of the button. this will not increase the width or height if you've specified them in the options, but will ensure the edge of the button will be the number of pixels specified away from the text by scaling the text as needed _(optional - defaults to 0)_

## Card

an object that can contain a header, image, title, and description similar to a HTML card. the `Card` object is comprised of separate `CardHeader`, `CardImage`, and `CardBody` objects allowing for individual use as needed.

`CardOptions` are as follows:
```javascript
{
    x?: number;
    y?: number;
    width?: number;
    padding?: number;
    cornerRadius?: number;
    header?: CardHeaderOptions;
    image?: CardImageOptions;
    body?: CardBodyOptions;
}
```

- **x**: [`number`] the x coordinate within your scene where this card will be centred _(optional - defaults to 0)_
- **y**: [`number`] the y coordinate within your scene where this card will be centred _(optional - defaults to 0)_
- **width**: [`number`] the width of the card. if not specified this will be the width of the first non-null contents specified _(optional - defaults to the content width or 0 if none provided)_
- **padding**: [`number`] sets the `padding` for any `CardHeader` and `CardBody` added _(optional - defaults to 0)_
- **cornerRadius**: [`number`] sets the `cornerRadius` for any `CardHeader` and `CardBody` added _(optional - defaults to 0)_
- **header**: [`CardHeaderOptions`] an object containing the configuration options for the header area _(optional - no card header created if undefined or null)_
- **image**: [`CardImageOptions`] an object containing the configuration options for the image area _(optional - no card image created if undefined or null)_
- **body**: [`CardBodyOptions`] an object containing the configuration options for the card body area _(optional - no card body created if undefined or null)_

### CardHeader

the card header can have a text value and a background which can include rounded upper corners. options for the header are similar to those for a `TextButton` as the two are nearly identical in looks with the main difference being that the `CardHeader` will only round the top corners if a non-zero `cornerRadius` is supplied in the `CardHeaderOptions`:
```javascript
{
    x?: number;
    y?: number;
    width?: number;
    text?: string;
    textStyle?: Phaser.Types.GameObjects.Text.TextStyle;
    background?: Phaser.Types.GameObjects.Graphics.Styles;
    cornerRadius?: number;
    padding?: number;
}
```

- **x**: [`number`] the x coordinate within your scene where this header will be centred _(optional - defaults to 0)_
- **y**: [`number`] the y coordinate within your scene where this header will be centred _(optional - defaults to location directly above `CardImage` or `CardBody`)_
- **width**: [`number`] the width of the header. if specified and the text string provided is wider than this width, the text will be scaled down to fit _(optional - defaults to the text string width or 0 if no text provided)_
- **text**: [`string`] the text string to display within the header _(optional - defaults to null)_
- **textStyle**: [`Phaser.Types.GameObjects.Text.TextStyle`] an object allowing full control over the text styling _(optional - defaults to `{font: '20px Courier', color: '#000000', align: 'center'}`)_
- **background**: [`Phaser.Types.GameObjects.Graphics.FillStyle`] an object allowing full control over the fill style of the background _(optional - defaults to no background)_
- **cornerRadius**: [`number`] allows specifying a rounded corner radius for the upper corners of the header background _(optional - defaults to 0)_
- **padding**: [`number`] an amount to pad any text from the edge of the header. this will not increase the width or height if you've specified them in the options, but will ensure the edge of the header will be the number of pixels specified away from the text by scaling the text as needed _(optional - defaults to 0)_

# UI Layout Components

## GridLayout
a UI layout that divides the screen area into rows and columns and provides control over the alignment and positioning of items placed within each `GridCell` of the `GridLayout`. `GridLayoutOptions` include the following:
```javascript
{
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    rows?: number;
    columns?: number;
    margins?: number;
    padding?: number;
}
```
you must add content to each `GridCell` of the `GridLayout` by calling `new GridLayout(scene).getGridCell(0, 0).setContent(new TextButton(scene, TextButtonOptions.primary({text: 'foo'})))` where `getGridCell(0, 0)` returns the _top-left_ cell and `getGridCell(0, 11)` returns the _top-right_ cell

## LinearLayout
a UI layout that centre aligns all contents in either a horizontal or vertical orientataion. `LinearLayoutOptions` include the following:
```javascript
{
    x?: number;
    y?: number;
    orientation?: 'vertical' | 'horizontal';
    padding?: number;
    contents?: LayoutContent[];
}
```

## FlexLayout
a UI layout that places as many `LayoutContent` items on the same row as will fit based on the layout's width and padding before wrapping to the next row and continuing the process. `FlexLayoutOptions` include the following:
```javascript
{
    x?: number;
    y?: number;
    width?: number;
    padding?: number;
    contents?: LayoutContent[];
}
```
> NOTE: `Phaser.GameObjects.Graphics` objects do not report their width properly so they should be placed inside a `Phaser.GameObjects.Container` who's size is set before being added to this layout for proper placement

# UI Utilities

## Colors module
provides functions to convert between hexidecimal strings and numbers as well as for determining if a colour is dark. also contains a set of predefined colours like `Colors.primary`, `Colors.info`, and `Colors.danger` and can generate random colours.

- `Colors.isDark(color: string | number): boolean` - returns _true_ if 50% or more of the colour's hexidecimal values are between 0 and 7
- `Colors.toHexString(color: number): string` - converts a number like `0xfc5a6d` to a string like `#fc5a6d`
- `Colors.toHexNumber(color: string): number` - converts a string like `#fc5a6d` to a number like `0xfc5a6d`
- `Colors.random(): string` - generates a random colour string like `#fc5a6d`

## Styles module
provides preset text and graphics styles that can be used with your UI components. for example: `Styles.primary().text` contains preset values for use as a `Phaser.Types.GameObjects.Text.TextStyle` object that will work well with a background of `Styles.primary().graphics` that contains preset values for use as a `Phaser.Types.GameObjects.Graphics.Styles` object