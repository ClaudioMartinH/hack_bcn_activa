import { Component, computed, effect, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CenterInfoComponent } from '../../components/center-info/center-info.component';
import { SideInfoComponent } from '../../components/side-info/side-info.component';
import { DistrictService } from '../../services/state/district.service';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, CenterInfoComponent, SideInfoComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({
          transform: 'translateX(-100%)',
          // width: '0',
          opacity: 0
        }),
        animate('700ms ease-out', style({
          transform: 'translateX(0)',
          // width: '*',
          opacity: 1
        }))
      ]),
      transition(':leave', [
        animate('700ms ease-in', style({
          transform: 'translateX(-100%)',
          // width: '0',
          opacity: 0
        }))
      ])
    ])
  ]
})
export class HomeComponent {
  public districtState = inject(DistrictService);
  public hasDistrict: boolean = false;

  constructor() {
    effect(() => {
      const districtCode = this.districtState.districtCode();
      this.hasDistrict = districtCode !== null;
    })

  }

}
