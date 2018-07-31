"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _http = require("http");

var baseRouter = (0, _express.Router)();

baseRouter.get("/", function (request, response) {
  response.send("Welcome");
});

baseRouter.get("/test", function (request, response) {
  response.send("Testing API server");
});

exports.default = baseRouter;