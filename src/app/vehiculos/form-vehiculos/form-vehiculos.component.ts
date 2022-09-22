import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';

import { VehiculosService } from '../vehiculos.service';
import { AuthService } from '../../auth/auth.service';

export interface FormDialogData {
  id: number;
}

@Component({
  selector: 'form-vehiculos',
  templateUrl: './form-vehiculos.component.html',
  styleUrls: ['./form-vehiculos.component.css']
})
export class FormVehiculoComponent implements OnInit {

  constructor(
    private vehiculosService: VehiculosService,
    private authService: AuthService,
    public dialogRef: MatDialogRef<FormVehiculoComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: FormDialogData
  ) {}

  isLoading:boolean = false;
  vehiculo:any = {};

  //authUser: User;

  provideID:boolean = false;
  
  vehiculoForm = this.fb.group({

    'marca'             : ['',[Validators.required]],
    'modelo'            : ['',[Validators.required]],
    'color'             : ['',[Validators.required]],
    'fecha_ingreso'     : ['',[Validators.required]],
    'estado'            : ['',[Validators.required]],
    'asignado'          : ['',[Validators.required]],
    'user'              : [''],
    
  });

  catalogos: any = {};
  filteredCatalogs:any = {};

  ngOnInit() {

    //this.authClues = this.authService.getCluesData();

    //this.servicioForm.get('clues_id').patchValue(this.authClues.id);

    //console.log(this.authClues.id);

    let id = this.data.id;
    if(id){
      this.isLoading = true;
      this.vehiculosService.getServicio(id).subscribe(
        response => {
          this.vehiculo = response;
          this.vehiculoForm.patchValue(this.vehiculo);
          this.isLoading = false;
        },
        errorResponse => {
          console.log(errorResponse);
          this.isLoading = false;
        });
    }
    this.IniciarCatalogos(null);
  }

  public IniciarCatalogos(obj:any){

    this.isLoading = true;    
    
    let carga_catalogos = [
      {nombre:'Marca', },
      {nombre:'Color',},
    ];

    this.vehiculosService.getCatalogs(carga_catalogos).subscribe(
      response => {

        this.catalogos = response;

        console.log(this.catalogos);
        this.filteredCatalogs['marcas']     = this.vehiculoForm.get('marca').valueChanges.pipe(startWith(''),map(value => this._filter(value,'marca','nombre')));
        this.filteredCatalogs['colores']    = this.vehiculoForm.get('color').valueChanges.pipe(startWith(''),map(value => this._filter(value,'color','nombre')));

        // if(obj){
        //     this.vehiculoForm.get('unidad_medica_asignada').setValue(obj);
        //     this.vehiculoForm.get('nivel_usuario').setValue(obj);
        // }
        this.isLoading = false; 

      } 
    );

  }

  private _filter(value: any, catalog: string, valueField: string): string[] {
    if(this.catalogos[catalog]){
      let filterValue = '';
      if(value){
        if(typeof(value) == 'object'){
          filterValue = value[valueField].toLowerCase();
        }else{
          filterValue = value.toLowerCase();
        }
      }
      return this.catalogos[catalog].filter(option => option[valueField].toLowerCase().includes(filterValue));
    }
  }

  getDisplayFn(label: string){
    return (val) => this.displayFn(val,label);
  }

  displayFn(value: any, valueLabel: string){
    return value ? value[valueLabel] : value;
  }

  saveServicio(){
    this.isLoading = true;
    if(this.vehiculo.id){
      this.vehiculosService.updateServicio(this.vehiculo.id,this.vehiculoForm.value).subscribe(
        response =>{
          this.dialogRef.close(true);
          this.isLoading = false;
        },
        errorResponse => {
          console.log(errorResponse);
          this.isLoading = false;
      });
    }else{
      this.vehiculosService.createServicio(this.vehiculoForm.value).subscribe(
        response =>{
          this.dialogRef.close(true);
          console.log(response);
          this.isLoading = false;
      },
        errorResponse => {
          console.log(errorResponse);
          this.isLoading = false;
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }



}