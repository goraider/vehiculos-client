import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth/auth.guard';

import { ListadoColoresComponent } from './colores/list/list-colores.component';


const routes: Routes = [
  { path: 'catalogos/colores', component: ListadoColoresComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColoresRoutingModule { }
