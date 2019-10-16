const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const glob = require('glob-all');
const PurgecssWebpackPlugin = require('purgecss-webpack-plugin');

// 费时分析：可以计算每一步执行的运行速度
// const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
// const smw = new SpeedMeasureWebpackPlugin();

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
        devtool: isDev ? 'cheap-module-eval-source-map' : false,
        resolve: {
            extensions: [".js", ".jsx"]
        },
        module: {
            rules: [
                {
                    test: /\.(c|le)ss$/i,
                    use: [
                        isDev 
                            ? 'style-loader' 
                            : {
                                loader: MiniCssExtractPlugin.loader,
                                options: {
                                    publicPath: '../',
                                }
                                
                            }, 
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 2
                            }
                        },
                        'postcss-loader',
                        'less-loader'
                    ],
                    exclude: /node_modules/
                },
                {
                    test: /\.(woff|ttf|eot|svg|otf|svg)$/i,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: 'img/[name].[ext]?[contenthash]'
                        }
                    },
                    exclude: /node_modules/
                },
                {
                    test: /\.(png|jpe?g|gif)$/i,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 8*1024,
                                name: 'img/[name].[ext]?[contenthash]'
                            }
                        },
                        {
                            loader: 'image-webpack-loader',
                            options: {
                                mozjpeg: {
                                    progressive: true,
                                    quality: 65
                                },
                                optipng: {
                                    enabled: false,
                                },
                                pngquant: {
                                    quality: [0.65, 0.90],
                                    speed: 4
                                },
                                gifsicle: {
                                    interlaced: false,
                                },
                                webp: {
                                    quality: 75
                                }
                            }
                        }
                    ],
                    exclude: /node_modules/
                },
                {
                    test: /\.jsx?$/i,
                    use: 'babel-loader',
                    exclude: /node_modules/
                }
            ],
            noParse: /lodash/,
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                hash: true,
                template: path.resolve(__dirname, '../public/index.html'),
                favicon: path.resolve(__dirname, '../public/favicon.ico'),
                minify: !isDev && {
                    removeAttributeQuotes: true,
                    collapseWhitespace: true,
                    removeTagWhitespace: true
                }
            }),
            !isDev && new MiniCssExtractPlugin({
                filename: 'css/[name].[hash].css',
                chunkFilename: 'css/[id].[hash].css'
            }),
            !isDev && new PurgecssWebpackPlugin({
                paths: glob.sync([
                    `${path.join(__dirname, "../src")}/**/*`,
                    `${path.join(__dirname, "../public")}/**/*`
                ], { nodir: true })
            })
        ].filter(Boolean)
    }

    if (isDev) {
        return merge(base, dev);
    } else {
        return merge(base, prod);
    }
}