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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
require("dotenv/config");
const districtRoutes_1 = __importDefault(require("./api/routes/districtRoutes"));
const env_1 = require("./api/constants/env");
const errorHandler_1 = __importDefault(require("./api/middleware/errorHandler"));
const mongoose_connect_1 = __importDefault(require("./db/config/mongoose.connect"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use("/api", districtRoutes_1.default);
app.use(errorHandler_1.default);
app.listen(env_1.PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Server running on port ${env_1.PORT} in ${env_1.NODE_ENV}`);
    yield (0, mongoose_connect_1.default)();
}));
