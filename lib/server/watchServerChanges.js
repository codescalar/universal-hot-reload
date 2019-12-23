"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.watchServerChangesWithDefaultConfig = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _path = require("path");

var _webpack = _interopRequireDefault(require("webpack"));

var _clearRequireCache = _interopRequireDefault(require("../utils/clearRequireCache"));

var _initHttpServer = _interopRequireDefault(require("./initHttpServer"));

var _generateDefaultConfig = _interopRequireDefault(require("./generateDefaultConfig"));

/**
 * Watches server for changes, recompile and restart express
 */
var watchServerChanges = function watchServerChanges(serverConfig) {
  var initialLoad = true;
  var httpServerInitObject; // contains the httpServer itself and socket references

  var bundlePath = (0, _path.join)(serverConfig.output.path, serverConfig.output.filename);
  var serverCompiler = (0, _webpack["default"])(serverConfig); // use this to debug
  // const serverCompiler = webpack(serverConfig, (err, stats) => {
  //   if (err || stats.hasErrors()) {
  //     if (err) {
  //       console.error(err.stack || err);
  //       if (err.details) {
  //         console.error(err.details);
  //       }
  //       return;
  //     }
  //     const info = stats.toJson();
  //     if (stats.hasErrors()) {
  //       console.error(info.errors);
  //     }
  //
  //     if (stats.hasWarnings()) {
  //       console.warn(info.warnings);
  //     }
  //   }
  // });

  var compilerOptions = {
    aggregateTimeout: 300,
    // wait so long for more changes
    poll: true // use polling instead of native watchers

  }; // compile server side code

  serverCompiler.watch(compilerOptions,
  /*#__PURE__*/
  function () {
    var _ref = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee2(err) {
      var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, socket;

      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!err) {
                _context2.next = 3;
                break;
              }

              console.log("Server bundling error: ".concat(JSON.stringify(err)));
              return _context2.abrupt("return");

            case 3:
              (0, _clearRequireCache["default"])(bundlePath);

              if (initialLoad) {
                _context2.next = 27;
                break;
              }

              httpServerInitObject.httpServer.close(
              /*#__PURE__*/
              (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee() {
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return (0, _initHttpServer["default"])(bundlePath);

                      case 2:
                        httpServerInitObject = _context.sent;

                        if (httpServerInitObject) {
                          initialLoad = false;
                          console.log("Server bundled & restarted ".concat(new Date()));
                        } else {
                          // server bundling error has occurred
                          initialLoad = true;
                        }

                      case 4:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }))); // Destroy all open sockets
              // eslint-disable-next-line no-restricted-syntax

              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context2.prev = 9;

              for (_iterator = httpServerInitObject.sockets.values()[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                socket = _step.value;
                socket.destroy();
              }

              _context2.next = 17;
              break;

            case 13:
              _context2.prev = 13;
              _context2.t0 = _context2["catch"](9);
              _didIteratorError = true;
              _iteratorError = _context2.t0;

            case 17:
              _context2.prev = 17;
              _context2.prev = 18;

              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }

            case 20:
              _context2.prev = 20;

              if (!_didIteratorError) {
                _context2.next = 23;
                break;
              }

              throw _iteratorError;

            case 23:
              return _context2.finish(20);

            case 24:
              return _context2.finish(17);

            case 25:
              _context2.next = 31;
              break;

            case 27:
              _context2.next = 29;
              return (0, _initHttpServer["default"])(bundlePath);

            case 29:
              httpServerInitObject = _context2.sent;

              if (httpServerInitObject) {
                initialLoad = false;
                console.log('Server bundled successfully');
              } else {
                // server bundling error has occurred
                initialLoad = true;
              }

            case 31:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[9, 13, 17, 25], [18,, 20, 24]]);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
};

var watchServerChangesWithDefaultConfig = function watchServerChangesWithDefaultConfig(serverEntryPath) {
  var defaultConfig = (0, _generateDefaultConfig["default"])(serverEntryPath);
  watchServerChanges(defaultConfig);
};

exports.watchServerChangesWithDefaultConfig = watchServerChangesWithDefaultConfig;
var _default = watchServerChanges;
exports["default"] = _default;