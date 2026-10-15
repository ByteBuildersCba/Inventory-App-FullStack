import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {
  private http = inject(HttpClient);
  // La ruta donde json-server guardará el array de solicitudes
  private apiUrl = 'http://localhost:3000/prestamos';

  registrarSolicitud(solicitud: any) {
    return this.http.post(this.apiUrl, solicitud);
  }
}