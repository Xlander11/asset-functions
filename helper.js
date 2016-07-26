/**
 * Created by Alexandre on 7/25/2016.
 */

const sizeOf = require('image-size'),
    mime = require('mime'),
    fs = require('fs'),
    path = require("path");

const FONT_TYPES = {
    woff: 'woff',
    woff2: 'woff2',
    otf: 'opentype',
    opentype: 'opentype',
    ttf: 'truetype',
    truetype: 'truetype',
    svg: 'svg',
    eot: 'embedded-opentype'
};


function Helper(opts) {
    this.opts = opts || {};

    this.paths = {
        images_path: "assets/images",
        fonts_path: "assets/fonts",
        scss: "scss",
        css: "css",
        http_images_path: "/images",
        http_fonts_path: "/fonts"
    };

    for(var path in this.paths){
        if(path in this.opts){
            this.paths[path] = this.opts[path];
        }
    }
}

/**
 * Givs the real path of the file
 * @param filepath {string}
 * @param type {string}
 *
 * @return {string}
 */
Helper.prototype.realPath = function (filepath, type){
    if(type == "image") {
        return path.resolve("./", [this.paths.images_path, "/", filepath].join(""));
    }else if(type == "font"){
        return path.resolve("./", [this.paths.fonts_path, "/", filepath].join(""));
    }
};

/**
 * Gets the relative path of the file
 *
 * @param filepath {string}
 * @param type {string}
 * @return {string}
 */
Helper.prototype.assetUrl = function (filepath, type){
    var relativePath = path.relative(
        path.resolve("./", this.paths.css),
        this.realPath(filepath, type)
    );

    return relativePath.split(path.sep).join("/");
};

/**
 * Gets the relative path of an image
 * @param filepath {string}
 * @return {string}
 */
Helper.prototype.imageUrl = function (filepath){
    return this.assetUrl(filepath, "image");
};

/**
 * Get the width of an image
 * @param filepath {string}
 * @return {number}
 */
Helper.prototype.imageWidth = function (filepath){
    return sizeOf(this.realPath(filepath, "image")).width;
};

/**
 * Get the height of an image
 * @param filepath {string}
 * @return {number}
 */
Helper.prototype.imageHeight = function (filepath){
    return sizeOf(this.realPath(filepath, "image")).height;
};

/**
 * Gets the relative path of a font file
 * @param filepath {string}
 * @return {string}
 */
Helper.prototype.fontUrl = function (filepath){
    return this.assetUrl(filepath, "font");
};

/**
 * Creates an array of font files and their type
 * @param files {SassList}
 * @return {Array}
 */
Helper.prototype.fontFiles = function (files){
    var fontFiles = [];
    for(var i = 0;i < files.getLength();i++){
        var file = files.getValue(i).getValue();
        fontFiles.push({
            url: this.fontUrl(file),
            type: FONT_TYPES[path.extname(this.realPath(file, "font")).substring(1)]
        });
    }

    return fontFiles;
};

module.exports = Helper;