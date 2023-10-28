const path = require("path");
const { DefinePlugin } = require("webpack");

module.exports = (env, argv) => {
  console.log(`process.env.DYNAMO_ENDPOINT="${process.env.DYNAMO_ENDPOINT}"`);

  return {
    mode: argv.mode === "production" ? "production" : "development",
    target: "node",
    entry: path.resolve(__dirname, "src", "index"),
    output: {
      filename: "index.js",
      path: path.resolve(__dirname, "dist"),
      libraryTarget: "commonjs2",
    },
    module: {
      rules: [
        {
          test: /\.[jt]s(on|x)?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },
    plugins: [
      new DefinePlugin({
        "process.env.DYNAMO_ENDPOINT": JSON.stringify(
          process.env.DYNAMO_ENDPOINT || "",
        ),
      }),
    ],
  };
};
