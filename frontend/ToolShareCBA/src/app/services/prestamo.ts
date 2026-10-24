import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth } from './auth';

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {
  private http = inject(HttpClient);
  private auth = inject(Auth);
  // URL completa apuntando al servidor Django en puerto 8000
  private apiUrl = 'http://127.0.0.1:8000/api/v1/prestamos/';

  registrarSolicitud(solicitud: any) {
  const token = this.auth.obtenerToken();
  return this.http.post(this.apiUrl, solicitud, {
    headers: { Authorization: `Token ${token}` }
  });
  }

  obtenerMisPrestamos(): Observable<any> {
  const token = this.auth.obtenerToken();

  return this.http.get(this.apiUrl, {
    headers: { Authorization: `Token ${token}` }
  });
}
}