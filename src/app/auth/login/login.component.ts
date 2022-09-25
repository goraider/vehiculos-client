import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared/shared.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading:boolean = false;

  avatarPlaceholder = 'assets/logo.svg';

  constructor(private router: Router, private sharedService: SharedService, private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('',{ validators: [Validators.required] }),
      password: new FormControl('', { validators: [Validators.required] })
    });
    console.log(this.loginForm.value);
  }

  onSubmit(){
    this.isLoading = true;
    this.authService.logIn(this.loginForm.get('email').value, this.loginForm.get('password').value).subscribe(
      response => {
        //this.isLoading = false;
        console.log('resto');
        console.log(response);

        this.router.navigate(['/apps']);
      }, error => {
        console.log(error);
        var errorMessage = "Error: Credenciales inválidas.";
        if(error.status != 401){
          errorMessage = "Ocurrió un error.";
        }
        this.sharedService.showSnackBar(errorMessage, null, 3000);
        this.isLoading = false;
      }
    );
  }

}
