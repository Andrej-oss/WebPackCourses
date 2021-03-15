const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizerCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

const isDev = process.env.NODE_ENV === 'development';
console.log(isDev);
const isProd = !isDev;

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: "all"
        }
    };
    if (isProd){
        config.minimizer = [
            new TerserWebpackPlugin(),
            new OptimizerCssAssetsWebpackPlugin()
        ]
    }
    return config;
};
const fileName = (ext) => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

const cssLoader = (extra) => {
    const loader = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
            }

        }, 'css-loader'];
    if (extra){
        loader.push(extra);
    }
    return loader
};
const babelOptions = (preset) => {
    const opts = {
        presets: [
            '@babel/preset-env',
        ],
        plugins:['@babel/plugin-proposal-class-properties']
    };
    if (preset){
        opts.presets.push(preset);
    }
    return opts;
};
const jsLoader = () => {
    const loaders = [{
        loader: 'babel-loader',
        options: babelOptions()
    }];
    if (isDev){
        loaders.push('eslint-loader')
    }
    return loaders;
};
plugins = () => {
    const basePlugins =  [
        new HtmlWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [{
                from: path.resolve(__dirname, 'src/assets/faviconka.ico'),
                to: path.resolve(__dirname, 'dist')
            }],
        }),
        new MiniCssExtractPlugin({
            filename: fileName('css')
        })
    ];
    if (isProd){
        basePlugins.push(new BundleAnalyzerPlugin());
    }
    return basePlugins;
};

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: ['@babel/polyfill','./index.jsx'],
        analytics: './analytics.ts'
    },
    output: {
        filename: fileName('js'),
        path: path.resolve(__dirname, 'dist')
    },
    optimization: optimization(),
    devServer: {
        port: 4200,
        hot: isDev,
    },
     devtool:  'nosources-source-map' ,
    resolve: {
        extensions: [
            '.js', '.json', '.png', '.jpg'
        ],
        alias:
            {
                '@': path.resolve(__dirname, 'src'),
                '@model': path.resolve(__dirname, 'src/model')
            }
    },
    plugins: plugins(),
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoader()
            },
            {
                test: /\.(jpg|png|svg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.ttf$/,
                use: ['file-loader']
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            },
            {
                test: /\.csv$/,
                use: ['csv-loader']
            },
            {
                test: /\.less$/,
                use: cssLoader('less-loader')
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoader('sass-loader')
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: jsLoader()
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: babelOptions('@babel/preset-typescript'),
                }
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: babelOptions('@babel/preset-react'),
                }
            },
        ]
    }
};
