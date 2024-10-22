import { Injectable, signal } from '@angular/core';
import { District } from '../../models/district.interface';

@Injectable({
  providedIn: 'root'
})
export class DistrictsService {
  private readonly districts = signal<District[]>([])

  constructor() { }

  getDistricts() {
    return this.districts;
  }

  setDistricts(districts: District[]) {
    this.districts.set(districts);
  }

  clearDistricts() {
    this.districts.set([]);
  }
}
