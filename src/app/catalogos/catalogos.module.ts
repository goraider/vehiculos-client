
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogoMarcasRoutingModule } from './catalogos-routing.module';

import { MarcasModule } from './catalogo-marcas/marcas.module'
import { ColoresModule } from './catalogo-colores/colores.module'

import { CatalogosComponent } from './catalogos.component';

@NgModule({
  declarations: [CatalogosComponent],
  imports: [
    CommonModule,
    CatalogoMarcasRoutingModule
  ],
  exports: [
    MarcasModule,
    ColoresModule
  ]
})
export class CatalogosModule { }

