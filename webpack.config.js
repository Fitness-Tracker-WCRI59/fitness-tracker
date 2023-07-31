const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  entry: './src/index.js',

  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js'
  },

  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html'
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
      publicPath: '/',
    },
    proxy: {
      '/login': 'http://localhost:3000',
      '/stats': 'http://localhost:3000',
      '/main': 'http://localhost:3000',
      '/signup': 'http://localhost:3000'
      // add more as we add more endpoints
    }
  }


}