const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { HotModuleReplacementPlugin } = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.base');
const path = require('path');

const devConfig = {
	mode: 'development',
	cache: {
    type: 'memory'
	},
	devServer: {
		historyApiFallback: true,
		disableHostCheck: true,
		contentBase: path.join(__dirname, 'dist'),
		host: "localhost",
		port: 3001,
		open: true,
		hot: true,
		compress: true,
		host: '0.0.0.0',
		proxy: {
			'/api': {
				target: 'http://localhost:3000',
				secure: false,
			},
		},
	},
	target: 'web',
	plugins: [new HotModuleReplacementPlugin(), new ReactRefreshWebpackPlugin()],
	devtool: 'eval-cheap-module-source-map',
};

module.exports = merge(common, devConfig);
