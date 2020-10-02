"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
var commander_1 = __importDefault(require("commander"));
var path_1 = __importDefault(require("path"));
var stream_1 = require("stream");
var fs_1 = __importDefault(require("fs"));
var actions_1 = __importDefault(require("./actions"));
commander_1.default.storeOptionsAsProperties(false);
commander_1.default.version('1.0.0').description('Caesar cipher cli tool');
commander_1.default
    .option('-a, --action <action>', 'select Encode / Decode action')
    .option('-s, --shift <count>', 'shift letters')
    .option('-i, --input <path>', 'path of an input file')
    .option('-o, --output <path>', 'path of an output file');
commander_1.default.parse(process.argv);
var options = commander_1.default.opts();
var Cipher = /** @class */ (function (_super) {
    __extends(Cipher, _super);
    function Cipher(action, shift, opt) {
        var _this = _super.call(this, opt) || this;
        _this.action = action;
        _this.shift = shift;
        _this.action = action;
        _this.shift = shift;
        return _this;
    }
    Cipher.prototype._transform = function (chunk, encode, callback) {
        try {
            if (options.action !== 'encode' && options.action !== 'decode') {
                throw Error('Incorrect action parameter');
            }
            var action = this.action === 'encode' ? actions_1.default.encode : actions_1.default.decode;
            callback(null, action(chunk.toString('utf8'), this.shift));
        }
        catch (err) {
            callback(err);
        }
    };
    return Cipher;
}(stream_1.Transform));
var cipher = new Cipher(options.action, +options.shift);
var inputPath = path_1.default.join(__dirname, options.input);
var outputPath = path_1.default.join(__dirname, options.output);
console.log(options);
stream_1.pipeline(fs_1.default.createReadStream(inputPath), cipher, fs_1.default.createWriteStream(outputPath), function (err) {
    if (err) {
        console.error(err.message);
    }
    else {
        console.log(options.action + " succeeded!");
    }
});
//# sourceMappingURL=index.js.map