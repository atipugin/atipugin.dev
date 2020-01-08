const merge = require("webpack-merge");
const common = require("./webpack.common");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "[name]-[hash].js",
    chunkFilename: "[id]-[hash].js"
  },
  optimization: {
    minimizer: [
      new MiniCssExtractPlugin({
        filename: "[name]-[hash].css",
        chunkFilename: "[id]-[hash].css"
      }),
      new OptimizeCssAssetsPlugin(),
      new TerserPlugin()
    ]
  }
});
