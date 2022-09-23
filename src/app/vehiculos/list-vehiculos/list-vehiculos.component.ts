import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { VehiculosService } from '../vehiculos.service';
import { FormVehiculoComponent } from '../form-vehiculos/form-vehiculos.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../auth/models/user';
import { ConfirmActionDialogComponent } from '../../utils/confirm-action-dialog/confirm-action-dialog.component';
import { MatTable } from '@angular/material/table';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
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

  displayedColumns: string[] = ['marca', 'modelo', 'color', 'fecha_ingreso', 'estado', 'asignado', 'opciones'];
  dataSource: any = [];

  constructor(
    private sharedService: SharedService,
    private authService: AuthService,
    private vehiculosService: VehiculosService,
    public mediaObserver: MediaObserver,
    public dialog: MatDialog
  ) { }

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatTable,{static:false}) serviciosTable: MatTable<any>;

  ngOnInit() {
  
    this.authUser = this.authService.getUserData();
    this.loadVehiculosData(null);
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

    params.query = this.searchQuery;
    params.show_hidden = true;

    this.vehiculosService.getVehiculosList(params).subscribe(
      response =>{
        if(response.error) {
          let errorMessage = response.error.message;
          this.sharedService.showSnackBar(errorMessage, null, 3000);
        } else {
          if(response.total > 0){
            this.dataSource = response.vehiculos;
            this.resultsLength = response.total;
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

    dialogRef.afterClosed().subscribe(reponse => {
      if(reponse){
        this.vehiculosService.deleteVehiculo(id).subscribe(
          response => {
            console.log(response);
            this.loadVehiculosData(null);
          }
        );
      }
    });
  }

}
