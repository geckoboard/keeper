const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

const CSSLoader = {
  loader: "css-loader",
  options: {
    modules: true,
    importLoaders: 1,
    localIdentName: "[name]_[local]_[hash:base64]",
    sourceMap: true,
    minimize: true
  }
};

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

const swPlugin = new SWPrecacheWebpackPlugin({
  cacheId: 'keeper-v1',
  dontCacheBustUrlsMatching: /\.\w{8}\./,
  filename: 'service-worker.js',
  minify: true,
  navigateFallback: 'https://geckoboard-keeper.herokuapp.com/index.html',
  staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
});

const cssPlugin = new MiniCssExtractPlugin({
  filename: "[name].css",
  chunkFilename: "[id].css"
});

const plugins = [htmlPlugin, swPlugin];

if (isProd) {
  plugins.push(cssPlugin);
}

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: isProd 
          ? [ MiniCssExtractPlugin.loader, CSSLoader ]
          : [ "style-loader", CSSLoader ],
      },
      {
        test: /\.(jpg|png)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "images/[name].[ext]",
          },
        },
      },
    ],
  },
  plugins: plugins,
  devServer: {
    compress: true,
    disableHostCheck: true,
    historyApiFallback: true,
  },
};
