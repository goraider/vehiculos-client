import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from '../../../../shared/shared.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MarcasService } from '../marcas.service';
import { MarcasFormComponent } from '../form/form.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../../auth/auth.service';

import { ConfirmActionDialogComponent } from '../../../../utils/confirm-action-dialog/confirm-action-dialog.component';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'marcas-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListadoMarcasComponent implements OnInit {

  isLoading: boolean = false;
  searchQuery: string = '';

  pageEvent: PageEvent;
  resultsLength: number = 0;
  currentPage: number = 0;

  displayedColumns: string[] = ['id','nombre', 'opciones'];
  dataSource: any = [];

  constructor(
    private sharedService: SharedService,
    private authService: AuthService,
    private marcasService: MarcasService,
    public dialog: MatDialog
  ) { }

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatTable,{static:false}) serviciosTable: MatTable<any>;

  ngOnInit() {

    this.loadMarcasData(null);
  }

  public loadMarcasData(event?:PageEvent){
    this.isLoading = true;
    let params:any;
    if(!event){
      params = { page: 1, per_page: 20, }
    }else{
      params = {
        page: event.pageIndex+1,
        per_page: event.pageSize,
      };
    }

    params.query = this.searchQuery;

    this.marcasService.getMarcasList(params).subscribe(
      response =>{
        if(response.error) {
          let errorMessage = response.msg;
          this.sharedService.showSnackBar(errorMessage, null, 3000);
        } else {
          if(response.total > 0){
            this.dataSource = response.marcas;
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
    this.loadMarcasData(null);
  }

  openDialogForm(id:number = 0){
    const dialogRef = this.dialog.open(MarcasFormComponent, {
      width: '500px',
      data: {id: id}
    });

    dialogRef.afterClosed().subscribe(reponse => {
      if(reponse){
        this.applyFilter();
      }
    });
  }

  confirmDeleteMarca(id:number = 0){
    const dialogRef = this.dialog.open(ConfirmActionDialogComponent, {
      width: '500px',
      data: {dialogTitle:'Eliminar Marca',dialogMessage:'Está  seguro de eliminar la Marca?',btnColor:'warn',btnText:'Eliminar'}
    });

    dialogRef.afterClosed().subscribe(reponse => {
      if(reponse){
        this.marcasService.deleteMarca(id).subscribe(
          response => {
            console.log(response);
            this.loadMarcasData(null);
          }
        );
      }
    });
  }

  cleanSearch(){
    this.searchQuery = '';
    this.loadMarcasData(null);
  }

}
