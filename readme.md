# mcformat
**mcformat** is a fast and safe JavaScript library to format Minecraft-formatted string
to DOM elements

## Credits
Fonts weren't created by me, you can download them [here](https://fonts2u.com/download/minecraft-bold.family)

## Installation
1. Download [mcformat.zip](https://raw.githubusercontent.com/yusshu/mcformat/master/mcformat.zip) or clone the repository and execute the `pack.sh` script
2. Unzip `mcformat.zip` in your project
3. Add the script and the styles
   ```html
    <script src="mcformat.min.js"></script>
   ```
   ```html
    <link rel="stylesheet" href="mcformat.min.css">
   ```

## Usage
JavaScript required code:
```javascript
// Create the formatter
const formatter = new MCFormat(); // You can specify a color char using 'new MCFormat("&");' 

// Convert any string text to an element
const element = formatter.format('&9&lSome text &7text');
```

CSS (Optional, only modify if you want to customize the result)
```css
/* All classes are prefixed with 'mc-' */

.mc-root {
    /* This is the root span element */
}

/* Customizing formats */
.mc-red {
    color: #FF0000;
}

.mc-blue {
    color: #0000FF;
}

.mc-bold { ... }

/* etc... */
```
