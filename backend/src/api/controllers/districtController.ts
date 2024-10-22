import District from "../../db/models/districtModel"
import { BAD_REQUEST, CREATED, INTERNAL_SERVER_ERROR, OK } from "../constants/http"
import { getServiceHealth } from "../services/districtServices"
import appAssert from "../utils/appAssert"
import AppError from "../utils/AppError"
import catchErrors from "../utils/catchErrors"

export const GetHealthHandler = catchErrors( async (_, res) => {

      const healthMessage = await getServiceHealth()

      res.status(OK).json({
            message: healthMessage
      })
})

export const GetAllDistrictsHandler = catchErrors( async (_, res) => {
      const districts = await District.find()

      if(districts.length === 0){
            res.status(OK).json([])
            return
      }
      appAssert(districts, BAD_REQUEST, 'Something went wrong...')

      res.status(OK).json(districts)

})

export const CreateDistrictHandler = catchErrors( async (req, res) => {
      const { 
            name, 
            district_code, 
            location, 
            population, 
            digital_gap, 
            educational_center, 
            employment_situation, 
            income_per_person 
      } = req.body

      if( 
            !name || 
            !district_code || 
            !location || 
            !population || 
            !digital_gap || 
            !educational_center || 
            !employment_situation || 
            !income_per_person ){
            res.status(BAD_REQUEST).json({message: 'All fields are required'})
            return
      }

      const newDistrict = await District.create({
            name,
            district_code,
            location,
            population,
            digital_gap,
            educational_center,
            employment_situation,
            income_per_person
      })

      appAssert(newDistrict, INTERNAL_SERVER_ERROR, 'Something went wrong...')

      res.status(CREATED).json({
            message: 'District Created',
            id: newDistrict._id,
            name: newDistrict.name
      })

})

export const GetDistrictByIdHandler = catchErrors( async (req, res) => {
      const { id } = req.params

      if(!id){
            res.status(BAD_REQUEST).json({message: 'Id is required'})
            return
      }

      const district = await District.findById(id)

      appAssert(district, BAD_REQUEST, 'Something went wrong finding district...')

      res.status(OK).json(district)

})

export const GetDigitalGapHandler = catchErrors( async (req, res) => {
      const { id } = req.params

      if(!id){
            res.status(BAD_REQUEST).json({message: 'Id is required'})   
            return
      }

      const district = await District.findById(id)

      appAssert(district, BAD_REQUEST, 'Something went wrong finding district...')

      res.status(OK).json(district.digital_gap)
})
// export const PostHandler = catchErrors(async (req, res) =>{
//       const { data } = req.body

//       appAssert(data, BAD_REQUEST, 'Data is required')

//       const newMockData = await createMockData(data)

//       appAssert(newMockData, INTERNAL_SERVER_ERROR, 'Something went wrong...')

//       res.status(CREATED).json({
//             message: "Health check. Post works!",
//             body: newMockData
//       })
// })

// export const PatchHandler = catchErrors(async (req, res) =>{
//       const { data } = req.body

//       appAssert(data, BAD_REQUEST, 'Data is required')

//       const patchedMockData = await patchMockData(data)

//       appAssert(patchedMockData, INTERNAL_SERVER_ERROR, 'Something went wrong...')
      
//       res.json({
//             message:'Health check. Patch works!',
//             body: patchedMockData
//       })
// })

// export const DeleteHandler = catchErrors(async (req, res) => {
//       const { data } = req.body

//       appAssert(data, BAD_REQUEST, 'Data is required')

//       const deletedMockData = await deleteMockData(data)

//       appAssert(deletedMockData, INTERNAL_SERVER_ERROR, 'Something went wrong...')

//       res.json({
//             message:'Health check. Delete works!',
//             body: deletedMockData
//       })
// })