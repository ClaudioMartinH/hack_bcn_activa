import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [CommonModule]
})
export class HeaderComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    const navbar = document.getElementById('navbar');

    if (navbar) {
      setTimeout(() => {
        // Cambia la opacidad del navbar para hacer que aparezca
        navbar.classList.remove('opacity-0');
        navbar.classList.add('opacity-100');
      }, 500); // Aparece después de 500ms (puedes ajustar este tiempo)
    }
  }
}
