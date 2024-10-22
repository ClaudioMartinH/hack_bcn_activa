import mongoose from "mongoose";

export interface IDistrict{
      name: string
      district_code: string
      location: string
      population: number
      digital_gap: string
      educational_center: string
      employment_situation: string
      income_per_person: string
      createdAt: Date
      updatedAt: Date
}

const districtSchema = new mongoose.Schema({
      name: { type: String, required: true },
      location: { type: String, required: true },
      digital_gap: { type: String, required: true },
      educational_center: { type: String, required: true },
      employment_situation: { type: String, required: true },
      income_per_person: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: null },
})


const District = mongoose.model<IDistrict>('District', districtSchema)

export default District