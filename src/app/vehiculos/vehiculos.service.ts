import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
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

  getVehiculosList(payload):Observable<any> {
    return this.http.get<any>(this.url+'/listado-vehiculos',{params: payload}).pipe(
      map( response => {
        return response;
      })
    );
  }

  getAllVehiculo():Observable<any> {
    return this.http.get<any>(this.url,{}).pipe(
      map( response => {
        return response;
      })
    );
  }

  getVehiculo(id) {
    return this.http.put<any>(this.url+'/obtener-vehiculo/'+id,{}).pipe(
      map( (response: any) => {
        return response;
      }
    ));
  }

  updateVehiculo(id,payload) {
    return this.http.put<any | string>(this.url+'/actualizar-vehiculo/'+id,payload).pipe(
      map( (response) => {
        return response;
      }
    ));
  }

  createVehiculo(payload) {
    return this.http.post<any>(this.url+'/crear-vehiculo',payload).pipe(
      map( (response) => {
        return response;
      }
    ));
  }

  deleteVehiculo(id) {
    return this.http.delete<any>(this.url+'/'+id,{}).pipe(
      map( (response) => {
        return response;
      }
    ));
  }
}
