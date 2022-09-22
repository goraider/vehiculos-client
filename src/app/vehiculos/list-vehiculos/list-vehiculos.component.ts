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

  authClues: User;
  isLoading: boolean = false;
  searchQuery: string = '';
  mediaSize: any;

  pageEvent: PageEvent;
  resultsLength: number = 0;
  currentPage: number = 0;

  displayedColumns: string[] = ['id','nombre', 'es_ambulatorio', 'opciones'];
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

    const zises = new Map([
      ['xs', 1]
    ]);

    this.mediaObserver.asObservable().pipe(
     map((change: MediaChange[]) => {
        console.log(change[0]);
        this.mediaSize = zises.get(change[0].mqAlias);
     })
    );
  


    this.authClues = this.authService.getUserData();
    console.log(this.authClues);
    this.loadServiciosData(null);
  }

  public loadServiciosData(event?:PageEvent){
    this.isLoading = true;
    let params:any;
    if(!event){
      params = { page: 1, per_page: 20, clues: this.authClues ? this.authClues.id : '' }
    }else{
      params = {
        page: event.pageIndex+1,
        per_page: event.pageSize,
        clues: this.authClues ? this.authClues.id : '' 
      };
    }

    params.query = this.searchQuery;
    params.show_hidden = true;

    this.vehiculosService.getServicioList(params).subscribe(
      response =>{
        if(response.error) {
          let errorMessage = response.error.message;
          this.sharedService.showSnackBar(errorMessage, null, 3000);
        } else {
          if(response.catalogo_servicios.total > 0){
            this.dataSource = response.catalogo_servicios.data;
            this.resultsLength = response.catalogo_servicios.total;
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
    this.loadServiciosData(null);
  }

  openDialogForm(id:number = 0){

    let configDialog = {};

    if(this.mediaSize == 'xs'){
      configDialog = {
        maxWidth: '100vw',
        maxHeight: '100vh',
        height: '100%',
        width: '100%',
        data:{id: id, scSize:this.mediaSize}
      };
    }else{
      configDialog = {
        width: '99%',
        maxHeight: '90vh',
        height: '500px',
        data:{id: id}
      }
    }

    const dialogRef = this.dialog.open(FormVehiculoComponent, configDialog);

    dialogRef.afterClosed().subscribe(valid => {
      if(valid){
        console.log('Aceptar');
      }else{
        console.log('Cancelar');
      }
    });

  }

  confirmDeleteServicio(id:number = 0){
    const dialogRef = this.dialog.open(ConfirmActionDialogComponent, {
      width: '500px',
      data: {dialogTitle:'Eliminar Servicio',dialogMessage:'Esta seguro de eliminar este Servicio?',btnColor:'warn',btnText:'Eliminar'}
    });

    dialogRef.afterClosed().subscribe(reponse => {
      if(reponse){
        this.vehiculosService.deleteServicio(id).subscribe(
          response => {
            console.log(response);
            this.loadServiciosData(null);
          }
        );
      }
    });
  }

}
