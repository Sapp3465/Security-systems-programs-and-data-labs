"use strict";
exports.__esModule = true;
exports.FilesModel = exports.FilesSchema = void 0;
var mongoose_1 = require("mongoose");
var schemas_enum_1 = require("./schemas.enum");
exports.FilesSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    type: { type: mongoose_1.Schema.Types.ObjectId, ref: schemas_enum_1.ESchemaNames.fileTypes, required: true },
    dirId: { type: mongoose_1.Schema.Types.ObjectId, ref: schemas_enum_1.ESchemaNames.files },
    isEncrypted: { type: Boolean },
    content: { type: String }
});
exports.FilesModel = (0, mongoose_1.model)(schemas_enum_1.ESchemaNames.files, exports.FilesSchema);
