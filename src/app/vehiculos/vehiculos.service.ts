import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VehiculosService {

  url                   = `${environment.base_url}vehiculos`;
  url_obtener_catalogos = `${environment.base_url}catalogos/obtener-catalogos`;

  constructor(private http: HttpClient) { }

  getCatalogs(payload) {
    return this.http.post<any>(this.url_obtener_catalogos,{params: payload}).pipe(
      map( (response) => {
        return response;
      }
    ));
  }

  getServicioList(payload):Observable<any> {
    return this.http.get<any>(this.url,{params: payload}).pipe(
      map( response => {
        return response;
      })
    );
  }

  getAllServicio():Observable<any> {
    return this.http.get<any>(this.url,{}).pipe(
      map( response => {
        return response;
      })
    );
  }

  getServicio(id) {
    return this.http.get<any>(this.url+'/'+id,{}).pipe(
      map( (response: any) => {
        return response;
      }
    ));
  }

  updateServicio(id,payload) {
    return this.http.put<any>(this.url+'/'+id,payload).pipe(
      map( (response) => {
        return response;
      }
    ));
  }

  createServicio(payload) {
    return this.http.post<any>(this.url,payload).pipe(
      map( (response) => {
        return response;
      }
    ));
  }

  deleteServicio(id) {
    return this.http.delete<any>(this.url+'/'+id,{}).pipe(
      map( (response) => {
        return response;
      }
    ));
  }
}
