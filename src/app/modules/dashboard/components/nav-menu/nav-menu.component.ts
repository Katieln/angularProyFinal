import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  standalone: false,
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.scss'
})
export class NavMenuComponent {

  constructor(private router: Router) {}

  logout(): void{
    localStorage.removeItem('token')

    this.router.navigate(['auth', 'login'])
  }
}
