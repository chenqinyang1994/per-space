const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
// 开发环境配置
const dev = require('./webpack.dev');
// 生产环境配置
const prod = require('./webpack.prod');

module.exports = env => {
    let isDev = env.development;
    // 基础配置
    const base = {
        entry: './src/index.js',
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, '../dist')
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: path.resolve(__dirname, '../public/index.html'),
                hash: true,
                minify: !isDev && {
                    removeAttributeQuotes: true,
                    collapseWhitespace: true,
                    removeTagWhitespace: true
                }
            })
        ]
    }

    if (isDev) {
        return merge(base, dev);
    } else {
        return merge(base, prod);
    }
}