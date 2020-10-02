"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getShiftedCode = function (code, shift) {
    var FIRST_UPPER_CHAR_CODE = 65;
    var FIRST_LOWER_CHAR_CODE = 97;
    var CHAR_COUNT = 26;
    var firstCharCode = code >= FIRST_LOWER_CHAR_CODE
        ? FIRST_LOWER_CHAR_CODE
        : FIRST_UPPER_CHAR_CODE;
    return (firstCharCode + ((CHAR_COUNT + (code - firstCharCode) + shift) % CHAR_COUNT));
};
var isLetter = function (char) { return /[a-zA-Z]/.test(char); };
var getShiftedChar = function (shift) { return function (char) {
    if (!isLetter(char)) {
        return char;
    }
    var code = char.codePointAt(0);
    var shiftedCode = getShiftedCode(code, shift);
    return String.fromCodePoint(shiftedCode);
}; };
exports.default = { getShiftedChar: getShiftedChar };
//# sourceMappingURL=utils.js.map