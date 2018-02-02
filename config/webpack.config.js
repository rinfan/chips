const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const nodeEnv = process.env.NODE_ENV || "development";
const isProd = nodeEnv === "production";

var config = {
  devtool: isProd ? "hidden-source-map" : "inline-source-map",
  context: path.resolve("../src"),
  entry: {
    app: "./index.ts",
  },
  output: {

    path: path.resolve("../dist"),
    filename: "[name].bundle.js",
    sourceMapFilename: "[name].bundle.map",
    devtoolModuleFilenameTemplate: function (info) {
        return "file:///" + info.absoluteResourcePath;
    }
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.ts?$/,
        exclude: ["node_modules"],
        use: ["awesome-typescript-loader", "source-map-loader"]
      },
      // { test: /\.html$/, loader: "html-loader" },
      { test: /\.css$/, loaders: ["style-loader", "css-loader", "sass-loader"] }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        // eslint-disable-line quote-props
        NODE_ENV: JSON.stringify(nodeEnv)
      }
    }),
    new HtmlWebpackPlugin({
      template: "index.html"
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        tslint: {
          emitErrors: true,
          failOnHint: true
        }
      }
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist/"),
    compress: true,
    port: 3000,
    hot: true
  }
};

module.exports = config;
