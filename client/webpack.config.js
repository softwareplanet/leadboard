var webpack = require('webpack');
var path = require('path');
/*
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, "src/index.html"),
    filename: "./index.html"
});
*/
let conf = {
    entry: path.resolve(__dirname, 'src/js/index.js'),
    output: {
      path: path.resolve(__dirname, '../public/js/'),
      filename: 'app.min.js'
    },
    devServer: {
      overlay: true,
      proxy: {
        '/api2': 'http://localhost:8080'
      }
    },
    devServer: {
        inline: true,
        //contentBase: './dist',
        port: 3001,
        proxy: { "/api2/**": { target: 'http://localhost:8080', secure: false }}
    },
    module: {
        rules: [{
                test: /\.js?$/,
                loader:'babel-loader',
                exclude: '/node_modules/',
                query: {
                           presets: ['react']
                       }
                },
                {
                    test: /\.css$/,
                    use: ["style-loader", "css-loader"]
                }]
    }
/*
    plugins: [htmlWebpackPlugin],
        resolve: {
        extensions: [".js", ".jsx"]
    },
*/
}

module.exports = (env, options) => {
  let production = options.mode === 'production';
  conf.devtool = production
                  ? 'source-map'
                  : 'eval-sourcemap'
  return conf;
}
