import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  public loginForm: FormGroup;

  constructor(
    private clienteS: ClientesService,
    private fb:FormBuilder,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.loginForm= this.fb.group({
      mail:['',[Validators.required, Validators.email]],
      passwordcli:['',[Validators.required]],
    });
  }

  login(){
    if(!this.loginForm.invalid){
      this.clienteS.login(this.loginForm.value).subscribe(resp => {
        this.router.navigate(['/cliente'],{queryParams: {id: resp.cliente.id_cliente}});
      })
    }
  }

}
