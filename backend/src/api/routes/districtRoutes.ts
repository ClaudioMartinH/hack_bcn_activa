import express from 'express'
import { CreateDistrictHandler, GetAllDistrictsHandler, GetDigitalGapHandler, GetDistrictByIdHandler, GetHealthHandler } from '../controllers/districtController'
import District from '../../db/models/districtModel'

const DistrictRoutes = express.Router()

//GET
DistrictRoutes.get('/health', GetHealthHandler)
DistrictRoutes.get('/districts', GetAllDistrictsHandler)
DistrictRoutes.get('/districts/:id', GetDistrictByIdHandler)

DistrictRoutes.get('/districts/:id/digital_gap', GetDigitalGapHandler)

//POST
DistrictRoutes.post('/districts/create', CreateDistrictHandler)


export default DistrictRoutes