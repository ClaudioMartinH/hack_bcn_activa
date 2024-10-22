const getEnv = ( key:string, defaultValue?:string ): string => {
      const value = process.env[key] || defaultValue
  
      if (value === undefined){
          throw new Error(`Missing enviroment key ${key}`)
      }
      return value
  }
  
  export const NODE_ENV = getEnv("NODE_ENV", "development")
  export const PORT = getEnv("PORT", "3000")
  export const DB_URI = getEnv("DB_URI")
  export const APP_ORIGIN = getEnv("APP_ORIGIN")

  //Create a new .env file in the root of the project
  //Add the following to the .env file
  /*
      NODE_ENV=
      PORT=
      DB_URI=
      APP_ORIGIN=
  */