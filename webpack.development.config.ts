import type { Configuration } from "webpack";

const config: Configuration = {
  mode: "development",
  devtool: "eval-source-map",
  resolve: {
    extensions: [".js"],
  },
  devServer: {
    compress: true,
    inline: true,
    hot: true,
    open: true,
  },
};

export default config;
