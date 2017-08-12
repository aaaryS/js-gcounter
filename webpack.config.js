const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, "build"),
    filename: 'bundle.js'
  },
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.js', '.scss']
  },
  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.worker.js$/, use: 'worker-loader', exclude: /node_modules/ },
      {
        test: /\.scss$/,
        use: [{
            loader: 'style-loader' // creates style nodes from JS strings
        }, {
            loader: 'css-loader' // translates CSS into CommonJS
        }, {
            loader: 'sass-loader' // compiles Sass to CSS
        }]
      }
    ]
  },
  plugins: [HtmlWebpackPluginConfig]
}
