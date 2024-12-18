import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MenubarModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  items: MenuItem[] = [];

  ngOnInit() {
      this.items = [
          {
              label: 'Home',
              routerLink: '/home'
          },
          {
              label: 'Products',
              routerLink: '/products'
          }
      ]
  }
}
