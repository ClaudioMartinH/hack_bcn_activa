import { Component } from '@angular/core';
import { MapBoxComponent } from '../map-box/map-box.component';

@Component({
  selector: 'app-center-info',
  standalone: true,
  imports: [MapBoxComponent],
  templateUrl: './center-info.component.html',
  styleUrl: './center-info.component.scss'
})
export class CenterInfoComponent {

}
