import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Contacto {
  id?: number | string;
  nombre: string;
  email: string;
  mensaje: string;
  fecha?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  private apiUrl = 'http://localhost:3000/contactos';

  constructor(private http: HttpClient) {}

  enviarContacto(contacto: Contacto): Observable<Contacto> {
    return this.http.post<Contacto>(this.apiUrl, contacto);
  }
}