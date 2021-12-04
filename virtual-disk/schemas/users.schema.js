"use strict";
exports.__esModule = true;
exports.UserModel = exports.UsersSchema = void 0;
var mongoose_1 = require("mongoose");
var schemas_enum_1 = require("./schemas.enum");
exports.UsersSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true }
});
exports.UserModel = (0, mongoose_1.model)(schemas_enum_1.ESchemaNames.users, exports.UsersSchema);
