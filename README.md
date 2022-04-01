# phaser-ui-components
phaser.io UI component library for use in browser games using the Phaser3 game engine

> Code Demo and UI Example: [npmjs sandbox](https://ihg0zm.csb.app)

# UI Interactive Components

- **Text Button**: a `Phaser.GameObjects.Container` that can contain a centre-aligned text string and a background with either rounded or square corners. 
- **Card**: an object that can contain a header, image, title, and description similar to a HTML card. the `Card` object is comprised of separate `CardHeader`, `CardImage`, and `CardBody` objects allowing for individual use as needed.
  - **CardHeader**: the card header can have a text value and a background which can include rounded upper corners. options for the header are similar to those for a `TextButton` as the two are nearly identical in looks with the main difference being that the `CardHeader` will only round the top corners if a non-zero `cornerRadius` is supplied in the `CardHeaderOptions`
  - **CardImage**: the card image can have a `Phaser.GameObjects.Sprite` image and a background. the sprite will be scaled to fill the specified width and height of the `CardImage` object while maintaining it's aspect ratio.
  - **CardBody**: the card body contains a title, description and area for buttons (all of which are optional). the button area makes use of a `FlexLayout` so buttons will wrap once they've filled the width available.

# UI Layout Components

## GridLayout
a UI layout that divides the screen area into rows and columns and provides control over the alignment and positioning of items placed within each `GridCell` of the `GridLayout`. 

you must add content to each `GridCell` of the `GridLayout` by calling `new GridLayout(scene).getGridCell(0, 0).setContent(new TextButton(scene, TextButtonOptions.primary({text: 'foo'})))` where `getGridCell(0, 0)` returns the _top-left_ cell and `getGridCell(0, 11)` returns the _top-right_ cell

## LinearLayout
a UI layout that centre aligns all contents in either a horizontal or vertical orientataion based on the option specified (default is _horizontal_). 

## FlexLayout
a UI layout that places as many `LayoutContent` items on the same row as will fit based on the layout's width and padding before wrapping to the next row and continuing the process. 

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