import express from 'express'
import { GetDistrictById, GetHealth } from '../controllers/district'

const DistrictRoutes = express.Router()

//GET
DistrictRoutes.get('/health', GetHealth)
DistrictRoutes.get('/district/:id', GetDistrictById)

// //POST
// DistrictRoutes.post('/health', PostHandler)

// //PATCH
// DistrictRoutes.patch('/health', PatchHandler)

// //DELETE
// DistrictRoutes.delete('/health', DeleteHandler)


export default DistrictRoutes