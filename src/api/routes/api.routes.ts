import express from 'express'
import { DeleteHandler, GetHandler, PatchHandler, PostHandler } from '../controllers/api.controller'

const ApiRoutes = express.Router()

//GET
ApiRoutes.get('/health', GetHandler)

//POST
ApiRoutes.post('/health', PostHandler)

//PATCH
ApiRoutes.patch('/health', PatchHandler)

//DELETE
ApiRoutes.delete('/health', DeleteHandler)


export default ApiRoutes