"use strict";
exports.__esModule = true;
exports.FileTypesModel = exports.FileTypesSchema = void 0;
var mongoose_1 = require("mongoose");
exports.FileTypesSchema = new mongoose_1.Schema({
    label: { type: String, required: true }
});
exports.FileTypesModel = (0, mongoose_1.model)('FileTypes', exports.FileTypesSchema);
