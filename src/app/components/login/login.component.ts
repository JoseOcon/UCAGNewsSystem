import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginFG: FormGroup;
  hide: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private generalService: GeneralService,
    public dialogRef: MatDialogRef<LoginComponent>,
    public router: Router
  ) {
    this.loginFG = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    let object = {
      email: this.loginFG.controls['email'].value,
      userName: this.loginFG.controls['userName'].value,
      password: this.loginFG.controls['password'].value,
    };
  }

  login() {
    let email = this.loginFG.controls['email'].value;
    let pass = this.loginFG.controls['password'].value;

    this.authService.login(email, pass).subscribe({
      next: (data: any) => {
        this.authService.setUserInLocalStorage(data.user);
        this.generalService.showMessage(
          `¡Bienvenido ${data.user.name}!`,
          'success'
        );
        data.user.type == 1
          ? this.router.navigate(['/admin'])
          : this.router.navigate(['/user']);
      },
      error: (err: HttpErrorResponse) => {
        this.generalService.showMessage(
          `Ha ocurrido un error: ${err.message}`,
          'error'
        );
      },
    });
  }

  onClose() {
    this.dialogRef.close();
  }
}
