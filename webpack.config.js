const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    index: path.resolve(__dirname, "main.js")
  },
  output: {
    filename: "[name].min.js",
    path: path.resolve(__dirname, "./demo/"),
    library: 'vueCurrencyDirective',

  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  },
  plugins: [new CleanWebpackPlugin()]
};
