import { Component, OnInit } from '@angular/core';

import { Cliente } from '../../models/cliente.model';
import { ClientesService } from '../../services/clientes.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/models/producto.model';
import { ProductoService } from 'src/app/services/producto.service';
import { TemporadasService } from 'src/app/services/temporadas.service';
import { Temporada } from 'src/app/models/temporada';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  public listaTemporadas:Temporada[]=[];
  public listaProductos:any[]=[];
  public listaPlatos:any[]=[];
  public listaProductosPlato:any[]=[];
  public temporadaForm: FormGroup;
  public actualizarProductoForm: FormGroup;
  public crearProductoForm: FormGroup;
  public crearPlatoForm: FormGroup;
  private objetoAuxUpdateProduct={};
  private idTemporadaAux:number=1;
  private idProductoAux:number=1;




  constructor(
    private clienteS: ClientesService,
    private fb:FormBuilder,
    private router:Router,
    private route:ActivatedRoute,
    private productoS:ProductoService,
    private tempSrv:TemporadasService
  ){}

  ngOnInit(): void {
    this.cargarPagina();
  }

  cargarPagina(){
    this.cargarTemporadas();
    this.cargarFormularios();
    this.caragarProductosPlatos(1);
  }

  cargarFormularios(){
    this.listaProductosPlato=[];
    this.temporadaForm= this.fb.group({
      nombre:['', Validators.required],
      fechaInicio:['',[Validators.required]],
      fechaFin:['',[Validators.required]],
    });
    this.crearProductoForm= this.fb.group({
      nombre:['', Validators.required],
      descripcion:['',[Validators.required]],
      precio:[0,[Validators.required]],
    });

    this.actualizarProductoForm= this.fb.group({
      nombre:['', Validators.required],
      descripcion:['',[Validators.required]],
      precio:[0,[Validators.required]],
      temporada:[{value:"",disabled:true},[Validators.required]],
    });
    this.crearPlatoForm= this.fb.group({
      nombre:['', Validators.required],
      descripcion:['',[Validators.required]]
    });
  }

  
  cargarTemporadas(){
    this.listaTemporadas=[];
    this.tempSrv.cargarTemporadas().subscribe((res:any)=>{
      this.listaTemporadas=res.temporadas;
    })
  }
  
  caragarProductosPlatos(valor){
    this.listaProductos=[];
    this.listaPlatos=[];

    this.productoS.cargarProductosPorTemporda(valor).subscribe((res:any)=>{
      this.listaProductos=res.productos;
    })

    this.productoS.cargarPlatosPorTemporda(valor).subscribe((res:any)=>{
      this.listaPlatos=res.platos;

    })

    this.idTemporadaAux=valor;
  }


  agregarOeliminarProductoPlato(IdProducto:number){
    const validacion = this.listaProductosPlato.find(prod =>{
      return prod.IdProducto === IdProducto; 
    })
    if(validacion === undefined){
      this.listaProductosPlato.push({IdProducto,IdPlato:0});
    }else{
        const newArr=this.listaProductosPlato.filter(prod =>{ prod.IdProducto !== IdProducto})
        this.listaProductosPlato = newArr;
    }

  }

  crearTemporada(){
    if(this.temporadaForm.invalid){
      return;
    }
    
    let nombre =this.temporadaForm.controls['nombre'].value;
    let mesInicio=this.temporadaForm.controls['fechaInicio'].value.split('-')[1];
    let diaInicio=this.temporadaForm.controls['fechaInicio'].value.split('-')[2];
    let mesFin=this.temporadaForm.controls['fechaFin'].value.split('-')[1];
    let diaFin=this.temporadaForm.controls['fechaFin'].value.split('-')[2];

    let temporada:Temporada={nombre,mesFin,mesInicio,diaFin,diaInicio}

    this.tempSrv.crearTemporadas(temporada).subscribe((res:any)=>{
        this.cargarPagina();
    })

  }


  crearProducto(){
    if(this.crearProductoForm.invalid){
      return;
    }

    let nombre =this.crearProductoForm.controls['nombre'].value;
    let descripcion=this.crearProductoForm.controls['descripcion'].value;
    let precio=this.crearProductoForm.controls['precio'].value;

    let producto:Producto = {nombre,descripcion};

    this.productoS.crearProducto(producto,precio).subscribe(res =>{
      this.cargarPagina();
    })

  }

  actualizarFormUpdateProducto(idProducto:number,precio:number,nombre:string,descripcion:string){

    this.actualizarProductoForm.setValue({
      nombre,
      descripcion,
      precio,
      temporada:this.idTemporadaAux
  });
  this.idProductoAux=idProducto;

  }

  actualizarPrecioProducto(){
    if(this.actualizarProductoForm.invalid){
      return;
    }
    let precio=this.actualizarProductoForm.controls['precio'].value;
    let nombre=this.actualizarProductoForm.controls['nombre'].value;
    let descripcion=this.actualizarProductoForm.controls['descripcion'].value;
    const prod:Producto = {nombre,descripcion};

    this.productoS.actualizarPrecioProducto(prod,this.idTemporadaAux,precio,this.idProductoAux).subscribe(()=>{
      this.cargarPagina();
    })
  }
  
  crearPlato(){
    if(this.crearPlatoForm.invalid || this.listaProductosPlato.length == 0){
      return;
    }

    let nombre =this.crearPlatoForm.controls['nombre'].value;
    let descripcion=this.crearPlatoForm.controls['descripcion'].value;


    this.productoS.crearPlato(nombre,descripcion,this.listaProductosPlato).subscribe(()=>{
      this.cargarPagina();
    });
  }



}
