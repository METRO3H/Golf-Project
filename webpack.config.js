import HtmlWebpackPlugin from "html-webpack-plugin";
import { Parent_Folder } from "./server/constants/paths.js";

const webpackConfig = {
  mode: "development",
  entry: "./src/index.js",

  output: {
    path: Parent_Folder + "/production",
    filename: "index.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/views/index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },
};
export default webpackConfig;
