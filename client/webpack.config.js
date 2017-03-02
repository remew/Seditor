'use strict';

const path = require('path');

module.exports = {
    entry: ['./src/scripts/main.js'],
    output: {
        path: path.join(__dirname, '/dist/scripts'),
        publicPath: '/',
        filename: '/app.bundle.js',
    },
    module: {
        loaders: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/,

            query: {
                plugins: ['transform-es2015-modules-commonjs', 'transform-flow-strip-types']
            }
        }, {
            loader: 'ts-loader',
            test: /\.tsx?$/
        }]
    },
};

