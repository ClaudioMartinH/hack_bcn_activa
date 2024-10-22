import * as fs from "fs";
import * as path from "path";

export async function formatDataToJson(
  inputFilePath: string,
  outputFilePath: string
) {
  interface InputData {
    district_id: number;
    district_name: string;
    addresses_road_name: string;
    name: string;
    Type: string;
    Sub_type: string;
  }

  interface FormattedData {
    districtId: number;
    districtName: string;
    roadName: string;
    educationalInstitution: string;
    type: string;
    subtype: string;
  }

  async function loadJson(filePath: string): Promise<InputData[]> {
    try {
      const data = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(data);
    } catch (error: any) {
      console.error(
        `Error al cargar o parsear el archivo JSON: ${error.message}`
      );
      throw error;
    }
  }

  function formatData(data: InputData[]): FormattedData[] {
    return data.map((item) => ({
      districtId: item.district_id,
      districtName: item.district_name,
      roadName: item.addresses_road_name,
      educationalInstitution: item.name,
      type: item.Type,
      subtype: item.Sub_type,
    }));
  }

  async function saveJson(filePath: string, data: any): Promise<void> {
    try {
      const jsonData = JSON.stringify(data, null, 2);
      fs.writeFileSync(filePath, jsonData, "utf-8");
      console.log("Datos guardados correctamente en:", filePath);
    } catch (error: any) {
      console.error(`Error al guardar el archivo JSON: ${error.message}`);
    }
  }

  async function processJson() {
    try {
      const data = await loadJson(inputFilePath);
      const formattedData = formatData(data);
      await saveJson(outputFilePath, formattedData);
    } catch (error) {
      console.error("Error en el proceso:", error);
    }
  }

  await processJson();
}
