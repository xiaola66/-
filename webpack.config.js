const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const bootstrapEntryPoints = require('./webpack.bootstrap.config');
const glob = require('glob');
const PurifyCSSPlugin = require('purifycss-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production';
const cssDev = ['style-loader','css-loader','sass-loader'];
const cssProd = ExtractTextPlugin.extract({
                    use: ['css-loader', 'sass-loader'],
                    fallback: 'style-loader', 
                    publicPath: '/dist'
                });
const cssConfig = isProd ? cssProd : cssDev;
const bootstrapConfig = isProd ? bootstrapEntryPoints.prod : bootstrapEntryPoints.dev;
module.exports = {
    entry: {
        app: './src/index.js',
        user: "./src/user/user.js",
        bootstrap: 
       bootstrapConfig
        // add new scripts for different pages here (ie another: './src/another.js')
      
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {   test: /\.scss$/, 
                exclude: /node_modules/,
                use: cssConfig
            },
            {   test: /\.js$/, 
                exclude: /node_modules/, 
                loader: "babel-loader" 
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    'file-loader?name=[name].[ext]&outputPath=assets/',
                    'image-webpack-loader'
                ]
            },
            { 
                test: /\.(woff2?|svg)$/, 
                loader: 'url-loader?limit=10000&name=fonts/[name].[ext]' 
            },
            { 
                test: /\.(ttf|eot)$/, 
                loader: 'file-loader?name=fonts/[name].[ext]' 
            },
            { 
                test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/, 
                loader: 'imports-loader?jQuery=jquery' 
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname,"dist"),
        compress: true,
        port: 9000,
        stats: 'errors-only',
        disableHostCheck: true,
        open: true,
        hot: true
    },
    plugins: [  
        new HtmlWebpackPlugin({
            title: '位置分析',
            chunks:['app'],
            filename:'index.html',
            minify: {
                collapseWhitespace: false
            },
            hash: true,
            template: './src/index.html',
        }), 
        new HtmlWebpackPlugin({
            title: '用户分析',
            chunks:['user'],
            filename:'user.html',
            minify: {
                collapseWhitespace: false
            },
            hash: true,
            template: './src/user/user.html',
        }), 
        
        //for your stylesheets.
        new ExtractTextPlugin({
        filename: "/css/[name].css",
        disable: !isProd,
        allChunks: false
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new PurifyCSSPlugin({
            paths: glob.sync(path.join(__dirname, 'src/*.html'))
        }),

        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new CopyWebpackPlugin([
            {
                from: __dirname+'/src/data',
                to: __dirname+'/dist/data',
                ignore: ['.*']
            }
        ])
  ]
}