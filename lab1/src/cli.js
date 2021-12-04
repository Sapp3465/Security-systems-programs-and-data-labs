"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.terminal = exports.getPath = exports.commandHandler = exports.saveFileHandler = exports.badCommandHandler = exports.passwordQuestion = exports.removeLastSymbol = exports.cursorToStart = exports.line = exports.write = void 0;
var readline = require("readline");
var commands_1 = require("./commands");
var createFile_1 = require("./createFile");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
if (process.stdin.isTTY)
    process.stdin.setRawMode(true);
var write = function (content) { return rl.write(content); };
exports.write = write;
var line = function (path) { return new Promise(function (resolve) { return rl.question(path, resolve); }); };
exports.line = line;
var cursorToStart = function () {
    readline.cursorTo(process.stdout, 0, 0);
    readline.clearScreenDown(process.stdout);
    rl.write('Password: ');
};
exports.cursorToStart = cursorToStart;
var removeLastSymbol = function (value) { return value.substring(0, value.length - 1); };
exports.removeLastSymbol = removeLastSymbol;
var passwordQuestion = function () { return new Promise(function (resolve) {
    readline.emitKeypressEvents(process.stdin);
    var password = '';
    var done = false;
    (0, exports.cursorToStart)();
    process.stdin.on('keypress', function (chunk, key) {
        if (done)
            return;
        if (key.name === 'return') {
            done = true;
            resolve(password);
        }
        else if (password && key.name === 'backspace')
            password = (0, exports.removeLastSymbol)(password);
        else {
            (0, exports.cursorToStart)();
            password += key.name;
        }
    });
}); };
exports.passwordQuestion = passwordQuestion;
var badCommandHandler = function (command) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log("Bad command: \"".concat(command, "\""));
        return [2 /*return*/];
    });
}); };
exports.badCommandHandler = badCommandHandler;
var saveFileHandler = function (state, params) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, createFile_1.createFile)(state.currentDir, state.file, state.user._id, 'file', params[0])];
            case 1:
                _a.sent();
                delete state.file;
                delete state.content;
                return [2 /*return*/];
        }
    });
}); };
exports.saveFileHandler = saveFileHandler;
var commandHandler = function (state, params, command) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, commands_1.commands[command](state, params)];
            case 1:
                _a.sent();
                if (command === 'vi')
                    (0, exports.write)('\n' + state.content);
                return [2 /*return*/];
        }
    });
}); };
exports.commandHandler = commandHandler;
var getPath = function (state) { return state.file ? '' : "".concat(state.currentDir, ":$"); };
exports.getPath = getPath;
var terminal = function (state) { return __awaiter(void 0, void 0, void 0, function () {
    var path, answer, _a, command, params;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                path = (0, exports.getPath)(state);
                return [4 /*yield*/, (0, exports.line)(path)];
            case 1:
                answer = _b.sent();
                _a = answer.split(' '), command = _a[0], params = _a.slice(1);
                if (!(!commands_1.commands[command] && !state.file)) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, exports.badCommandHandler)(command)];
            case 2:
                _b.sent();
                return [3 /*break*/, 7];
            case 3:
                if (!state.file) return [3 /*break*/, 5];
                return [4 /*yield*/, (0, exports.saveFileHandler)(state, params)];
            case 4:
                _b.sent();
                return [3 /*break*/, 7];
            case 5: return [4 /*yield*/, (0, exports.commandHandler)(state, params, command)];
            case 6:
                _b.sent();
                _b.label = 7;
            case 7: return [4 /*yield*/, (0, exports.terminal)(state)];
            case 8:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.terminal = terminal;
