var path = require("path");

var DIST_DIR = path.resolve(__dirname, "dist");
var SRC_DIR = path.resolve(__dirname, "public");

var config = {
    entry: SRC_DIR + "/translation.js",
    output: {
        path: DIST_DIR + "/public",
        filename: "bundle.js",
        publicPath: "/"
    },
    module: {
        loaders: [
            {
                test: /\.js?/,
                include: SRC_DIR,
                loader: "babel-loader",
                query: {
                    presets: ["react", "es2015", "stage-2"]
                }
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
};

module.exports = config;