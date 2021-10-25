var HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    module: {
        rules: [
            {   
                test: /\.js$/, 
                exclude: /node_modules/, 
                use: 'babel-loader' 
            },
            {
                test: /\.less$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'less-loader' }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            '@': path.resolve(__dirname, 'src/'),
        }
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html'
    })],
    devServer: {
        historyApiFallback: true
    },
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: 'http://localhost:3000'
        })
    }
}

// const webpack = require('webpack');
// const path = require('path');
 
// module.exports = {
//   entry: path.resolve(__dirname, './src/index.js'),
//   module: {
//     rules: [
//       {
//         test: /\.(js|jsx)$/,
//         exclude: /node_modules/,
//         use: ['babel-loader'],
//       },
//       {
//         test: /\.less$/,
//         use: [
//           {
//             loader: "style-loader"
//           },
//           {
//             loader: "css-loader",
//             options: {
//               sourceMap: true,
//               modules: true,
//               localIdentName: "[local]___[hash:base64:5]"
//             }
//           },
//           {
//             loader: "less-loader"
//           }
//         ]
//       }
//     ],
//   },
//   resolve: {
//     extensions: ['*', '.js', '.jsx'],
//   },
//   output: {
//     path: path.resolve(__dirname, './dist'),
//     filename: 'bundle.js',
//   },
//   plugins: [new webpack.HotModuleReplacementPlugin()],
//   devServer: {
//     contentBase: path.resolve(__dirname, './dist'),
//     hot: true
//   },
// };