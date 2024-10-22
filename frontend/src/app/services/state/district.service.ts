import { Injectable, signal } from '@angular/core';
import { District } from '../../models/district.interface';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {
  private readonly district = signal<District | null>(null)
  public districtCode = signal<number>(0)

  constructor() { }

  getDistrict() {
    return this.district;
  }

  setDistrict(district: District) {
    this.district.set(district);
  }

  clearDistrict() {
    this.district.set(null);
  }
}
