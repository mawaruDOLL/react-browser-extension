const { resolve } = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WebpackChromeReloaderPlugin = require("webpack-chrome-extension-reloader");
const HtmlWebpackPlugin = require('html-webpack-plugin')

const mode = process.env.NODE_ENV;
const buildPath = "dist";

module.exports = {
  mode: mode,
  devtool: "inline-source-map",
  entry: {
		main: "./src/index.js",
    background: "./public/background.js"
  },
  output: {
    publicPath: ".",
    path: resolve(__dirname, buildPath),
    filename: "[name].bundle.js"
	},
	resolve: {
		extensions: [".js"],
	},
  plugins: [
    new WebpackChromeReloaderPlugin(),
		new HtmlWebpackPlugin({
			template: resolve(__dirname, "public/index.html"),
			inject: true
		}),
    new CopyWebpackPlugin([
      { from: "./public/" }
    ])
  ],
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
					loader: "babel-loader",
					options: {
						babelrc: false,
						presets: [
							[
								"@babel/preset-env"
							],
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