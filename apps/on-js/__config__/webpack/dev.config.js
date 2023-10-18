const { merge } = require("webpack-merge");
const common = require("./common.config.js");

const plugins = [];

module.exports = merge(common, {
  mode: "development",
  plugins,
  devtool: "inline-source-map",
});
