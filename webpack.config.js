var webpack = require('webpack');
var path = require('path');
//global.jQuery = require('jquery');
//require('bootstrap');
//global.jQuery = global.$ = require('jquery');

module.exports = {
    entry: './src/main/js/application.js',
    devtool: 'sourcemaps',
    cache: true,
    output: {
        path: __dirname,
        filename: './src/main/resources/static/built/bundle.js'
    },
    module: {
        loaders: [
            {
                test: path.join(__dirname, '.'),
                exclude: /(node_modules)/,
                loader: 'babel',
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'react']
                }
            }
        ],
    /*plugins: [
          new webpack.ProvidePlugin({
            $: 'jquery',
            jquery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default'],
            // In case you imported plugins individually, you must also require them here:
            Util: "exports-loader?Util!bootstrap/js/dist/util",
            Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
          })
      ],
    externals: {
        jquery: 'jQuery'
    }*/
        /*loaders: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel'
          }
        ]*/
    }
}
