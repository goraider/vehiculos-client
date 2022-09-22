import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { VehiculosRoutingModule } from './vehiculos-routing.module';

import { MatPaginatorIntl } from '@angular/material/paginator';
import { getEspPaginatorIntl } from 'src/app/esp-paginator-intl';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';

import { ListVehiculosComponent } from './list-vehiculos/list-vehiculos.component';
import { FormVehiculoComponent } from './form-vehiculos/form-vehiculos.component';
//import { ConfirmActionDialogComponent } from '../../utils/confirm-action-dialog/confirm-action-dialog.component';


@NgModule({
  declarations: [ListVehiculosComponent, FormVehiculoComponent],
  imports: [
    CommonModule,
    VehiculosRoutingModule,
    SharedModule,
    MatNativeDateModule,
    MatDatepickerModule,
  ],
  entryComponents:[
    FormVehiculoComponent,
  ],
  providers:[
    { provide: MAT_DATE_LOCALE, useValue: 'es-MX'},
    { provide: MatPaginatorIntl, useValue: getEspPaginatorIntl() }
  ]
})
export class VehiculosModule { }
