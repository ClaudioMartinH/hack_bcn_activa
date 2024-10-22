import {
  BAD_REQUEST,
  CREATED,
  INTERNAL_SERVER_ERROR,
  OK,
} from "../constants/http";
import DistrictService from "../services/districtServices";
import { Request, Response } from "express";

const districtService = new DistrictService();

export class DistrictCotroller {
  async createDistrict(req: Request, res: Response) {
    const {
      name,
      district_code,
      location,
      population,
      digital_gap,
      educational_center,
      employment_situation,
      income_per_person,
    } = req.body;

    if (
      !name ||
      !district_code ||
      !location ||
      !population ||
      !digital_gap ||
      !educational_center ||
      !employment_situation ||
      !income_per_person
    ) {
      res.status(BAD_REQUEST).json({
        error: "Missing required fields",
      });
      return;
    }
    try {
      const newDistrict = await districtService.createDistrict({
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
      res.status(CREATED).json(newDistrict);
    } catch (error) {
      res.status(500).json({ error: error });
      return;
    }
  }

  async getDistrictById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const district = await districtService.getDistrictById(id);
      res.status(OK).json(district);
    } catch (error) {
      res.status(500).json({ error: error });
      return;
    }
  }

  async getAllDistricts(req: Request, res: Response) {
    try {
      const districts = await districtService.getAllDistricts();
      res.status(OK).json(districts);
    } catch (error) {
      res.status(500).json({ error: error });
      return;
    }
  }

  async getDigitalGap(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const digitalGap = await districtService.getDigitalGap(id);
      res.status(OK).json(digitalGap);
    } catch (error) {
      res.status(500).json({ error: error });
      return;
    }
  }

  async getEducationCentre(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const educationalCenter = await districtService.getEducationCentre(id);
      res.status(OK).json(educationalCenter);
    } catch (error) {
      res.status(500).json({ error: error });
      return;
    }
  }

  async getEmploymentSituation(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const employmentSituation = await districtService.getEmploymentSituation(
        id
      );
      res.status(OK).json(employmentSituation);
    } catch (error) {
      res.status(500).json({ error: error });
      return;
    }
  }

  async getIncomePerPerson(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const incomePerPerson = await districtService.getIncomePerPerson(id);
      res.status(OK).json(incomePerPerson);
    } catch (error) {
      res.status(500).json({ error: error });
      return;
    }
  }

  async editDistrict(req: Request, res: Response) {
    const { id } = req.params;
    const {
      name,
      district_code,
      location,
      population,
      digital_gap,
      educational_center,
      employment_situation,
      income_per_person,
    } = req.body;

    if (
      !name ||
      !district_code ||
      !location ||
      !population ||
      !digital_gap ||
      !educational_center ||
      !employment_situation ||
      !income_per_person
    ) {
      res.status(500).json({ error: "Invalid name or district code" });
    }

    try {
      await districtService.editDistrict(id, {
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
    } catch (error) {
      res.status(500).json({ error: error });
      return;
    }
  }

  async deleteDistrict(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await districtService.deleteDistrict(id);
      res.status(OK).json({ message: "District deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error });
      return;
    }
  }
}
