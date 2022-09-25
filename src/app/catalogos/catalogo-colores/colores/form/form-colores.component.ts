import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ColoresService } from '../colores.service';
import { AuthService } from '../../../../auth/auth.service';
import { CustomValidator } from '../../../../utils/classes/custom-validator';

export interface FormDialogData {
  id: number;
}

@Component({
  selector: 'colores-form',
  templateUrl: './form-colores.component.html',
  styleUrls: ['./form-colores.component.css']
})
export class ColoresFormComponent implements OnInit {

  constructor(
    private coloresService: ColoresService,
    private authService: AuthService,
    public dialogRef: MatDialogRef<ColoresFormComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: FormDialogData
  ) {}

  isLoading:boolean = false;
  colores:any = {};

  provideID:boolean = false;
  
  colorForm = this.fb.group({
    'nombre'        : ['',[Validators.required]],
  });

  ngOnInit() {

    let id = this.data.id;
    if(id){
      console.log("con el id",id);
      this.isLoading = true;
      this.coloresService.getColor(id).subscribe(
        response => {
          console.log(response);
          this.colores = response.color;
          this.colorForm.patchValue(this.colores);
          this.isLoading = false;
        },
        errorResponse => {
          console.log(errorResponse);
          this.isLoading = false;
        });
    }
  }

  saveColor(){
    this.isLoading = true;
    if(this.colores.id){
      this.coloresService.updateColor(this.colores.id,this.colorForm.value).subscribe(
        response =>{
          this.dialogRef.close(true);
          this.isLoading = false;
        },
        errorResponse => {
          console.log(errorResponse);
          this.isLoading = false;
      });
    }else{
      this.coloresService.createColor(this.colorForm.value).subscribe(
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