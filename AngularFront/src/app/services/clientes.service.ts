import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../models/cliente.model';
import { tap,map } from 'rxjs/operators';

const URL_Base = 'https://backendcore.onrender.com/api'

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(
    private http:HttpClient
  ) { }

  get headers(){
    return {headers:{
       'x-token': this.token
     }}
   }

   get token():string{
   
    return localStorage.getItem('token') || '';

  }

  guardarLocalStorage(token:string){
    localStorage.setItem('token',token);
  }


  cargarClientes(){

    const url = `${URL_Base}/clientes`;
    return this.http.get<Cliente[]>(url,this.headers);
  }


  eliminarCLiente(id:number,userID:number){
    const url = `${URL_Base}/clientes/${id}`;
    return this.http.delete(url,{
      headers:{
        'x-token': this.token
      },
      body:{
        'id':userID
      }
    });
  }

  crearCliente(formData: any){
    const url = `${URL_Base}/clientes`;
    const cliente: Cliente =formData;
    return this.http.post(url,cliente).pipe(
      tap((resp: any) => {
        this.guardarLocalStorage(resp.token);
      })
    );
  }

  actualizarCliente(cliente: Cliente,id:number){
    const url = `${URL_Base}/clientes/${cliente.id_cliente}`;
    return this.http.put(url,{
      'cliente':cliente,
      'id':id
    },this.headers);
  }

  login(formData: any){
    const cliente:Cliente =formData;
    const url = `${URL_Base}/login`;

    return this.http.post(url,cliente,this.headers).pipe(
      tap((resp: any) => {
        this.guardarLocalStorage(resp.token);
      })
    );
  }

  logout(){
    localStorage.removeItem('token');
  }

  admin(id:number){
    const url = `${URL_Base}/clientes/${id}`;
    return this.http.get(url,this.headers);
  }
}
