import express from 'express'
import DistrictCotroller from '../controllers/districtController'

const DistrictRoutes = express.Router()
const districtController = new DistrictCotroller()

// DistrictRoutes.get('/health', GetHealth)
// DistrictRoutes.get('/districts', GetAllDistricts)
// DistrictRoutes.get('/district/:id', GetDistrictById)


DistrictRoutes.get('/district/:id/digitalGap', districtController.getDistrictById)
DistrictRoutes.get('/district/:id/educationCentre', districtController.getEducationCentre)
DistrictRoutes.get('/district/:id/employmentSituation', districtController.getEmploymentSituation)
DistrictRoutes.get('/district/:id/incomePerPerson', districtController.getIncomePerPerson)


DistrictRoutes.post('/district/create', districtController.createDistrict)

DistrictRoutes.patch('/district/edit/:id', districtController.editDistrict)


DistrictRoutes.delete('/district/delete/:id', districtController.deleteDistrict)


export default DistrictRoutes