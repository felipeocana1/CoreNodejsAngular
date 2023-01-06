import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearClienteComponent } from './pages/auth/crear-cliente/crear-cliente.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { ClientesComponent } from './pages/clientes/clientes.component';

const routes: Routes = [

  {path:'', redirectTo:'/cliente', pathMatch:'full'},
  {path:'cliente', component: ClientesComponent},
  {path:'login', component: LoginComponent},
  {path:'register', component: CrearClienteComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
