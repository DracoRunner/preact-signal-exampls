"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var configuration_1 = require("./configuration");
var items_1 = require("./items");
var app = express();
app.get('/configuration.json', function (req, res) {
    var start = Number(req.query.start);
    var pageSize = Number(req.query.pageSize);
    var data = (0, configuration_1.getConfigurationByIndex)(start, pageSize);
    res.send(__assign({ status: 200 }, data));
});
app.get('/item.json', function (req, res) {
    var start = Number(req.query.start);
    var pageSize = Number(req.query.pageSize);
    var data = (0, items_1.getItemByIndex)(start, pageSize);
    res.send(__assign({ status: 200 }, data));
});
app.listen(3000, function () {
    console.log('Server Listening on PORT:', 3000);
});
