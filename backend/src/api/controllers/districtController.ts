import { BAD_REQUEST, CREATED, INTERNAL_SERVER_ERROR, OK } from "../constants/http"
import appAssert from "../utils/appAssert"
import AppError from "../utils/AppError"
import catchErrors from "../utils/catchErrors"
import DistrictService from "../services/districtServices"
import mongoose from "mongoose"
import { Request, Response } from "express"

export default class DistrictCotroller {

    districtServices = new DistrictService();
      async createDistrict(req: Request, res: Response) {
            const { name, district_code, location, population, digital_gap, educational_center, employment_situation, income_per_person } = req.body

            if (!name ||!district_code ||!location ||!population ||!digital_gap ||!educational_center ||!employment_situation ||!income_per_person) {
                  throw new AppError(BAD_REQUEST, "All fields are required")
            }
            try {
                  const newDistrict = await this.districtServices.createDistrict({
                        name,
                        district_code,
                        location,
                        population,
                        digital_gap,
                        educational_center,
                        employment_situation,
                        income_per_person,
                        createdAt: new Date,
                        updatedAt: new Date
                  })
                  res.status(CREATED).json(newDistrict)

            } catch (error) {
                  
                  appAssert(error instanceof AppError, 500, "Internal Server Error")
            }
      }

      async getDistrictById(req: Request, res: Response) {
            const { id } = req.params

            try {
                  const district = await this.districtServices.getDistrictById(id)
                  res.status(OK).json(district)
            } catch (error) {
                  appAssert(error instanceof AppError, 500, "Internal Server Error")
            }
      }

      async getAllDistricts(req: Request, res: Response) {
            try {
                  const districts = await this.districtServices.getAllDistricts()
                  res.status(OK).json(districts)
            } catch (error) {
                  appAssert(error instanceof AppError, 500, "Internal Server Error")
            }
      }

      async getDigitalGap(req: Request, res: Response) {
            const { id } = req.params

            try {
                  const digitalGap = await this.districtServices.getDigitalGap(id)
                  res.status(OK).json(digitalGap)
            } catch (error) {
                  appAssert(error instanceof AppError, 500, "Internal Server Error")
            }
      }

      async getEducationCentre(req: Request, res: Response) {
            const { id } = req.params

            try {
                  const educationalCenter = await this.districtServices.getEducationCentre(id)
                  res.status(OK).json(educationalCenter)
            } catch (error) {
                  appAssert(error instanceof AppError, 500, "Internal Server Error")
            }
      }

      async getEmploymentSituation(req: Request, res: Response) {
            const { id } = req.params

            try {
                  const employmentSituation = await this.districtServices.getEmploymentSituation(id)
                  res.status(OK).json(employmentSituation)
            } catch (error) {
                  appAssert(error instanceof AppError, 500, "Internal Server Error")
            }
      }

      async getIncomePerPerson(req: Request, res: Response) {
            const { id } = req.params

            try {
                  const incomePerPerson = await this.districtServices.getIncomePerPerson(id)
                  res.status(OK).json(incomePerPerson)
            } catch (error) {
                  appAssert(error instanceof AppError, 500, "Internal Server Error")
            }
      }

      async editDistrict(req: Request, res: Response) {
            const { id } = req.params
            const { name, district_code, location, population, digital_gap, educational_center, employment_situation, income_per_person } = req.body

            if (!name ||!district_code ||!location ||!population ||!digital_gap ||!educational_center ||!employment_situation ||!income_per_person) {
                   throw new AppError(BAD_REQUEST, "All fields are required")
            }
            
            try {
                  await this.districtServices.editDistrict(id, {
                        name,
                        district_code,
                        location,
                        population,
                        digital_gap,
                        educational_center,
                        employment_situation,
                        income_per_person,
                        updatedAt: new Date,
                        createdAt: new Date(req.body.createdAt || new Date())
                  })
            } catch (error) {
                  
                   appAssert(error instanceof AppError, 500, "Internal Server Error")
            }

      }

      async deleteDistrict(req: Request, res: Response) {
            const { id } = req.params

            try {
                  await this.districtServices.deleteDistrict(id)
                  res.status(OK).json({ message: "District deleted successfully" })
            } catch (error) {
                  appAssert(error instanceof AppError, 500, "Internal Server Error")
            }
      }
}