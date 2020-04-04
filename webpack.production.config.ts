import type { Configuration } from "webpack";

const config: Configuration = {
  mode: "production",
  devtool: "hidden-source-map",
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  optimization: {
    splitChunks: {
      minSize: 10000,
      maxSize: 250000,
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: "all",
          enforce: true,
        },
      },
    },
  },
};

export default config;
