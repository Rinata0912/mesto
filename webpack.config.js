const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: { main: './src/pages/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  module: {
    rules: [ // rules — это массив правил
      // добавим в него объект правил для бабеля
      {
        // регулярное выражение, которое ищет все js файлы
        test: /\.js$/,
        // при обработке этих файлов нужно использовать babel-loader
        loader: 'babel-loader',
        // исключает папку node_modules, файлы в ней обрабатывать не нужно
        exclude: '/node_modules/'
      },
      {
        // регулярное выражение, которое ищет все файлы с такими расширениями
        test: /\.(png|svg|jpg|gif)$/,
        // при обработке этих файлов нужно использовать file-loader
        loader: 'file-loader',
        options: {
          name: './images/[name].[ext]'
        }
      },
      {
        // регулярное выражение, которое ищет все файлы с такими расширениями
        test: /\.(woff2|woff)$/,
        // при обработке этих файлов нужно использовать file-loader
        loader: 'file-loader',
        options: {
          name: './vendor/[name].[ext]'
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.css$/,
        // при обработке этих файлов нужно использовать
        // MiniCssExtractPlugin.loader и css-loader
        loader:  [MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { importLoaders: 1 }
        },
        'postcss-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),

    new MiniCssExtractPlugin()
  ]
}
