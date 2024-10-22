import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CenterInfoComponent } from '../../components/center-info/center-info.component';
import { SideInfoComponent } from '../../components/side-info/side-info.component';
import { DistrictService } from '../../services/state/district.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, CenterInfoComponent, SideInfoComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  public districtState = inject(DistrictService);
}
