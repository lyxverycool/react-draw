const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { merge } = require('webpack-merge');
const common = require('./webpack.base');

const prodConfig = {
	mode: 'production',
	devtool: 'eval',
	cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename]
    },
    version: 'new_version'
	},
	module: {
		rules: [
			{
				test: /\.(css|less)$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader'],
			},
		],
	},
	optimization: {
		runtimeChunk: {
			'name': 'manifest',
		},
		minimize: true,
    minimizer: [
			new CssMinimizerPlugin({})
		],
		splitChunks: {
			chunks: 'async',
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom)[\\/]/,
					name: 'vendor',
					chunks: 'all',
				},
			},
		}
	},
	plugins: [new MiniCssExtractPlugin({
		filename: 'css/[name].[contenthash:8].css',
		chunkFilename: (pathData) => {
			let name = pathData.chunk.name.toLowerCase()
			const name_index = name.indexOf('-index')
			if (name_index > -1) {
				name = name.substring(0, name_index)
			}
			pathData.chunk.name = name
			return 'css/[name].[contenthash:8].css'
		},
		ignoreOrder: true,
	}),

	],
};

if (process.env.ANALYZER) {
	prodConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = merge(common, prodConfig);
