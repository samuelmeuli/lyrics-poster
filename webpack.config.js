const path = require('path');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'public'),
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
				test: /\.(png|jpg|gif|svg)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'images/[hash].[ext]'
						}
					}
				]
			}
		]
	}
};
