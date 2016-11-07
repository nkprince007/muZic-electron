var webpack = require('webpack');
var webpackTargetElectronRenderer = require('webpack-target-electron-renderer')
var path = require('path');

var config = {
    entry: [
        'webpack-hot-middleware/client?reload=true&path=http://localhost:9000/__webpack_hmr',
        './src/index',
    ],
    module: {
        loaders: [
            { test: /\.json$/, loader: 'json' },
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.css|\.png|\.svg|\.eot|\.ttf|\.woff|\.woff2$/, loader: 'file-loader' },
            { test: /\.scss$/, loaders: ['style', 'css', 'sass'] }
        ]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: 'http://localhost:9000/dist/',
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ]
};

config.target = webpackTargetElectronRenderer(config);

module.exports = config;
