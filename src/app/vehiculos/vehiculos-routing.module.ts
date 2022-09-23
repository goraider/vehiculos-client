import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';

import { ListVehiculosComponent } from './list-vehiculos/list-vehiculos.component';
import { FormVehiculoComponent } from './form-vehiculos/form-vehiculos.component';

const routes: Routes = [
  { path: 'vehiculos', component: ListVehiculosComponent, canActivate: [AuthGuard] },
  { path: 'vehiculos/editar/:id', component: FormVehiculoComponent, canActivate: [AuthGuard] },
  { path: 'vehiculos/nuevo', component: FormVehiculoComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiculosRoutingModule { }
