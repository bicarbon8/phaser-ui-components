# phaser-ui-components
phaser.io UI component library for use in browser games using the Phaser3 game engine

# Interactive UI Components

## Text Button
<button>text_button</button> 

a `Phaser.GameObjects.Container` that can contain a centre-aligned text string and a background with either rounded or square corners. options include the following:
- **x**: [`number`] the x coordinate within your scene where this button will be centred _(optional - defaults to 0)_
- **y**: [`number`] the y coordinate within your scene where this button will be centred _(optional - defaults to 0)_
- **width**: [`number`] the width of the button. if specified and the text string provided is wider than this width, the text will be scaled down to fit _(optional - defaults to the text string width or 0 if no text provided)_
- **height**: [`number`] the height of the button. if specified and the text string provided is taller than this height, the text will be scaled down to fit _(optional - defaults to the text string height or 0 if no text provided)_
- **text**: [`string`] the text string to display within the button _(optional - defaults to null)_
- **textSize**: [`number`] the pixel size of the text in height _(optional - defaults to 20)_
- **buttonStyle**: [`ButtonStyle`] an object containing a **textColor** `string` and a **backgroundColor** `number` where the **textColor** is a hexidecimal color string like those used in HTML (ex: `#fc56d5`) and the **backgroundColor** is a hexidecimal color number like `0xd0d0d0` _(optional - defaults to `#000000` for the **textColor** and null for the **backgroundColor**). **NOTE**: presets are provided in the `ButtonStyle` module and can be used like `ButtonStyle.primary` or `ButtonStyle.info`
- **cornerRadius**: [`number`] allows specifying a rounded corner radius for the button background _(optional - defaults to 0)_
- **interactive**: [`boolean`] if _true_ you can set Phaser EventListener functions like `Phaser.Input.Events.POINTER_DOWN` on this button _(optional - defaults to false)_
- **padding**: [`number`] an amount to pad any text from the edge of the button. this will not increase the width or height if you've specified them in the options, but will ensure the edge of the button will be the number of pixels specified away from the text by scaling the text as needed _(optional - defaults to 0)_

## Card
<div>
    <div  style="background-color: #0d6efd"> &nbsp; header_text </div>
    <div style="background-color: #ffffff"> &nbsp; image <br /> &nbsp; displays <br /> &nbsp; here </div>
    <div style="background-color: #808080">
        <div> &nbsp; body_title </div>
        <div> &nbsp; body_description </div>
    </div>
</div>
an object that can contain a header, image, title, and description similar to a HTML card. the `Card` object is comprised of separate `CardHeader`, `CardImage`, and `CardBody` objects allowing for individual use as needed.

`Card` options are as follows:

- **x**: [`number`] the x coordinate within your scene where this card will be centred _(optional - defaults to 0)_
- **y**: [`number`] the y coordinate within your scene where this card will be centred _(optional - defaults to 0)_
- **width**: [`number`] the width of the card. if not specified this will be the width of the first non-null contents specified _(optional - defaults to the content width or 0 if none provided)_
- **height**: [`number`] currently unused and Card height will grow with contents
- **header**: [`CardHeaderOptions`] an object containing the configuration options for the header area _(optional - no card header created if undefined or null)_
- **image**: [`CardImageOptions`] an object containing the configuration options for the image area _(optional - no card image created if undefined or null)_
- **body**: [`CardBodyOptions`] an object containing the configuration options for the card body area _(optional - no card body created if undefined or null)_