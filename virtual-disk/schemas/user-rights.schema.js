"use strict";
exports.__esModule = true;
exports.UserRightsModel = exports.UserRightsSchema = void 0;
var mongoose_1 = require("mongoose");
var schemas_enum_1 = require("./schemas.enum");
exports.UserRightsSchema = new mongoose_1.Schema({
    file: { type: mongoose_1.Schema.Types.ObjectId, ref: schemas_enum_1.ESchemaNames.files, required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: schemas_enum_1.ESchemaNames.users, required: true },
    right: { type: mongoose_1.Schema.Types.ObjectId, ref: schemas_enum_1.ESchemaNames.rights, required: true }
});
exports.UserRightsModel = (0, mongoose_1.model)(schemas_enum_1.ESchemaNames.userRights, exports.UserRightsSchema);
