
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class InventarioService {
    private apiUrl = 'http://localhost:3000/herramientas';
constructor(private http: HttpClient){}
obtenerHerramientas(): Observable<any>{
    return this.http.get(this.apiUrl);
}
guardarHerramienta(herramientas:any): Observable <any>{
    return this.http.post(this.apiUrl, herramientas);
}
}

