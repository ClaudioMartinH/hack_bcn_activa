import mongoose from "mongoose"
import { MONGO_URI } from "../../api/constants/env"


const connectToDatabase = async () => {
    try {
        await mongoose.connect(MONGO_URI)
        console.log("Connected to Mongo DB")
    } catch (error) {
        console.log('Could not connect to the database', error)
        process.exit(1)
    }   
    
}
export default connectToDatabase