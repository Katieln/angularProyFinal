import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

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
      label: 'Cerrar Sesion',
      routerLink: 'home'
    },
  ];
  
  constructor(private router: Router) {}

  logout(): void{
    localStorage.removeItem('token')

    this.router.navigate(['auth', 'login'])
  }
}
