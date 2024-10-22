import mongoose from "mongoose";
import * as fs from "fs";
import EducationalInstitution from "../../db/models/EducationalInstitution";
import connectToDatabase from "../../db/config/mongoose.connect";

export const loadAndCrossData = async () => {
  try {
    const data = JSON.parse(
      fs.readFileSync("../../db/repository/output.json", "utf-8")
    );

    await connectToDatabase();

    for (const item of data) {
      const existingDistrict = await EducationalInstitution.findOne({
        districtId: item.districtId,
      });

      if (!existingDistrict) {
        const newDistrict = new EducationalInstitution(item);
        await newDistrict.save();
      } else {
        await EducationalInstitution.updateOne(
          { districtId: item.districtId },
          { $set: item }
        );
      }
    }

    console.log("Datos cruzados y guardados en la base de datos.");
  } catch (error) {
    console.error("Error al cargar o cruzar datos:", error);
  } finally {
    await mongoose.connection.close();
  }
};
loadAndCrossData();
