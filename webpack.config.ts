import { resolve } from "path";
import type { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";

const config: Configuration = {
  mode: "production",
  entry: "./src/main/index.ts",
  output: {
    path: resolve(__dirname, "./docs"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".ts"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/main/index.html",
    }),
  ],
};

export default config;
