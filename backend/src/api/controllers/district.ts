import { BAD_REQUEST, CREATED, INTERNAL_SERVER_ERROR, OK } from "../constants/http"
import { getDistrictById, getServiceHealth } from "../services/district"
import appAssert from "../utils/appAssert"
import AppError from "../utils/AppError"
import catchErrors from "../utils/catchErrors"


export const GetHealth = catchErrors( async (_, res) => {

      const healthMessage = await getServiceHealth()

      res.status(OK).json({
            message: healthMessage
      })
})

export const GetDistrictById = catchErrors( async (req, res) => {

      const { id } = req.params

      appAssert(id, BAD_REQUEST, 'Id is required')

      const district = await getDistrictById(id)

      res.status(OK).json({ District: district })
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