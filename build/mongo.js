"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.db = exports.mongo = void 0;

var _mongodb = require("mongodb");

var _config = require("./config");

var mongo = new _mongodb.MongoClient(_config.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
exports.mongo = mongo;
mongo.connect();
var db = mongo.db('curieXplore');
exports.db = db;
//# sourceMappingURL=mongo.js.map