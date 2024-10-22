

export const getServiceHealth = async () => {
      const message = 'Get service is healthy'
      return message
}
export const getDistrictById = async (id: string) => {
      //search district by id
      const message = 'Get distict by id is healthy'
      return {
            message: message,
            id: id
      }
}


// export const createMockData = async (data: any) => {
//       const newMockData = {
//             newData: data,
//             createdAt: new Date()
//       }
//       return newMockData
// }

//      export const patchMockData = async (data: any) => {
//       const patchedMockData = {
//             patchedData: data,
//             updatedAt: new Date()
//       }
//       return patchedMockData
// }

// export const deleteMockData = async (data: any) => {
//       const deletedMockData = {
//             deletedData: data,
//             deletedAt: new Date()
//       }
//       return deletedMockData
// }