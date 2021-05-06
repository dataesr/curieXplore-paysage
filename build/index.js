"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _config = require("./config");

var _loadCountries = _interopRequireDefault(require("./controllers/load-countries"));

var _paysage = _interopRequireDefault(require("./controllers/paysage"));

var app = (0, _express["default"])();
app.get('/load-countries', _loadCountries["default"]);
app.get('/paysage/:id', _paysage["default"]);
app.listen(_config.PORT, function () {
  console.log("App is listening on port ".concat(_config.PORT));
});
//# sourceMappingURL=index.js.map