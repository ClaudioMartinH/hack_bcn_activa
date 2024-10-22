"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_assert_1 = __importDefault(require("node:assert"));
const AppError_1 = __importDefault(require("./AppError"));
const appAssert = (condition, HttpStatusCode, message, appErrorCode) => (0, node_assert_1.default)(condition, new AppError_1.default(HttpStatusCode, message, appErrorCode));
exports.default = appAssert;
