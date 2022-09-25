import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MarcasService {

  url = `${environment.base_url}marcas`;

  constructor(private http: HttpClient) { }

  getMarcasList(payload):Observable<any> {
    return this.http.get<any>(this.url+'/listado-marcas',{params: payload}).pipe(
      map( response => {
        return response;
      })
    );
  }

  getMarca(id) {
    return this.http.put<any>(this.url+'/obtener-marca/'+id,{}).pipe(
      map( (response: any) => {
        return response;
      }
    ));
  }

  updateMarca(id,payload) {
    return this.http.put<any>(this.url+'/actualizar-marca/'+id,payload).pipe(
      map( (response) => {
        return response;
      }
    ));
  }

  createMarca(payload) {
    return this.http.post<any>(this.url+'/crear-marca',payload).pipe(
      map( (response) => {
        return response;
      }
    ));
  }

  deleteMarca(id) {
    return this.http.delete<any>(this.url+'/eliminar-marca/'+id,{}).pipe(
      map( (response) => {
        return response;
      }
    ));
  }
}
