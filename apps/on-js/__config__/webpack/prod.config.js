const { merge } = require("webpack-merge");
const common = require("./common.config.js");
const TerserPlugin = require("terser-webpack-plugin");

const plugins = [];

module.exports = merge(common, {
  mode: "production",
  plugins,
  devtool: false,
  optimization: {
    usedExports: false,
    minimize: true, // Affects Terser Plugin
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: false,
          compress: true,
          output: {
            beautify: true,
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
});
