const path = require('path');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const Webpack = require('webpack');

module.exports = {
    mode: 'development',
    devServer: {
        // clientLogLevel: 'none', // 关闭HMR的log
        hot: true,
        port: 3148,
        open: true,
        progress: true,
        compress: true, // 开启gzip
        contentBase: path.resolve(__dirname, '../dist')
    },
    plugins: [
        new Webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, '../dll/manifest.json')
        }),
        new AddAssetHtmlWebpackPlugin({
            filepath: path.resolve(__dirname, '../dll/vendor.dll.js')
        }),
        new Webpack.HotModuleReplacementPlugin()
    ]
}