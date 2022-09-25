import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { CatalogosComponent } from './catalogos.component';

const routes: Routes = [
  { path: 'catalogos', component: CatalogosComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogoMarcasRoutingModule { }
