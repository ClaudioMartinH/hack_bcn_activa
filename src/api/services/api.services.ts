

export const getServiceHealth = async () => {
      const message = 'GET service is healthy'
      return message
}


export const createMockData = async (data: any) => {
           const newMockData = {
                 newData: data,
                 createdAt: new Date()
           }
           return newMockData
     }

     export const patchMockData = async (data: any) => {
      const patchedMockData = {
            patchedData: data,
            updatedAt: new Date()
      }
      return patchedMockData
}

export const deleteMockData = async (data: any) => {
      const deletedMockData = {
            deletedData: data,
            deletedAt: new Date()
      }
      return deletedMockData
}