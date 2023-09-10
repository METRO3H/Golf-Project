const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {

    mode: 'development',
    entry: './src/index.js',
    
    output:{
        path: __dirname + '/production',
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