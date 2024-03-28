"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getItemByIndex = void 0;
var items = new Array(100).fill(null).map(function (i, index) {
    return {
        title: "Item ".concat(index + 1),
    };
});
var getItemByIndex = function (start, size) {
    return {
        data: items.slice(start, start + size),
        total: items.length,
        start: start,
        end: start + size,
    };
};
exports.getItemByIndex = getItemByIndex;
