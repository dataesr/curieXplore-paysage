"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _axios = _interopRequireDefault(require("axios"));

var _mongo = require("../mongo");

var _config = require("../config");

function tranformData(data) {
  var countries = (0, _toConsumableArray2["default"])(new Set(data.map(function (structure) {
    return structure.addresses[0].countryIso3;
  })));
  var transformedData = countries.map(function (iso) {
    return {
      iso: iso,
      data: data.filter(function (structure) {
        return structure.addresses[0].countryIso3 === iso;
      })
    };
  });
  return transformedData;
}

function mongoWrite(_x, _x2) {
  return _mongoWrite.apply(this, arguments);
}

function _mongoWrite() {
  _mongoWrite = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(collectionName, data) {
    var collections;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            if (!data) {
              _context.next = 16;
              break;
            }

            _context.next = 4;
            return _mongo.db.listCollections().toArray();

          case 4:
            collections = _context.sent;

            if (!collections.find(function (collection) {
              return collection.name === "".concat(collectionName, "_old");
            })) {
              _context.next = 9;
              break;
            }

            _context.next = 8;
            return _mongo.db.collection("".concat(collectionName, "_old")).drop();

          case 8:
            console.log("Delete ".concat(collectionName, "_old"));

          case 9:
            if (!collections.find(function (collection) {
              return collection.name === collectionName;
            })) {
              _context.next = 13;
              break;
            }

            _context.next = 12;
            return _mongo.db.collection(collectionName).rename("".concat(collectionName, "_old"));

          case 12:
            console.log("Save old data ".concat(collectionName));

          case 13:
            _context.next = 15;
            return _mongo.db.collection(collectionName).insertMany(data);

          case 15:
            console.log("Write new data ".concat(collectionName));

          case 16:
            return _context.abrupt("return");

          case 19:
            _context.prev = 19;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 19]]);
  }));
  return _mongoWrite.apply(this, arguments);
}

var _default = function _default(req, res) {
  console.log('Load countries from paysage to mongodb');

  _axios["default"].get(_config.PAYSAGE_URL).then(function (response) {
    var transformedData = tranformData(response.data.Structures);

    if (mongoWrite('actors', transformedData) && mongoWrite('categories', response.data.Categories)) {
      res.status(201);
    } else {
      res.status(500);
    }

    res.end();
  })["catch"](function (error) {
    console.log(error);
    res.status(500).end();
    throw error;
  });
};

exports["default"] = _default;
//# sourceMappingURL=load-countries.js.map