const { resolve } = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WebpackChromeReloaderPlugin = require("webpack-chrome-extension-reloader");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const mode = process.env.NODE_ENV;
const buildPath = "dist";
const isDevEnv = mode === 'development';

const releaseOptions = {
	release: !isDevEnv,
	minify: {
		collapseWhitespace: !isDevEnv,
		removeComments: !isDevEnv
	}
}

const webpackPlugins = [
	new ForkTsCheckerWebpackPlugin({
		tsconfig: resolve(__dirname, "tsconfig.json")
	}),
	new HtmlWebpackPlugin(Object.assign({
		template: resolve(__dirname, "src/popup/popup.html"),
		filename: "popup.html",
		inject: true,
		excludeChunks: ["options"]
	}, releaseOptions)),
	new HtmlWebpackPlugin(Object.assign({
		template: resolve(__dirname, "src/options/options.html"),
		filename: "options.html",
		inject: true,
		excludeChunks: ["popup"]
	}, releaseOptions)),
	new CopyWebpackPlugin([{
		from: "./public/"
	}])
];

if (isDevEnv) {
	webpackPlugins.push(new WebpackChromeReloaderPlugin());
}

module.exports = {
  mode: mode,
  devtool: isDevEnv ? "inline-source-map" : false,
  entry: {
		polyfill: "@babel/polyfill",
		chromeExtension: "chrome-extension-async",
		popup: "./src/popup/index.tsx",
		background: "./src/background.ts",
		options: "./src/options/index.tsx"
  },
  output: {
    publicPath: ".",
    path: resolve(__dirname, buildPath),
    filename: "[name].js"
	},
	resolve: {
		extensions: [".ts",".tsx",".js"],
	},
  plugins: webpackPlugins,
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: {
					loader: "babel-loader",
					options: {
						babelrc: false,
						presets: [
							[
								"@babel/preset-env"
							],
							"@babel/preset-typescript",
							"@babel/preset-react"
						],
						plugins: [
							["@babel/plugin-proposal-decorators", {legacy: true}],
							["@babel/plugin-proposal-class-properties", {loose: true}]
						]
					}
        }
			}
    ]
  }
};