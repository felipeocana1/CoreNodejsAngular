import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Temporada } from '../models/temporada';


const URL_Base = 'http://localhost:3000/api'

@Injectable({
  providedIn: 'root'
})
export class TemporadasService {

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

  cargarTemporadas(){
    const url = `${URL_Base}/temporada`;
    return this.http.get(url,this.headers);
  }

  crearTemporadas(temporada:Temporada){
    const url = `${URL_Base}/temporada`;
    return this.http.post(url,{
      "Temporada":temporada
    },this.headers);
  }

}
