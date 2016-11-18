var webpack = require('webpack');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

module.exports = {
	entry: "./AppComponents/app/main.ts",
	output: {
		path: __dirname,
		filename : "./AppProductionLive/angular2live.js"
	},
	module: {
		loaders: [{
			test: /\.ts$/, loader: 'ts', exclude: /node_modules/
		}]
	},
	resolve: {
		extensions: ['', '.js', '.ts']
	},
	plugins: [
		// your other webpack plugin

		new UglifyJsPlugin({
			beautify: false, //prod
			mangle: {
				screw_ie8: true,
				keep_fnames: true
			}, //prod
			compress: {
				screw_ie8: true
			}, //prod
			comments: false //prod
		})
	]
};