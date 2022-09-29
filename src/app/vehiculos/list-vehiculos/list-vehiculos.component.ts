import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from '../../shared/shared.service';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { VehiculosService } from '../vehiculos.service';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../auth/models/user';
import { ConfirmActionDialogComponent } from '../../utils/confirm-action-dialog/confirm-action-dialog.component';
import { MatTable } from '@angular/material/table';

import { MediaObserver } from '@angular/flex-layout';
import { DatePipe } from '@angular/common';
import { map } from 'rxjs/operators';

@Component({
  selector: 'list-vehicluos',
  templateUrl: './list-vehiculos.component.html',
  styleUrls: ['./list-vehiculos.component.css']
})
export class ListVehiculosComponent implements OnInit {

  authUser: User;
  isLoading: boolean = false;
  searchQuery: string = '';
  mediaSize: any;

  pageEvent: PageEvent;
  resultsLength: number = 0;
  currentPage: number = 0;

  filtros: any = {
    marcas:false,
    modelo:'',
    colores:false,
    estado:false,
    asignado:false,
    usuario:false,
    rango_fechas:{inicio:null, fin:null},
  };

  filtrosCatalogos: any = {
    marcas:[],
    colores:[]
  };

  displayedColumns: string[] = ['marca', 'modelo', 'color', 'fecha_ingreso', 'estado', 'asignado', 'opciones'];
  dataSource: any = [];

  constructor(
    private sharedService: SharedService,
    private authService: AuthService,
    private vehiculosService: VehiculosService,
    public mediaObserver: MediaObserver,
    public dialog: MatDialog,
    private datepipe: DatePipe,
  ) { }

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatTable,{static:false}) serviciosTable: MatTable<any>;

  ngOnInit() {
  
    this.authUser = this.authService.getUserData();
    this.loadVehiculosData(null);
    this.catalogFilter();
  }

  public catalogFilter(){

    this.isLoading = true;    
    
    let carga_catalogos = [
      {nombre:"marcas"},
      {nombre:"colores"},
    ];

    this.vehiculosService.getCatalogs(carga_catalogos).subscribe(
      response => {
        this.isLoading = true;

        if(response.error) {
          
          let errorMessage = response.msg;
          this.sharedService.showSnackBar(errorMessage, 'Cerrar', 3000);

        } else {

          this.filtrosCatalogos.marcas = response.data.marcas;
          this.filtrosCatalogos.colores = response.data.colores;
        
        }
        this.isLoading = false; 
      } 
    );

  }

  public loadVehiculosData(event?:PageEvent){

    this.isLoading = true;
    let params:any;
    if(!event){
      params = { page: 1, per_page: 20}
    }else{
      params = {
        page: event.pageIndex+1,
        per_page: event.pageSize,      
      };
    }

    if(this.filtros.marcas){
      params.marca = this.filtros.marcas;
    }

    if(this.filtros.modelo){
      params.modelo = this.filtros.modelo;
    }

    if(this.filtros.colores){
      params.color = this.filtros.colores;
    }
    if(this.filtros.estado){
      params.estado = this.filtros.estado;
    }
    if(this.filtros.asignado){
      params.asignado = this.filtros.asignado;
    }
    if(this.filtros.usuario){
      params.usuario = this.filtros.usuario;
    }

    if(this.filtros.rango_fechas.inicio){

      params.fecha_inicio = this.datepipe.transform(this.filtros.rango_fechas.inicio, 'yyyy-MM-dd');
      params.fecha_fin = this.datepipe.transform(this.filtros.rango_fechas.fin, 'yyyy-MM-dd');

    }
    
    this.vehiculosService.getVehiculosList(params).subscribe(
      response =>{
        if(response.error) {
          let errorMessage = response.error.message;
          this.sharedService.showSnackBar(errorMessage, null, 3000);
        } else {
          if(response.total > 0){
            this.dataSource = response.data;
            this.resultsLength = response.total;
            //this.sharedService.showSnackBar(response?.msg, 'Cerrar', 5000);
          }else{
            this.dataSource = [];
            this.resultsLength = 0;
          }
        }
        this.isLoading = false;
      },
      errorResponse =>{
        var errorMessage = "Ocurrió un error.";
        if(errorResponse.status == 409){
          errorMessage = errorResponse.error.message;
        }
        this.sharedService.showSnackBar(errorMessage, null, 3000);
        this.isLoading = false;
      }
    );
    return event;
  }

  applyFilter(){
    this.paginator.pageIndex = 0;
    this.loadVehiculosData(null);
  }

  confirmDeleteVehiculo(id:number = 0){
      const dialogRef = this.dialog.open(ConfirmActionDialogComponent, {
        width: '500px',
        data: {dialogTitle:'Eliminar Vehículo',dialogMessage:'¿Está seguro de eliminar el Vehículo?',btnColor:'warn',btnText:'Eliminar'}
      });

      dialogRef.afterClosed().subscribe(
        reponse => {
          if(reponse){
              this.vehiculosService.deleteVehiculo(id).subscribe({
                next: (response) => {
                  
                  console.log(response,"completado");
                  this.sharedService.showSnackBar(response?.msg, 'Cerrar', 5000);
                  this.loadVehiculosData(null);
                },

                error(error: HttpErrorResponse) {
                  console.log(error.error);

                  let errorMessage = "Ocurrió un error.";
                  if(error.status === 401){
                    errorMessage = error.error?.msg;
                    this.sharedService.showSnackBar(errorMessage, 'Cerrar', 5000);
                  }
                  
                  
                }
              });
          }

      });
  }
    
    // if(reponse){
    //   this.vehiculosService.deleteVehiculo(id).subscribe((response) => {
    //       this.sharedService.showSnackBar(response?.msg, 'Cerrar', 5000);
    //       this.loadVehiculosData(null);
    //     },HttpErrorResponse => {
    //       let errorMessage = "Ocurrió un error.";
    //       if(HttpErrorResponse.status == 403){
    //         errorMessage = HttpErrorResponse.error.msg;
    //       }
    //       this.sharedService.showSnackBar(errorMessage, 'Cerrar', 5000);
    //       this.isLoading = false;
    //     }
    //   );

    // }
    limpiarFiltro(){
    this.filtros.marca = false;
    this.filtros.modelo = '';
    this.filtros.color = false;
    this.filtros.estado = false;
    this.filtros.asignado = false;
    this.filtros.usuario = false;
    this.filtros.rango_fechas = {inicio:null, fin:null};

    this.aplicarFiltro();
  }

  checarFechasFiltro(){
    if(this.filtros.rango_fechas.inicio && !this.filtros.rango_fechas.fin){
      this.filtros.rango_fechas.fin = this.filtros.rango_fechas.inicio;
    }
    this.aplicarFiltro();
  }

  aplicarFiltro(){
    this.loadVehiculosData();
    //console.log(this.filtros);
  }

  cleanSearch(){
    this.filtros.modelo = '';
    this.limpiarFiltro();
  }

}
