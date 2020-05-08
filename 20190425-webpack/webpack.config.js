var HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack')
const path = require('path');
module.exports = {
    entry: './src/index.js',
    mode: "development",
     /**
     * source-map 生成map文件
     * inline map文件作为base64加载到打包的js后面
     * cheap 定位错误至行不至列
     * eval 最快的，用eval执行
     * module 编译第三方模块的
     */
    devtool: 'inline-cheap-source-map',
    devServer: {
        contentBase: "./dist",
        open: true,
        port: 8081,
        // 热更新
        hot: true,
        hotOnly: true,
        proxy: {
            '/api': {
                target: 'http://192.168.1.5:3000/'
            }
        }
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index.js'
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/,
                use: [
                    {
                        loader: 'file-loader', 
                        options: {
                            name: '[name]_[hash].[ext]',
                            outputPath: 'images/',
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: [
                    {
                        loader: 'url-loader', 
                        options: {
                            name: '[name]_[hash].[ext]',
                            outputPath: 'images/',
                            // 小于limit的时候，才走这个test，转换为base64
                            limit: 0
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    // {
                    //     loader: MiniCssExtractPlugin.loader
                    // },
                'style-loader', 'css-loader' , 'postcss-loader'],
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // 将 JS 字符串生成为 style 节点
                }, {
                    loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
                }, {
                    loader: "sass-loader" // 将 Sass 编译成 CSS
                }]
            },
            { 
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: "babel-loader",
                options: {
                    "presets": ["@babel/preset-env"]
                }
            }
        ]
    },
    plugins: [
        // 删除dist文件
        new CleanWebpackPlugin(),
        // 打包html
        new HtmlWebpackPlugin({
            filename: "index.html"
        }),
        // 抽离css文件
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        // css 热更新
        new webpack.HotModuleReplacementPlugin()
    ]
}