const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const VENDOR_LIBS = [
    // Vendor libraries
    'react',
    'react-dom',
    'react-router-dom'
];

const config = {
    entry: {
        main: './src/index.js',
        vendor: VENDOR_LIBS
      },
    output: {
        path: path.join(__dirname, './build'),
        filename: '[name].[hash].js'
    },
    module: {
        rules: [
          {
            exclude: /node_modules/,
            test: /\.(js|jsx)$/,
            use: 'babel-loader'
          },
          {
            test: /\.(css|scss|sass)$/,
            use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: [
                { loader: 'css-loader' },
                { loader: 'postcss-loader' },
                { loader: 'sass-loader' }
              ]
            })
          },
          {
            test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|mp3|wav)(\?.*$|$)/,
            use: 'file-loader'
          }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['main', 'vendor', 'manifest']
        }),
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new ExtractTextPlugin('styles.css'),
        new FaviconsWebpackPlugin({
            logo: path.join(__dirname, './favicon.png'),
            prefix: '[name].[hash]',
            emitStats: false,
            inject: true,
            icons: {
                android: false,
                appleIcon: false,
                appleStartup: false,
                coast: false,
                favicons: true,
                firefox: false,
                opengraph: false,
                twitter: false,
                yandex: false,
                windows: false
            }
        })
    ],
    devServer: {
        historyApiFallback: true
    }
};

if(process.env.NODE_ENV === 'production') {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    );
}

module.exports = config;