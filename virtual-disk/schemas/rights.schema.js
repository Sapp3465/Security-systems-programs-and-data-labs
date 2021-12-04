"use strict";
exports.__esModule = true;
exports.RightsModel = exports.RightsSchema = void 0;
var mongoose_1 = require("mongoose");
exports.RightsSchema = new mongoose_1.Schema({
    label: { type: String, required: true }
});
exports.RightsModel = (0, mongoose_1.model)('Rights', exports.RightsSchema);
