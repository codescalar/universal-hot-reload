"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _path = _interopRequireDefault(require("path"));

var _webpackNodeExternals = _interopRequireDefault(require("webpack-node-externals"));

var defaultServerConfig = function defaultServerConfig() {
  var serverEntryPath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : './src/server.js';
  return {
    mode: 'development',
    devtool: 'source-map',
    entry: ['idempotent-babel-polyfill', serverEntryPath],
    target: 'node',
    externals: [(0, _webpackNodeExternals["default"])()],
    output: {
      path: _path["default"].resolve('dist'),
      filename: 'serverBundle.js',
      libraryTarget: 'commonjs2'
    },
    resolve: {
      extensions: ['.ts', '.js']
    },
    module: {
      rules: [{
        test: /\.tsx?$/,
        loader: 'ts-loader'
      }, {
        test: /\.jsx?$/,
        loader: 'babel-loader'
      }]
    }
  };
};

var _default = defaultServerConfig;
exports["default"] = _default;