import express from 'express'
import { GetDistrictById, GetHealth } from '../controllers/district'

const DistrictRoutes = express.Router()


DistrictRoutes.get('/health', GetHealth)
DistrictRoutes.get('/districts', GetAllDistricts)
DistrictRoutes.get('/district/:id', GetDistrictById)


DistrictRoutes.get('/district/:id/digitalGap', GetDigitalGap)
DistrictRoutes.get('/district/:id/educationCentre', GetEducationCentre)
DistrictRoutes.get('/district/:id/employmentSituation', GetEmploymentSituation)
DistrictRoutes.get('/district/:id/incomePerPerson', GetIncomePerPerson)


DistrictRoutes.post('/district/create', CreateDistrict)

DistrictRoutes.patch('/district/edit/:id', EditDistrict)


DistrictRoutes.delete('/district/delete/:id', DeleteDistrict)


export default DistrictRoutes