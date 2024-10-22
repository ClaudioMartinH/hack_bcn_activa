"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const districtSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    digital_gap: { type: String, required: true },
    educational_center: { type: String, required: true },
    employment_situation: { type: String, required: true },
    income_per_person: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: null },
});
const District = mongoose_1.default.model('District', districtSchema);
exports.default = District;
