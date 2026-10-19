import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {
  private http = inject(HttpClient);
  // URL completa apuntando al servidor Django en puerto 8000
  private apiUrl = 'http://127.0.0.1:8000/api/v1/prestamos/';

  registrarSolicitud(solicitud: any): Observable<any> {
    return this.http.post(this.apiUrl, solicitud);
  }

  obtenerMisPrestamos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}