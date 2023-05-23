const path = require("path");

const webpackConfig = {
	entry: "./src/index.js",
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist"),
	},
	module: {
		rules: [
			// Define your loaders for different file types here
			// For example, for JavaScript files, you can use 'babel-loader'
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: "babel-loader",
			},
			// Add more rules for other file types as needed
		],
	},
	resolve: {
		fallback: {
			stream: require.resolve("stream-browserify"),
			crypto: require.resolve("crypto-browserify"),
			path: require.resolve("path-browserify"),
			url: require.resolve("url/"),
			http: require.resolve("stream-http"),
			https: require.resolve("https-browserify"),
			fs: false,
			zlib: require.resolve("browserify-zlib"),
			net: false,
		},
	},
	// ... other webpack configuration options
};

module.exports = webpackConfig;
