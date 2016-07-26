# asset-functions
Functions like image-url, image-width, ect. for node-sass

## Usage
```
const sass = require("node-sass"),
    assetFunctions = require("asset-functions");

sass.render({
    file: pathToSCSSFile,
    functions: assetFunctions({
        css: "styles/css",
        scss: "styles/scss",
        images_path: "assets/images",
        fonts_path: "assets/fonts"
    })
}, function(err, result){
    //write to disk with result.css
});

//OR

var result = sass.renderSync({
    file: pathToSCSSFile,
    functions: assetFunctions({
        css: "styles/css",
        scss: "styles/scss",
        images_path: "assets/images",
        fonts_path: "assets/fonts"
    })
});

//write to disk with result.css
```

## Options

### css
Where the css will be saved(for relative path)

### scss
Where the scss are

### images_path
Where the images are

### fonts_path
Where the fonts are


## Functions available
* `image-url($filename, $only_path: false)`
* `image-width($filename)`
* `image-height($filename)`
* `font-url($filename, $only_path: false)`
* `font-files($urls...)`
