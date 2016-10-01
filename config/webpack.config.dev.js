const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const server = {
  host: 'localhost',
  port: 3000,
};

const publicPath = 'https://' + server.host + ':' + server.port;

const hmrConfig = [
  'react-hot-loader/patch',
  'webpack-dev-server/client?' + publicPath,
  'webpack/hot/only-dev-server'
];

// App files location
const PATHS = {
  app: path.resolve(__dirname, '../src/js'),
  styles: path.resolve(__dirname, '../src/styles'),
  build: path.resolve(__dirname, '../build')
};

const plugins = [
  new webpack.HotModuleReplacementPlugin(),
  // Shared code
  new webpack.optimize.CommonsChunkPlugin('vendor', 'js/vendor.bundle.js'),
  // Avoid publishing files when compilation fails
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development'),
    __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
  }),
  new webpack.optimize.OccurenceOrderPlugin()
];

const sassLoaders = [
  'style-loader',
  'css-loader?sourceMap',
  'postcss-loader',
  'sass-loader?outputStyle=expanded'
];

module.exports = {
  env : process.env.NODE_ENV,
  entry: {
    app: [
      ...hmrConfig,
      path.resolve(PATHS.app, 'index.js')
    ],
    vendor: [
      ...hmrConfig,
      'react'
    ]
  },
  output: {
    path: PATHS.build,
    filename: 'js/[name].js',
    publicPath: '/',
    sourceMapFilename: "js/[name].map",
    chunkFilename: '[id].chunk.js',
    pathinfo: true
  },
  resolve: {
    // We can now require('file') instead of require('file.jsx')
    extensions: ['', '.js', '.jsx', '.scss']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: PATHS.app
      },
      {
        test: /\.scss$/,
        loader: sassLoaders.join('!')
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader'
      },
      // Inline base64 URLs for <=8k images, direct URLs for the rest
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: 'url-loader?limit=8192'
      }
    ]
  },
  plugins: plugins,
  postcss: function () {
    return [autoprefixer({
      browsers: ['last 2 versions']
    })];
  },
  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, '../src'),
    port: server.port,
    https: true,
    historyApiFallback: true,
    proxy: {
      '/horizon/*': {
        target: 'https://localhost:8181/',
        // Don't check remote server certificate
        secure: false,
        ws: true,
        hostRewrite: true,
        protocolRewrite: true,
        autoRewrite: true
      }
    },
    stats: {
      colors: true,
      reasons: true,
      chunkModules: true,
      assets: true,
      version: true,
      hash: false,
      // Verbose options
      chunks: false,
      modules: false,
    },
  },
  devtool: 'cheap-module-eval-source-map',
};
