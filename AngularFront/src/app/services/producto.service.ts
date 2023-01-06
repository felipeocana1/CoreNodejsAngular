import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../models/producto.model';

const URL_Base = 'http://localhost:3000/api'

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

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


  cargarProductos(id:number){
    const url = `${URL_Base}/producto/${id}`;
    return this.http.get(url,this.headers);
  }

  cargarProductosPorTemporda(id:number){
    const url = `${URL_Base}/producto/temporada/${id}`;
    return this.http.get<Producto[]>(url,this.headers);
  }

  crearProducto(producto:Producto,precio:number){
    const url = `${URL_Base}/producto`;

    return this.http.post(url,{
      producto,
      "temporada":{
        precio
      }
    },this.headers);
  }

  actualizarProducto(prod: Producto,id:number){
    const url = `${URL_Base}/producto/${prod.id_producto}`;
    return this.http.put(url,{
      'producto':prod,
      'id':id
    },this.headers);
  }

  eliminarProducto(id:number,userID:number){
    const url = `${URL_Base}/producto/${id}`;
    return this.http.delete(url,{
      headers:{
        'x-token': this.token
      },
      body:{
        'id':userID
      }
    });
  }


  actualizarPrecioProducto(prod:Producto,IdTemporada:number,precio:number,idProd:number){
    const url = `${URL_Base}/producto/${idProd}`;

    return this.http.put(url,{
      producto:prod,
      temporada:{
        IdTemporada,
        precio
      }
    },this.headers);
  }

  crearPlato(nombre:string,descripcion:string,productos:any[]){
    const url = `http://localhost:3000/api/plato`;

    return this.http.post(url,{
      nombre,
      descripcion,
      productos
    },this.headers);
  }

  cargarPlatosPorTemporda(id:number){
    const url = `${URL_Base}/plato/temporada/${id}`;
    return this.http.get(url,this.headers);
  }

}
