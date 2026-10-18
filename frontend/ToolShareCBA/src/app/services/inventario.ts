
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class InventarioService {
    private apiUrl = 'http://127.0.0.1:8000/api/v1/herramientas/';
constructor(private http: HttpClient){}
obtenerHerramientas(): Observable<any>{
    return this.http.get(this.apiUrl);
}
guardarHerramienta(herramientas:any): Observable <any>{
    return this.http.post(this.apiUrl, herramientas);
}
}

