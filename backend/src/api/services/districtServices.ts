import District, { IDistrict } from "../../db/models/district";

class DistrictService {
      async getDistrictById(id: string): Promise<IDistrict>{
            const district = await District.findById(id)
            if (!district) throw new Error('District not found')
            return district
      }
      
      async getAllDistricts(): Promise<IDistrict[] | null>{
            const districts = await District.find()
            return districts.length? districts : null
      }

      async getDigitalGap(id: string): Promise<string | null>{
            const district = await District.findById(id)
            if (!district) throw new Error('District not found')
            return district.digital_gap
      }

      async getEducationCentre(id: string): Promise<string | null>{
            const district = await District.findById(id)
            if (!district) throw new Error('District not found')
            return district.educational_center
      }

      async getEmploymentSituation(id: string): Promise<string | null>{
            const district = await District.findById(id)
            if (!district) throw new Error('District not found')
            return district.employment_situation
      }

      async getIncomePerPerson(id: string): Promise<string | null>{
            const district = await District.findById(id)
            if (!district) throw new Error('District not found')
            return district.income_per_person
      }

      async createDistrict(district: IDistrict): Promise<IDistrict>{
            const newDistrict = new District(district)
            return await newDistrict.save()
      }

      async editDistrict(id: string, updatedDistrict: IDistrict): Promise<IDistrict>{
            const district = await District.findByIdAndUpdate(id, updatedDistrict, { new: true })
            if (!district) throw new Error('District not found')
            return district
      }

      async deleteDistrict(id: string): Promise<void>{
            const district = await District.findByIdAndDelete(id)
            if (!district) throw new Error('District not found')
      }
}

export default DistrictService