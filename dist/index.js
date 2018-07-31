"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require("morgan");

var _morgan2 = _interopRequireDefault(_morgan);

var _winston = require("./config/winston");

var _winston2 = _interopRequireDefault(_winston);

var _base = require("./routes/base");

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use((0, _morgan2.default)("combined", { stream: _winston2.default.stream }));
app.use("/", _base2.default);

// Error handling
app.use(function (error, request, response, next) {
  response.locals.error = error.message;
  response.locals.error = request.app.get("env") === "development" ? error : {};

  _winston2.default.error((error.status || 500) + " - " + error.message + " - " + request.originalUrl + " - " + request.method + " - " + request.ip);

  response.status(error.status || 500);
  response.render("error");
});

var server = app.listen(3000, function () {
  console.log("App running at 3000 !!");
});