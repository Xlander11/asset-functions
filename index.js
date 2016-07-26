/**
 * Created by Alexandre on 7/25/2016.
 */


const Helper = require('./helper'),
    sass = require('node-sass');


function assetsFunctions(opts){
    var helper = new Helper(opts);

    return {
        'image-url($filename, $only_path: false)': function(filename, only_path) {
            if(only_path.getValue()){
                return helper.assetUrl(filename.getValue(), "image");
            }else {
                return new sass.types.String(
                    ["url(\"", helper.imageUrl(filename.getValue()), "\")"].join("")
                );
            }
        },
        "image-width($filename)": function (filename){
            return new sass.types.Number(helper.imageWidth(filename.getValue()), "px");
        },
        "image-height($filename)": function (filename){
            return new sass.types.Number(helper.imageHeight(filename.getValue()), "px");
        },
        'font-url($filename, $only_path: false)': function(filename, only_path) {
            if(only_path.getValue()){
                return helper.assetUrl(filename.getValue(), "font");
            }else {
                return new sass.types.String(
                    ["url(\"", helper.fontUrl(filename.getValue()), "\")"].join("")
                );
            }
        },
        'font-files($urls...)': function(urls) {
            var fontFiles = helper.fontFiles(urls),
                list = new sass.types.List(fontFiles.length);

            for(var i = 0;i < fontFiles.length;i++){
                list.setValue(i, new sass.types.String(["url(\"", fontFiles[i].url, "\") format(\"", fontFiles[i].type, "\")"].join("")));
            }

            return list;
        }
    }
}

module.exports = assetsFunctions;