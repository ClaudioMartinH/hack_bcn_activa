import mongoose from "mongoose";

export interface IDistrict {
      name: string
      location: string
      data: string
      createdAt: Date
      updatedAt: Date
}

const districtSchema = new mongoose.Schema({
      name: { type: String, required: true },
      location: { type: String, required: true },
      data: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: null },
})

const District = mongoose.model<IDistrict>('District', districtSchema)

export default District