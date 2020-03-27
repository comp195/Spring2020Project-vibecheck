var path = require("path");

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              {
                plugins: [
                  "@babel/plugin-proposal-class-properties"
                ]
              }
            ]
          }
        }
      },
      {
        test: /\.(s*)css$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  devServer: {
    host: "127.0.0.1",
    port: "3000",
    hot: true,
    contentBase: path.join(__dirname, "dist")
  }
};
