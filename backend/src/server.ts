import express from "express"
import cors from "cors"
import morgan from "morgan"
import helmet from "helmet"
import 'dotenv/config'
import DistrictRoutes from "./api/routes/district"
import { NODE_ENV, PORT } from "./api/constants/env"
import errorHandler from "./api/middleware/errorHandler"
import connectToDatabase from "./db/config/mongoose.connect"

const app = express()

app.use(cors())
app.use(express.json())
app.use(helmet())
app.use(morgan("dev"))

app.use("/api", DistrictRoutes)

app.use(errorHandler)

app.listen(
      PORT,
      async () => {
            console.log(`Server running on port ${PORT} in ${NODE_ENV}`)
            await connectToDatabase()
      }
)