"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.serverHotReload = exports.getDevServerBundleUrl = void 0;

var _watchClientChanges = _interopRequireDefault(require("./client/watchClientChanges"));

var _watchServerChanges = _interopRequireWildcard(require("./server/watchServerChanges"));

var _getDevServerBundleUrl = _interopRequireDefault(require("./utils/getDevServerBundleUrl"));

var getDevServerBundleUrl = _getDevServerBundleUrl["default"];
exports.getDevServerBundleUrl = getDevServerBundleUrl;

var main = function main(_ref) {
  var serverConfig = _ref.serverConfig,
      clientConfig = _ref.clientConfig;

  if (clientConfig) {
    // Start webpack dev server separately on a different port to avoid issues with httpServer restarts
    (0, _watchClientChanges["default"])(clientConfig);
  }

  if (serverConfig) {
    // Watch changes on the server side, re-compile and restart.
    (0, _watchServerChanges["default"])(serverConfig);
  }
};

var serverHotReload = function serverHotReload(serverEntryPath) {
  (0, _watchServerChanges.watchServerChangesWithDefaultConfig)(serverEntryPath);
};

exports.serverHotReload = serverHotReload;
var _default = main;
exports["default"] = _default;