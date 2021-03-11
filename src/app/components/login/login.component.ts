import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';
import { RegistryComponent } from '../registry/registry.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginFG: FormGroup;
  hide: boolean = false;
  recoveryMode = false;
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private generalService: GeneralService,
    public dialogService: MatDialog,
    public dialogRef: MatDialogRef<LoginComponent>,
    public router: Router
  ) {
    this.loginFG = this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-@]+$')],
      ],
      recovery_email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^[a-zA-Z0-9_.+-]+@{1}[a-zA-Z0-9-]+[.]{1}[a-zA-Z0-9-.]+$'
          ),
        ],
      ],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.loading = true;
    let email = this.loginFG.controls['email'].value;
    let password = this.loginFG.controls['password'].value;
    let recovery_email = this.loginFG.controls['recovery_email'].value;

    this.recoveryMode
      ? this.recoveryPassword(recovery_email)
      : this.login(email, password);
  }

  login(email, pass) {
    this.authService.login(email, pass).subscribe({
      next: (data: any) => {
        if (data.status == 200) {
          this.loading = false;
          this.authService.setUserInLocalStorage(data.body.response.user_info);
          this.generalService.showMessage(
            `¡Bienvenido ${data.body.response.user_info.name}!`,
            'success'
          );
          this.onClose();
          // data.user.user_type_id == 1
          //   ? this.router.navigate(['/admin'])
          //   : this.router.navigate(['/user']);
        }else{
          this.loading = false;
        }
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;
      },
    });
  }

  recoveryPassword(email) {
    this.authService.passwordRecovery(email).subscribe({
      next: (data: any) => {
        if (data.status == 204) {
          this.loading = false;
          this.generalService.showAlertDialog(
            '¡Listo!',
            'Se te ha enviado un correo revisa tu badeja de entrada',
            'success'
          );
          this.onClose();
        } else {
          this.loading = false;
        }
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;
      },
    });
  }

  openRegisrtyDialog() {
    this.onClose();
    this.dialogService.open(RegistryComponent, {
      panelClass: 'full-width-dialog',
      disableClose: true,
    });
  }

  disableDialog(): boolean {
    if (this.recoveryMode && this.loginFG.controls['recovery_email'].valid) {
      return false;
    } else if (
      !this.recoveryMode &&
      this.loginFG.controls['email'].valid &&
      this.loginFG.controls['password'].valid
    ) {
      return false;
    } else {
      return true;
    }
  }

  changeMode() {
    this.recoveryMode = !this.recoveryMode;
  }

  onClose() {
    this.dialogRef.close();
  }
}
