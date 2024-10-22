import mongoose from "mongoose";

const EducationalInstitutionSchema = new mongoose.Schema({
  districtId: Number,
  districtName: String,
  roadName: String,
  educationalInstitution: String,
  type: String,
  subtype: String,
});

const EducationalInstitution = mongoose.model(
  "EducationalInstitution",
  EducationalInstitutionSchema
);

export default EducationalInstitution;
