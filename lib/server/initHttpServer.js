"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

/**
 * Starts express, caches and deletes socket references. Does not close the sockets themselves!
 * This is done by the consumer of this function in this case the watchServerChanges function.
 * Returns the httpServer object and all sockets in a Map.
 * @param serverBundlePath Path to the server bundle file where the express server was started by calling .listen().
 * @returns {{httpServer: *, sockets: Map}} when server bundle has no errors. Returns null when server bundle contains errors.
 */
var initHttpServer =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(serverBundlePath) {
    var httpServer, sockets, nextSocketId;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return require(serverBundlePath)["default"];

          case 3:
            httpServer = _context.sent;
            _context.next = 10;
            break;

          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            return _context.abrupt("return", null);

          case 10:
            sockets = new Map();
            nextSocketId = 0; // Inspired by Golo Roden's answer in:
            // http://stackoverflow.com/questions/14626636/how-do-i-shutdown-a-node-js-https-server-immediately

            httpServer.on('connection', function (socket) {
              var socketId = nextSocketId++;
              sockets.set(socketId, socket);
              socket.on('close', function () {
                sockets["delete"](socketId);
              });
            });
            return _context.abrupt("return", {
              httpServer: httpServer,
              sockets: sockets
            });

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 6]]);
  }));

  return function initHttpServer(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = initHttpServer;
exports["default"] = _default;