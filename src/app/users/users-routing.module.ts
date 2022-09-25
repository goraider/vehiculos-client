import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';
import { FormComponent } from './form/form.component';

import { AuthGuard } from '../auth/auth.guard';
import { GuessGuard } from '../auth/guess.guard';

const routes: Routes = [
  { path: 'usuarios', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'usuarios/editar/:id', component: FormComponent, canActivate: [AuthGuard] },
  { path: 'usuarios/nuevo', component: FormComponent, canActivate: [GuessGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
