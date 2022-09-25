import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/shared.service';

import { Validators, FormBuilder } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

import { VehiculosService } from '../vehiculos.service';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../auth/models/user';

@Component({
  selector: 'form-vehiculos',
  templateUrl: './form-vehiculos.component.html',
  styleUrls: ['./form-vehiculos.component.css']
})
export class FormVehiculoComponent implements OnInit {

  constructor(
    private sharedService: SharedService,
    private vehiculosService: VehiculosService,
    private authService: AuthService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,

  ) {}

  isLoading:boolean = false;
  vehiculo:any = {};

  authUser: User;

  provideID:boolean = false;
  VehiculoID:any;
  
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

    this.route.params.subscribe(params => {
      this.VehiculoID = params?.id;
      let id = this.VehiculoID;
      if(this.VehiculoID){
        this.isLoading = true;
        this.vehiculosService.getVehiculo(id).subscribe(
          response => {
            this.vehiculo = response.vehiculo;
            this.vehiculoForm.patchValue(this.vehiculo);
            this.IniciarCatalogos(this.vehiculo)
            this.isLoading = false;
          },
          errorResponse => {
            console.log(errorResponse);
            this.isLoading = false;
          });
      }

    });

    this.authUser = this.authService.getUserData();
    this.vehiculoForm.get('user').patchValue(this.authUser.id);

    this.IniciarCatalogos(null);
  }

  public IniciarCatalogos(obj:any){

    this.isLoading = true;    
    
    let carga_catalogos = [
      {nombre:"marcas"},
      {nombre:"colores"},
    ];

    this.vehiculosService.getCatalogs(carga_catalogos).subscribe(
      response => {

        this.catalogos = response.data;

        this.filteredCatalogs['marcas']     = this.vehiculoForm.get('marca').valueChanges.pipe(startWith(''),map(value => this._filter(value,'marcas','nombre')));
        this.filteredCatalogs['colores']    = this.vehiculoForm.get('color').valueChanges.pipe(startWith(''),map(value => this._filter(value,'colores','nombre')));

        if(obj){
            this.vehiculoForm.get('marca').setValue(obj.marca);
            this.vehiculoForm.get('color').setValue(obj.color);
            this.vehiculoForm.get('user').setValue(obj.user);
        }
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

  saveVehiculo(){

    let formData =  JSON.parse(JSON.stringify(this.vehiculoForm.value));

    if(formData.marca){
      formData.marca = formData.marca.id;
    }

    if(formData.color){
      formData.color = formData.color.id;
    }

    this.isLoading = true;
    if(this.vehiculo.id){
      this.vehiculosService.updateVehiculo(this.vehiculo.id,formData).subscribe(
        response =>{
          console.log("Actualizado", response);
          this.sharedService.showSnackBar(response?.msg, 'Cerrar', 7000);
          this.router.navigate(['/vehiculos']);
          this.isLoading = false;
        },
        HttpErrorResponse => {
          let errorMessage = "Ocurrió un error.";
          if(HttpErrorResponse.status == 403){
            errorMessage = HttpErrorResponse.error.msg;
          }
          this.sharedService.showSnackBar(errorMessage, 'Cerrar', 5000);
          this.isLoading = false;
          this.router.navigate(['/vehiculos']);
        }
      );
    }else{
      this.vehiculosService.createVehiculo(formData).subscribe(
        response =>{
          console.log("Guardado",response);
          this.sharedService.showSnackBar(response?.msg, 'Cerrar', 5000);
          this.router.navigate(['/vehiculos']);
          this.isLoading = false;
      },
        errorResponse => {
          console.log(errorResponse);
          this.isLoading = false;
      });
    }
  }

}