const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.s?css$/,
				use: [
					'style-loader',
					{ loader: 'css-loader', options: { importLoaders: 1 }},
					'postcss-loader',
					'sass-loader'
				]
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192, // file-loader is fallback for files exceeding the limit
							name: 'images/[hash].[ext]' // option is passed to file-loader
						}
					}
				]
			}
		]
	},
	plugins: [
		new CopyWebpackPlugin(['./public/'])
	]
};
