import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { getEspPaginatorIntl } from 'src/app/esp-paginator-intl';
import { ColoresRoutingModule } from './colores-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { ListadoColoresComponent } from './colores/list/list-colores.component';
import { ColoresFormComponent } from './colores/form/form-colores.component';


@NgModule({
  declarations: [
    ListadoColoresComponent,
    ColoresFormComponent
  ],
  imports: [
    CommonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    ColoresRoutingModule,
    SharedModule
  ],
  providers:[
    { provide: MAT_DATE_LOCALE, useValue: 'es-MX'},
    { provide: MatPaginatorIntl, useValue: getEspPaginatorIntl() }
    
  ]
})
export class ColoresModule { }
