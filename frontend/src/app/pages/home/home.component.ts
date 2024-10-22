import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CenterInfoComponent } from '../../components/center-info/center-info.component';
import { SideInfoComponent } from '../../components/side-info/side-info.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, CenterInfoComponent, SideInfoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
