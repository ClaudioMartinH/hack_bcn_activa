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
exports.DistrictCotroller = void 0;
const http_1 = require("../constants/http");
const districtServices_1 = __importDefault(require("../services/districtServices"));
const districtService = new districtServices_1.default();
class DistrictCotroller {
    createDistrict(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, district_code, location, population, digital_gap, educational_center, employment_situation, income_per_person, } = req.body;
            if (!name ||
                !district_code ||
                !location ||
                !population ||
                !digital_gap ||
                !educational_center ||
                !employment_situation ||
                !income_per_person) {
                res.status(http_1.BAD_REQUEST).json({
                    error: "Missing required fields",
                });
                return;
            }
            try {
                const newDistrict = yield districtService.createDistrict({
                    name,
                    district_code,
                    location,
                    population,
                    digital_gap,
                    educational_center,
                    employment_situation,
                    income_per_person,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });
                res.status(http_1.CREATED).json(newDistrict);
            }
            catch (error) {
                res.status(500).json({ error: error });
                return;
            }
        });
    }
    getDistrictById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const district = yield districtService.getDistrictById(id);
                res.status(http_1.OK).json(district);
            }
            catch (error) {
                res.status(500).json({ error: error });
                return;
            }
        });
    }
    getAllDistricts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const districts = yield districtService.getAllDistricts();
                res.status(http_1.OK).json(districts);
            }
            catch (error) {
                res.status(500).json({ error: error });
                return;
            }
        });
    }
    getDigitalGap(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const digitalGap = yield districtService.getDigitalGap(id);
                res.status(http_1.OK).json(digitalGap);
            }
            catch (error) {
                res.status(500).json({ error: error });
                return;
            }
        });
    }
    getEducationCentre(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const educationalCenter = yield districtService.getEducationCentre(id);
                res.status(http_1.OK).json(educationalCenter);
            }
            catch (error) {
                res.status(500).json({ error: error });
                return;
            }
        });
    }
    getEmploymentSituation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const employmentSituation = yield districtService.getEmploymentSituation(id);
                res.status(http_1.OK).json(employmentSituation);
            }
            catch (error) {
                res.status(500).json({ error: error });
                return;
            }
        });
    }
    getIncomePerPerson(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const incomePerPerson = yield districtService.getIncomePerPerson(id);
                res.status(http_1.OK).json(incomePerPerson);
            }
            catch (error) {
                res.status(500).json({ error: error });
                return;
            }
        });
    }
    editDistrict(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { name, district_code, location, population, digital_gap, educational_center, employment_situation, income_per_person, } = req.body;
            if (!name ||
                !district_code ||
                !location ||
                !population ||
                !digital_gap ||
                !educational_center ||
                !employment_situation ||
                !income_per_person) {
                res.status(500).json({ error: "Invalid name or district code" });
            }
            try {
                yield districtService.editDistrict(id, {
                    name,
                    district_code,
                    location,
                    population,
                    digital_gap,
                    educational_center,
                    employment_situation,
                    income_per_person,
                    updatedAt: new Date(),
                    createdAt: new Date(req.body.createdAt || new Date()),
                });
            }
            catch (error) {
                res.status(500).json({ error: error });
                return;
            }
        });
    }
    deleteDistrict(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield districtService.deleteDistrict(id);
                res.status(http_1.OK).json({ message: "District deleted successfully" });
            }
            catch (error) {
                res.status(500).json({ error: error });
                return;
            }
        });
    }
}
exports.DistrictCotroller = DistrictCotroller;
