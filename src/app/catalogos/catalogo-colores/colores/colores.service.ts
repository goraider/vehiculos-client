import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ColoresService {

  url = `${environment.base_url}colores`;

  constructor(private http: HttpClient) { }

  getColoresList(payload):Observable<any> {
    return this.http.get<any>(this.url+'/listado-colores',{params: payload}).pipe(
      map( response => {
        return response;
      })
    );
  }

  getColor(id) {
    return this.http.put<any>(this.url+'/obtener-color/'+id,{}).pipe(
      map( (response: any) => {
        return response;
      }
    ));
  }

  updateColor(id,payload) {
    return this.http.put<any>(this.url+'/actualizar-color/'+id,payload).pipe(
      map( (response) => {
        return response;
      }
    ));
  }

  createColor(payload) {
    return this.http.post<any>(this.url+'/crear-color',payload).pipe(
      map( (response) => {
        return response;
      }
    ));
  }

  deleteColor(id) {
    return this.http.delete<any>(this.url+'/eliminar-color/'+id,{}).pipe(
      map( (response) => {
        return response;
      }
    ));
  }
}
