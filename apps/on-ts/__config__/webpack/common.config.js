const webpack = require("webpack");
const path = require("path");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const { RunScriptWebpackPlugin } = require("run-script-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

const BUILD_DIR = path.resolve(__dirname, "..", "..", "..", "..", "build/user");
const ASSETS_DIR = path.resolve(BUILD_DIR, "assets");
const OUTPUT_FILENAME = "server.js";

const plugins = [
  new FileManagerPlugin({
    events: {
      // Remove build dir
      onStart: {
        delete: [BUILD_DIR],
      },
    },
  }),
  new webpack.HotModuleReplacementPlugin(), // For page reloading
  new RunScriptWebpackPlugin({
    name: OUTPUT_FILENAME, // Equals filename from Output
    autoRestart: false,
  }),
];

module.exports = {
  plugins,
  entry: [
    "webpack/hot/poll?100",
    path.join(__dirname, "..", "..", "src", "main.ts"),
  ],
  target: "node",
  externals: [
    nodeExternals({
      allowlist: ["webpack/hot/poll?100"],
    }),
  ],
  output: {
    path: BUILD_DIR,
    filename: OUTPUT_FILENAME,
  },
  // Checking the maximum weight of the bundle is disabled
  performance: {
    hints: false,
  },
  // Modules resolved
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    strictExportPresence: true, // Strict mod to avoid of importing non-existent objects
    rules: [
      // --- JS | TS USING BABEL
      {
        test: /\.[jt]s$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true, // Using a cache to avoid of recompilation
              presets: ["@babel/preset-env", "@babel/preset-typescript"],
            },
          },
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              projectReferences: true, // References in tsconfig
            },
          },
        ],
      },
    ],
  },
};
