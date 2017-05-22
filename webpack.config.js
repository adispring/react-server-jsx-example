const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const isProduction = process.env.NODE_ENV === 'production';
const productionPluginDefine = isProduction ? [
  new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }),
] : [];

const rules = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    options: {
      presets: ['es2015', 'stage-0', 'react'],
    },
  },
];

module.exports = [
  {
    entry: './src/server.js',
    output: {
      path: `${__dirname}/dist`,
      filename: 'server.js',
      libraryTarget: 'commonjs2',
      publicPath: '/',
    },
    target: 'node',
    externals: nodeExternals(),
    plugins: productionPluginDefine,
    module: {
      rules: rules.concat([
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader',
          }),
        },
      ]),
    },
  },
  {
    entry: './src/app/browser.js',
    output: {
      path: `${__dirname}/dist/assets`,
      publicPath: '/',
      filename: 'bundle.js',
    },
    module: {
      rules: rules.concat([
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader',
          }),
        },
      ]),
    },
    plugins: [
      new ExtractTextPlugin('style.css'),
    ],
  },
];
