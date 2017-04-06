const path = require('path');

const config = {
    entry: [
        './src/index'
    ],
    module: {
        rules: [{
            exclude: /node_modules/,
            test: /\.js$/,
            use: [{
                loader: 'babel-loader',
                options: {
                    plugins: ['transform-object-rest-spread'],
                    presets: ['es2015', 'react', 'stage-0']
                }
            }]
        },
        {
            test: /\.json$/,
            use: 'json-loader'
        },
        {
            test: /\.css|\.png|\.svg|\.eot|\.ttf|\.woff|\.woff2$/,
            use: 'file-loader'
        },
        {
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
        }
        ]
    },
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist'),
        publicPath: '/dist'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    target: 'electron-renderer'
};

process.traceDeprecation = true;

module.exports = config;
