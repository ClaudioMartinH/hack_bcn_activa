import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';


@Component({
  selector: 'app-side-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './side-info.component.html',
  styleUrl: './side-info.component.scss'
})
export class SideInfoComponent {

  sidebarVisible: boolean = false;

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  isMobile(): boolean {
    return window.innerWidth < 768;
  }

  // Escuchar cambios en el tamaño de la pantalla para ajustar el sidebar si cambia el viewport
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (!this.isMobile()) {
      this.sidebarVisible = true;
    }
  }

}
