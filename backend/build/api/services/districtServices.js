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
const districtModel_1 = __importDefault(require("../../db/models/districtModel"));
class DistrictService {
    getDistrictById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const district = yield districtModel_1.default.findById(id);
            if (!district)
                throw new Error('District not found');
            return district;
        });
    }
    getAllDistricts() {
        return __awaiter(this, void 0, void 0, function* () {
            const districts = yield districtModel_1.default.find();
            return districts.length ? districts : null;
        });
    }
    getDigitalGap(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const district = yield districtModel_1.default.findById(id);
            if (!district)
                throw new Error('District not found');
            return district.digital_gap;
        });
    }
    getEducationCentre(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const district = yield districtModel_1.default.findById(id);
            if (!district)
                throw new Error('District not found');
            return district.educational_center;
        });
    }
    getEmploymentSituation(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const district = yield districtModel_1.default.findById(id);
            if (!district)
                throw new Error('District not found');
            return district.employment_situation;
        });
    }
    getIncomePerPerson(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const district = yield districtModel_1.default.findById(id);
            if (!district)
                throw new Error('District not found');
            return district.income_per_person;
        });
    }
    createDistrict(district) {
        return __awaiter(this, void 0, void 0, function* () {
            const newDistrict = yield districtModel_1.default.create(district);
            return yield newDistrict.save();
        });
    }
    editDistrict(id, updatedDistrict) {
        return __awaiter(this, void 0, void 0, function* () {
            const district = yield districtModel_1.default.findByIdAndUpdate(id, updatedDistrict, { new: true });
            if (!district)
                throw new Error('District not found');
            return district;
        });
    }
    deleteDistrict(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const district = yield districtModel_1.default.findByIdAndDelete(id);
            if (!district)
                throw new Error('District not found');
        });
    }
}
exports.default = DistrictService;
