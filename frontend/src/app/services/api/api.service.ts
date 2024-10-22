import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DistrictEndpoint } from '../../models/district.interface';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private static readonly BASE_URL = 'http://localhost:3000/api';
  private http = inject(HttpClient);


  constructor() { }


  getDistrict(id: string, endpoint: DistrictEndpoint) {
    return this.http.get(`${ApiService.BASE_URL}/district/${id}/${endpoint}`);
  }

  getDistricts() {
    return this.http.get(`${ApiService.BASE_URL}/districts`);
  }

}
