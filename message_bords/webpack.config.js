const path=require("path");
const ExtractTextPluginLess = require("extract-text-webpack-plugin");
const ExtractTextPluginCss =require("extract-text-webpack-plugin");
const webpack = require('webpack');


module.exports={
	devtool:'source-map',
	entry:{
		'index':'./src/index.js',
		'test':'./src/test.js'
	},
	output:{
		filename:'js/[name].js',
		path:path.resolve(__dirname,'dist')
	},
	module:{
		rules:[
			{
				test:/\.js$/,
				exclude:/node_modules/,
				use:{
					loader:'babel-loader',
					options:{
						presets:['env']
					}
				}
			},
			{
				test:/\.less$/,
				use:ExtractTextPluginLess.extract({
					fallback: 'style-loader',
					use:[
							{
								loader:'css-loader',
								options:{
									sourceMap: true
								}
							},{
								loader:'less-loader',
								options: {
				                    sourceMap: true
				                }
							}
						]
				})
			},
			{
				test:/\.css$/,
				//use:['stye-loader','css-loader']
				use:ExtractTextPluginCss.extract({
					fallback: 'style-loader',
					use:[
							{
								loader:'css-loader'
							}
						]
				})

			},
			{
		        test: /\.(png|jpg|gif)$/,
		        use: [
		          {
		            loader: 'file-loader',
		            options: {
		            	name:'[path][name].[ext]',
		            	publicPath:"../"
		            }
		          }
		        ]
		    }
		]	
	},
	plugins:[	
		new ExtractTextPluginLess('css/[name].css'),
		new ExtractTextPluginCss('css/[name].css'),
		new webpack.HotModuleReplacementPlugin()
	],
	devServer:{
		contentBase: './dist',
		hot: true	
	}

}