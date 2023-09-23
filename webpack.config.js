import HtmlWebpackPlugin from 'html-webpack-plugin'
import { Parent_Folder } from './src/constants/paths.js';

const webpackConfig = {

    mode: 'development',
    entry:'./src/index.js',
    
    output:{
        path: Parent_Folder + "/production",
        filename: 'bundle.js'
    },
    plugins : [
        new HtmlWebpackPlugin({
            template:'./public/index.html'
        })
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
}
export default webpackConfig;