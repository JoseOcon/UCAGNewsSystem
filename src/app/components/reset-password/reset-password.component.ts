import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  resetFG: FormGroup;
  hidePass: boolean = false;
  hideConfrimPass: boolean = false;
  user_uuid;
  passReseted: boolean = false;
  url = environment.FRONT_URL

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private generalService: GeneralService
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.user_uuid = event.url.split('/reset-password/')[1];
      });

    this.resetFG = this.formBuilder.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  resetPassword() {
    let password = this.resetFG.controls['password'].value;

    this.authService
      .resetPassword(this.user_uuid, password)
      .subscribe((data: any) => {
        if (data.status == 204) {
          this.generalService.showAlertDialog(
            'Su contraseña ha sido reestablecida éxitosamente',
            '',
            'success'
          );
          this.passReseted = true;
        }
      });
  }
}
