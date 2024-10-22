"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const districtController_1 = require("../controllers/districtController");
const DistrictRoutes = express_1.default.Router();
const districtController = new districtController_1.DistrictCotroller();
// DistrictRoutes.get('/health', GetHealth)
DistrictRoutes.get("/districts", districtController.getAllDistricts);
DistrictRoutes.get("/districts/:id", districtController.getDistrictById);
DistrictRoutes.get("/districts/:id/digitalGap", districtController.getDigitalGap);
DistrictRoutes.get("/districts/:id/educationCentre", districtController.getEducationCentre);
DistrictRoutes.get("/districts/:id/employmentSituation", districtController.getEmploymentSituation);
DistrictRoutes.get("/districts/:id/incomePerPerson", districtController.getIncomePerPerson);
DistrictRoutes.post("/districts/create", districtController.createDistrict);
DistrictRoutes.patch("/districts/edit/:id", districtController.editDistrict);
DistrictRoutes.delete("/districts/delete/:id", districtController.deleteDistrict);
exports.default = DistrictRoutes;
