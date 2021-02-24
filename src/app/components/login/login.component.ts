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
  recoveryMode = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private generalService: GeneralService,
    public dialogRef: MatDialogRef<LoginComponent>,
    public router: Router
  ) {
    this.loginFG = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-@]+$')
        ],
      ],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    let email = this.loginFG.controls['email'].value;
    let password = this.loginFG.controls['password'].value;

    this.recoveryMode
      ? this.recoveryPassword(email)
      : this.login(email, password);
  }

  login(email, pass) {
    this.authService.login(email, pass).subscribe({
      next: (data: any) => {
        console.info(data)
        this.authService.setUserInLocalStorage(data.body.response.user_info);
        this.generalService.showMessage(
          `¡Bienvenido ${data.body.response.user_info.name}!`,
          'success'
        );
        // data.user.user_type_id == 1
        //   ? this.router.navigate(['/admin'])
        //   : this.router.navigate(['/user']);
      },
      error: (err: HttpErrorResponse) => {
        this.generalService.showMessage(
          `Ha ocurrido un error: ${err.message}`,
          'error'
        );
      },
    });
  }

  recoveryPassword(email) {}

  changeMode() {
    this.recoveryMode = !this.recoveryMode;
  }

  onClose() {
    this.dialogRef.close();
  }
}
