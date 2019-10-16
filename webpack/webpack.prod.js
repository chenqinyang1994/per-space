const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
    mode: 'production',
    optimization: {
        minimizer: [new OptimizeCSSAssetsPlugin(), new TerserJSPlugin()],
    },
    plugins: [
        new CleanWebpackPlugin(),
        // new BundleAnalyzerPlugin()
    ]
}