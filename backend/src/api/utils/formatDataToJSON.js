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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs"); // Importar fs como un módulo completo
var path = require("path"); // Importar path como un módulo completo
function loadJson(filePath) {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            try {
                data = fs.readFileSync(filePath, "utf-8");
                return [2 /*return*/, JSON.parse(data)];
            }
            catch (error) {
                console.error("Error al cargar o parsear el archivo JSON: ".concat(error.message));
                throw error;
            }
            return [2 /*return*/];
        });
    });
}
function formatData(data) {
    return data.map(function (item) { return ({
        districtId: item.district_id,
        districtName: item.district_name,
        roadName: item.addresses_road_name,
        educationalInstitution: item.name,
        type: item.Type,
        subtype: item.Sub_type,
    }); });
}
function saveJson(filePath, data) {
    return __awaiter(this, void 0, void 0, function () {
        var jsonData;
        return __generator(this, function (_a) {
            try {
                jsonData = JSON.stringify(data, null, 2);
                fs.writeFileSync(filePath, jsonData, "utf-8");
                console.log("Datos guardados correctamente en:", filePath);
            }
            catch (error) {
                console.error("Error al guardar el archivo JSON: ".concat(error.message));
            }
            return [2 /*return*/];
        });
    });
}
function processJson(inputFilePath, outputFilePath) {
    return __awaiter(this, void 0, void 0, function () {
        var data, formattedData, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, loadJson(inputFilePath)];
                case 1:
                    data = _a.sent();
                    formattedData = formatData(data);
                    return [4 /*yield*/, saveJson(outputFilePath, formattedData)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error en el proceso:", error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Especifica las rutas de entrada y salida
var inputFilePath = path.join(__dirname, "../../db/repository/centro-educativo.json"); // Ajusta la ruta de entrada
var outputFilePath = path.join(__dirname, "../../db/repository/output.json"); // Ajusta la ruta de salida
processJson(inputFilePath, outputFilePath);
