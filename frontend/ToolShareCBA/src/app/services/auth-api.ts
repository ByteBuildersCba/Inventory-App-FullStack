
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RespuestaLogin {
  token: string;
  usuario: {
    id: number;
    email: string;
    nombre: string;
    rol: 'user' | 'admin';
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthApi {
  private readonly apiUrl =
    'http://127.0.0.1:8000/api/usuarios/login/';

  constructor(private http: HttpClient) {}

  iniciarSesion(
    email: string,
    password: string
  ): Observable<RespuestaLogin> {
    return this.http.post<RespuestaLogin>(
      this.apiUrl,
      { email, password }
    );
  }
}
