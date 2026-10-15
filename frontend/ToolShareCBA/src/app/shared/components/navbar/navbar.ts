import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../../services/auth';

@Component({
  imports: [RouterLink],
  selector: 'app-navbar',
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
  standalone: true,
})
export class Navbar {

  constructor(
    private auth: Auth,
    private router: Router
  ) {}

  get esAdmin(): boolean {
    return this.auth.obtenerRol() === 'admin';
  }

  get estaLogueado(): boolean {
    return this.auth.obtenerUsuario() !== null;
  }

  cerrarSesion(): void {
    this.auth.cerrarSesion();
    this.router.navigate(['/home']);
  }

}