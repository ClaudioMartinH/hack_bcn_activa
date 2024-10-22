import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { DistrictService } from '../../services/state/district.service';


@Component({
  selector: 'app-side-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './side-info.component.html',
  styleUrl: './side-info.component.scss'
})
export class SideInfoComponent {

  public sidebarVisible: boolean = false;
  public districtState = inject(DistrictService);

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  isMobile(): boolean {
    return window.innerWidth < 768;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (!this.isMobile()) {
      this.sidebarVisible = true;
    }
  }

}
