
import { Injectable, signal } from '@angular/core';

export interface UsuarioAutenticado {
  id: number;
  email: string;
  nombre: string;
  rol: 'user' | 'admin';
}

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private usuarioActual = signal<UsuarioAutenticado | null>(null);

  iniciarSesion(usuario: UsuarioAutenticado, token: string): void {
    sessionStorage.setItem('token', token);
    this.usuarioActual.set(usuario);
  }

  obtenerUsuario(): UsuarioAutenticado | null {
    return this.usuarioActual();
  }

  obtenerRol(): 'user' | 'admin' | null {
    return this.usuarioActual()?.rol ?? null;
  }

  obtenerToken(): string | null {
    return sessionStorage.getItem('token');
  }

  cerrarSesion(): void {
    sessionStorage.removeItem('token');
    this.usuarioActual.set(null);
  }
}
