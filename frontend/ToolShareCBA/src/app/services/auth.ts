import { Injectable } from '@angular/core';

export interface UsuarioAutenticado {
  email: string;
  rol: 'user' | 'admin';
}

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private usuarioActual: UsuarioAutenticado | null = null;

  iniciarSesion(usuario: UsuarioAutenticado): void {
    this.usuarioActual = usuario;
  }

  obtenerUsuario(): UsuarioAutenticado | null {
    return this.usuarioActual;
  }

  obtenerRol(): 'user' | 'admin' | null {
    return this.usuarioActual?.rol ?? null;
  }

  cerrarSesion(): void {
    this.usuarioActual = null;
  }
}