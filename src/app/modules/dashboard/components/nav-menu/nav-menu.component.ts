import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-nav-menu',
  standalone: false,
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.scss'
})
export class NavMenuComponent {


  linkItems: { label: string; routerLink: string }[] = [
    {
      label: 'Inicio',
      routerLink: 'home'
    },
    {
      label: 'Estudiantes',
      routerLink: 'students'
    },
    {
      label: 'Cursos',
      routerLink: 'courses'
    },
    {
      label: 'Profesores',
      routerLink: 'teachers'
    },
    {
      label: 'Usuarios',
      routerLink: 'users'
    },
    {
      label: 'Inscripciones',
      routerLink: 'enrollments'
    }
  ];
  
  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}
