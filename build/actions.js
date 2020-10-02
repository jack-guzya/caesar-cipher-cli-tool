"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __importDefault(require("./utils"));
var encode = function (input, shift) {
    return input.split('').map(utils_1.default.getShiftedChar(shift)).join('');
};
var decode = function (input, shift) { return encode(input, -shift); };
exports.default = { encode: encode, decode: decode };
//# sourceMappingURL=actions.js.map