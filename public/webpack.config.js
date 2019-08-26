const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/js/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.(html)$/,
        use: { loader: "html-loader", options: { minimize: true } }
      },
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }]
      },
      {
        test: /\.(scss)$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader" },
          {
            loader: "postcss-loader",
            options: {
              plugins: function() {
                return [require("precss"), require("autoprefixer")];
              }
            }
          },
          {
            loader: "sass-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "admin.html",
      template: "./src/templates/admin.html"
    })
  ]
};
