import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { getEspPaginatorIntl } from 'src/app/esp-paginator-intl';
import { MarcasRoutingModule } from './marcas-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { ListadoMarcasComponent } from './marcas/list/list.component';
import { MarcasFormComponent } from './marcas/form/form.component';


@NgModule({
  declarations: [
    ListadoMarcasComponent,
    MarcasFormComponent
  ],
  imports: [
    CommonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MarcasRoutingModule,
    SharedModule
  ],
  providers:[
    { provide: MAT_DATE_LOCALE, useValue: 'es-MX'},
    { provide: MatPaginatorIntl, useValue: getEspPaginatorIntl() }
    
  ]
})
export class MarcasModule { }
