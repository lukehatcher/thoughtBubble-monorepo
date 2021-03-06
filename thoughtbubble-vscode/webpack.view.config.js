const path = require('path');

const config = {
  mode: 'development',
  entry: './webview/index.tsx',
  output: {
    path: path.resolve(__dirname, 'media'),
    filename: 'reactBundle.js',
  },
  devtool: 'source-map', // needed
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.view.json',
            },
          },
        ],
      },
    ],
  },
};

module.exports = config;
