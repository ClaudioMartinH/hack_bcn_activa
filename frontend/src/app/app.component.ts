import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CenterInfoComponent } from './components/center-info/center-info.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CenterInfoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}
