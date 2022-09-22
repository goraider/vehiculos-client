import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';

import { ListVehiculosComponent } from './list-vehiculos/list-vehiculos.component';

const routes: Routes = [
  { path: 'vehiculos', component: ListVehiculosComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiculosRoutingModule { }
