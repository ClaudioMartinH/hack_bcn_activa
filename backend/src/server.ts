import express from "express"
import cors from "cors"
import morgan from "morgan"
import helmet from "helmet"
import 'dotenv/config'
import ApiRoutes from "./api/routes/api.routes"
import { NODE_ENV, PORT } from "./api/constants/env"
import errorHandler from "./api/middleware/errorHandler"

const app = express()

app.use(cors())
app.use(express.json())
app.use(helmet())
app.use(morgan("dev"))

app.use("/api", ApiRoutes)

app.use(errorHandler)

app.listen(
      PORT,
       () => {
            console.log(`Server running on port ${PORT} in ${NODE_ENV}`)
            // await connectToDatabase()
      }
)