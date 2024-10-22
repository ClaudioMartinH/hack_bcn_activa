import express from 'express'
import DistrictCotroller from '../controllers/districtController'

const DistrictRoutes = express.Router()
const districtController = new DistrictCotroller()

// DistrictRoutes.get('/health', GetHealth)
// DistrictRoutes.get('/districts', GetAllDistricts)
// DistrictRoutes.get('/district/:id', GetDistrictById)


DistrictRoutes.get('/districts/:id/digitalGap', districtController.getDistrictById)
DistrictRoutes.get('/districts/:id/educationCentre', districtController.getEducationCentre)
DistrictRoutes.get('/districts/:id/employmentSituation', districtController.getEmploymentSituation)
DistrictRoutes.get('/districts/:id/incomePerPerson', districtController.getIncomePerPerson)


DistrictRoutes.post('/districts/create', districtController.createDistrict)

DistrictRoutes.patch('/districts/edit/:id', districtController.editDistrict)


DistrictRoutes.delete('/districts/delete/:id', districtController.deleteDistrict)


export default DistrictRoutes