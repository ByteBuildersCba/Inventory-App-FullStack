import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth } from './auth';

@Injectable({
  providedIn: 'root'
})
export class AdminPrestamoService {
  private http = inject(HttpClient);
  private auth = inject(Auth);

  private apiUrl = 'http://127.0.0.1:8000/api/v1/prestamos/';

  obtenerTodasLasSolicitudes(): Observable<any> {
    const token = this.auth.obtenerToken();
    return this.http.get(this.apiUrl + 'admin/', {
      headers: { Authorization: `Token ${token}` }
    });
  }
  actualizarEstadoPrestamo(id: number, accion: string): Observable<any> {
    const token = this.auth.obtenerToken();
    
    return this.http.patch(this.apiUrl + id + '/estado/', { accion: accion }, {
      headers: { Authorization: `Token ${token}` }
    });
  }
}