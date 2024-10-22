export interface District {
  id: number;
  nombre: string;
  educationalcenters: number;
  population: number;
}


export type DistrictEndpoint = 'digitalGap' | 'educationalCenter' | 'employmentSituation' | 'incomePerPerson'
