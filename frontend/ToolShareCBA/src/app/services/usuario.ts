import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Usuario {
  id?: number;
  nombre: string;
  email: string;
  password: string;
  rol: 'user' | 'admin';
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient) {}

  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  buscarPorCredenciales(
    email: string,
    password: string
  ): Observable<Usuario[]> {

    return this.http.get<Usuario[]>(
      `${this.apiUrl}?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
    );
  }

  crearUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(
      this.apiUrl,
      usuario
    );
  }
}