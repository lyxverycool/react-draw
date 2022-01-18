const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path')
const resolvePath = (relativePath) => resolve(process.cwd(), relativePath)

module.exports = {
	entry: './src/index.js',
	output: {
		path: resolvePath('dist'),
		filename: process.env.NODE_ENV == 'development' ? 'js/bundle.js' : 'js/[name].[contenthash].js',
		publicPath: '/',
		assetModuleFilename: 'images/[hash][ext][query]',
		chunkFilename: (pathData) => {
			if(!pathData.chunk.name) return 'js/[name].[contenthash].js'
			let name = pathData.chunk.name.toLowerCase()
			const name_index = name.indexOf('-index')
			if (name_index > -1) {
				name = name.substring(0, name_index)
			}
			pathData.chunk.name = name
			return 'js/[name].[contenthash].js'
		}
	},
	module: {
		rules: [
			{
				use: 'babel-loader',
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
			},
			{
				use: ['style-loader', 'css-loader', 'less-loader'],
				test: /\.(css|less)$/,
			},
			{
				type: 'asset',
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.json', '.jsx'],
		alias: {
			'~': resolvePath('src/'),
			'@': resolvePath('src/components/'),
		},
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: resolvePath('src/index.html'),
			favicon: resolvePath('src/images/favicon.ico'),
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				minifyJS: true,
				minifyCSS: true,
			},
		}),
	]
};
