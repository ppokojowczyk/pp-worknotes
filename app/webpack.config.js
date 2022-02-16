const webpack = require('webpack');
const path = require('path');
const HWP = require('html-webpack-plugin');

const config = {
    devServer: {
        port: 8080,
        host: '0.0.0.0',
        compress: true,
        hot: true,
        proxy: {
            '/note': {
                target: 'http://localhost:3000/',
                secure: false,
                changeOrigin: true,
                cookieDomainRewrite: true
            }
        },
        open: true
    },
    watchOptions: {
        aggregateTimeout: 500,
        poll: 1000
    },
    entry: [
        'react-hot-loader/patch',
        'webpack-hot-middleware/client',
        './ui/app.jsx'
    ],
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom',
        },
    },
    output: {
        path: path.resolve(__dirname, './public'),
        filename: 'bundle.js',
        publicPath: '/public/'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
        ]
    },
    plugins: [
        // new HWP(
        //     { template: path.join(__dirname, '/views/main.html') }
        // ),
        new webpack.HotModuleReplacementPlugin()
    ]
};

module.exports = (env, argv) => {
    config.mode = argv.mode === 'production' ? 'production' : 'development';
    return config;
};