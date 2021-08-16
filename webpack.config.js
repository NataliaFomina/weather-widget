const path = require("path");
const outputDir = "./dist";

module.exports = {
  entry: "./src/main.js",
  output: {
    filename: "bundle.js",
    sourceMapFilename: "bundle.js.map",
    path: path.resolve(outputDir),
  },
  devServer: {
    contentBase: outputDir,
    writeToDisk: true,
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  }
};