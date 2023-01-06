import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})
export class CrearClienteComponent implements OnInit {

  
  public createForm: FormGroup;

  constructor(
    private clienteS: ClientesService,
    private fb:FormBuilder,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.createForm= this.fb.group({
      nombre:['', Validators.required],
      mail:['',[Validators.required, Validators.email]],
      password:['',[Validators.required]]

    });
  }

  crearCliente(){
    if(this.createForm.invalid){
      return;
    }


    this.clienteS.crearCliente(this.createForm.value).subscribe(() => {
      this.router.navigateByUrl('/cliente');
    });
  }

}
