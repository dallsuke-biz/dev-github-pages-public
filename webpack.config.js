const path = require("path");
const webpack = require('webpack');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require("html-webpack-plugin");

dotenv.config();

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "docs"),
    filename: "bundle.js",
    clean: true, // docsを毎回クリーンアップ
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new webpack.DefinePlugin({
		'process.env': JSON.stringify(process.env),
	}),
  ],
  devServer: {
    static: "./docs",
    port: 3000,
    open: true,
  },
};