const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const webpackConfig = {
    context: __dirname,
    entry: [
        './src/index.jsx',
        './src/styles.scss',
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'beaf.js',
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
    module: {
        loaders: [{
            test: /\.s?css$/,
            loader: ExtractTextPlugin.extract('style', 'css!postcss!sass'),
        }, {
            test: /\.json$/,
            loader: 'json',
        }, {
            test: /\.jsx?$/,
            exclude: /(node_modules)/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'react'],
            },
        }],
    },
    postcss: [
        autoprefixer({
            browsers: [
                'last 3 versions',
            ],
        }),
    ],
    plugins: [
        new ExtractTextPlugin('beaf.css'),
    ],
};

module.exports = webpackConfig;
