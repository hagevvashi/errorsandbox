import { resolve } from "path";
import type { Configuration } from "webpack";
import { smart } from "webpack-merge";
import HtmlWebpackPlugin from "html-webpack-plugin";
import developmentConfig from "./webpack.development.config";
import productionConfig from "./webpack.production.config";

const isDevelopment = process.env.NODE_ENV === "development";

const config = isDevelopment ? developmentConfig : productionConfig;

const base: Configuration = {
  entry: "./src/main/index.ts",
  output: {
    path: resolve(__dirname, "./docs"),
    filename: "bundle.js",
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

export default smart(base, config);
