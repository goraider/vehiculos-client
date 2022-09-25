import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MarcasService } from '../marcas.service';
import { AuthService } from '../../../../auth/auth.service';
import { CustomValidator } from '../../../../utils/classes/custom-validator';

export interface FormDialogData {
  id: number;
}

@Component({
  selector: 'marcas-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class MarcasFormComponent implements OnInit {

  constructor(
    private marcasService: MarcasService,
    private authService: AuthService,
    public dialogRef: MatDialogRef<MarcasFormComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: FormDialogData
  ) {}

  isLoading:boolean = false;
  marcas:any = {};

  provideID:boolean = false;
  
  marcaForm = this.fb.group({
    'nombre'        : ['',[Validators.required]],
  });

  ngOnInit() {

    let id = this.data.id;
    if(id){
      console.log("con el id",id);
      this.isLoading = true;
      this.marcasService.getMarca(id).subscribe(
        response => {
          console.log(response);
          this.marcas = response.marca;
          this.marcaForm.patchValue(this.marcas);
          this.isLoading = false;
        },
        errorResponse => {
          console.log(errorResponse);
          this.isLoading = false;
        });
    }
  }

  saveMarca(){
    this.isLoading = true;
    if(this.marcas.id){
      this.marcasService.updateMarca(this.marcas.id,this.marcaForm.value).subscribe(
        response =>{
          this.dialogRef.close(true);
          this.isLoading = false;
        },
        errorResponse => {
          console.log(errorResponse);
          this.isLoading = false;
      });
    }else{
      this.marcasService.createMarca(this.marcaForm.value).subscribe(
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