"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(serverBundlePath) {
    var httpServer, sockets, nextSocketId;
    return regeneratorRuntime.wrap(function _callee$(_context) {
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