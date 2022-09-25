import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url = `${environment.base_url}signin`;


  constructor(private http: HttpClient) { }




  getUserList():Observable<any> {
    return this.http.get<any>(this.url+'/lista-usuarios').pipe(
      map( response => {
        return response;
      })
    );
  }

  updateUser(payload,id) {
    return this.http.put<any>(this.url+'/actualizar-usuario/'+id,payload).pipe(
      map( (response) => {
        return response;
      }
    ));
  }

  createUser(payload) {
    return this.http.post<any>(this.url+'/'+'crear-usuario',payload).pipe(
      map( (response) => {
        return response;
      }
    ));
  }

  deleteUser(id){
    return this.http.delete<any>(this.url+'/'+id,{}).pipe(
      map( (response: any) => {
        return response;
      }
    ));
  }
}
