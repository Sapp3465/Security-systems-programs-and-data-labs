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
var mongoose_1 = require("mongoose");
var dotenv = require("dotenv");
var file_types_schema_1 = require("./schemas/file-types.schema");
var schemas_enum_1 = require("./schemas/schemas.enum");
var file_types_dataset_1 = require("./datasets/file-types.dataset");
var rights_dataset_1 = require("./datasets/rights.dataset");
var rights_schema_1 = require("./schemas/rights.schema");
var users_dataset_1 = require("./datasets/users.dataset");
var users_schema_1 = require("./schemas/users.schema");
var files_schema_1 = require("./schemas/files.schema");
var files_dataset_1 = require("./datasets/files.dataset");
var user_rights_schema_1 = require("./schemas/user-rights.schema");
var user_rights_dataset_1 = require("./datasets/user-rights.dataset");
dotenv.config();
var createManyOrLog = function (collection, model, name) { return __awaiter(void 0, void 0, void 0, function () {
    var _i, collection_1, document_1, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _i = 0, collection_1 = collection;
                _a.label = 1;
            case 1:
                if (!(_i < collection_1.length)) return [3 /*break*/, 6];
                document_1 = collection_1[_i];
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, model.create(document_1)];
            case 3:
                _a.sent();
                return [3 /*break*/, 5];
            case 4:
                e_1 = _a.sent();
                console.log("In collection ".concat(name, " document with _id \"").concat(document_1._id, "\" is already exist"));
                return [3 /*break*/, 5];
            case 5:
                _i++;
                return [3 /*break*/, 1];
            case 6: return [2 /*return*/];
        }
    });
}); };
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 8, , 9]);
                return [4 /*yield*/, (0, mongoose_1.connect)(process.env.MONGO_URL)];
            case 1:
                _a.sent();
                return [4 /*yield*/, createManyOrLog(file_types_dataset_1.fileTypesDataset, file_types_schema_1.FileTypesModel, schemas_enum_1.ESchemaNames.fileTypes)];
            case 2:
                _a.sent();
                return [4 /*yield*/, createManyOrLog(rights_dataset_1.rightsDataset, rights_schema_1.RightsModel, schemas_enum_1.ESchemaNames.rights)];
            case 3:
                _a.sent();
                return [4 /*yield*/, createManyOrLog(users_dataset_1.usersDataset, users_schema_1.UserModel, schemas_enum_1.ESchemaNames.users)];
            case 4:
                _a.sent();
                return [4 /*yield*/, createManyOrLog(files_dataset_1.filesDataset, files_schema_1.FilesModel, schemas_enum_1.ESchemaNames.files)];
            case 5:
                _a.sent();
                return [4 /*yield*/, createManyOrLog(user_rights_dataset_1.userRightsDataset, user_rights_schema_1.UserRightsModel, schemas_enum_1.ESchemaNames.userRights)];
            case 6:
                _a.sent();
                return [4 /*yield*/, mongoose_1.connection.close()];
            case 7:
                _a.sent();
                return [3 /*break*/, 9];
            case 8:
                e_2 = _a.sent();
                console.log('init disk error');
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); })();
