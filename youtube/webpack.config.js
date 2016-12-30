'use strict';

const webpack = require('webpack');

module.exports = {
    // context: './build',
    entry: './build/app.js',

    output: {
        path: __dirname + '/dist',
        publicPath: '/', 
        filename: 'bundle.js'
    },

    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
        ]
    }
};