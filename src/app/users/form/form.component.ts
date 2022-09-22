import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared/shared.service';
import { UsersService } from '../users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmPasswordDialogComponent } from '../confirm-password-dialog/confirm-password-dialog.component';
import { Observable, combineLatest, of, forkJoin } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from '../../auth/models/user';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {

  constructor(
    private sharedService: SharedService, 
    private usersService: UsersService,
    private authService: AuthService, 
    private route: ActivatedRoute, 
    private fb: FormBuilder,
    public dialog: MatDialog,
    public router: Router,
  ) { }

  isLoading:boolean = false;
  hidePassword:boolean = true;

  authUser: User;
  
  usuario:any = {};

  usuarioForm = this.fb.group({
    'username': ['',[Validators.required, Validators.minLength(4)]],
    'email': ['',[Validators.required, Validators.email]],
    'password': ['',[Validators.minLength(6)]],
  });




  ngOnInit() {
    this.isLoading = true;
    this.authUser = this.authService.getUserData();


    this.route.paramMap.subscribe(params => {
      if(params.get('id')){
        //let id = params.get('id');
        this.usuarioForm.patchValue(this.usuario);

      }else{
        this.usuarioForm.get('password').setValidators([Validators.minLength(6), Validators.required]);
      }

      this.isLoading = false;


    }); 
  }


  accionGuardar(){
    if(this.usuarioForm.valid){
      if(this.usuarioForm.get('password').value){
        this.confirmarContrasenia();
      }else{
        this.guardarUsuario();
      }
    }
  }

  confirmarContrasenia():void {
    const dialogRef = this.dialog.open(ConfirmPasswordDialogComponent, {
      width: '500px',
      data: {password: this.usuarioForm.get('password').value}
    });

    dialogRef.afterClosed().subscribe(validPassword => {
      if(validPassword){
        this.guardarUsuario();
      }
    });
  }

  guardarUsuario(){
    this.isLoading = true;

    if(this.usuario.id){
      this.usersService.updateUser(this.usuarioForm.value,this.usuario.id).subscribe(
        response=>{
          if(response.guardado){
            this.sharedService.showSnackBar('Datos guardados con éxito', null, 3000);
            if(this.authUser.id == response.usuario.id){
              this.authService.updateUserData(response.usuario);
              this.router.navigate(['/usuarios']);
            }
          }
          
          this.isLoading = false;
        }
      );
    }else{
      this.usersService.createUser(this.usuarioForm.value).subscribe(
        response =>{
          this.sharedService.showSnackBar('Datos guardados con éxito', null, 3000);
          this.router.navigate(['/usuarios']);
          this.usuario = response;
          this.isLoading = false;
        }
      );
    }
  }

}