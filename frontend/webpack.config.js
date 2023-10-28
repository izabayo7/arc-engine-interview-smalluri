const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack");

module.exports = (env, argv) => {
  const mode = argv.mode === "production" ? "production" : "development";

  const isDev = mode === "development";

  const config = {
    mode,
    entry: path.resolve(__dirname, "src", "index"),
    output: {
      path: path.resolve(__dirname, "dist"),
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src", "index.html"),
      }),
      new DefinePlugin({
        "process.env.BACKEND_URL": JSON.stringify(
          process.env.BACKEND_URL || null,
        ),
      }),
    ],
  };

  if (isDev) {
    config.devtool = "inline-source-map";
    config.devServer = {
      compress: true,
      port: 3000,
    };
  }

  return config;
};
