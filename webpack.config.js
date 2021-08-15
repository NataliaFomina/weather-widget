const path = require("path");
const outputDir = "./dist";

module.exports = {
  entry: "./src/main.js",
  output: {
    filename: "bundle.js",
    sourceMapFilename: "bundle.js.map",
    path: path.resolve(outputDir)
  },
  devServer: {
    contentBase: outputDir,
    writeToDisk: true,
  },
}