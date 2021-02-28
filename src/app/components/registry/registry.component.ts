import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { GeneralService } from 'src/app/services/general.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.css'],
})
export class RegistryComponent implements OnInit {
  public userFG: FormGroup;
  hidePass: boolean = false;
  hideConfrimPass: boolean = false;
  chars: string =
    '(^[a-zA-Z0-9á-úÁ-Ú|`´üÿÜŸýÝ\'¿?¡!<>~|/])([a-zA-Z0-9á-úÁ-Ú | -_\'`´üÿÜŸýÝ,;:.¿?¡!<>~|/{\'}])*$';

  constructor(
    public dialogRef: MatDialogRef<RegistryComponent>,
    public formBuilder: FormBuilder,
    public userService: UserService,
    public generalService: GeneralService
  ) {
    this.userFG = this.formBuilder.group({
      name: [
        '',
        [Validators.required, Validators.pattern(this.chars)],
      ],
      second_name: ['', Validators.pattern(this.chars)],
      last_name: [
        '',
        [Validators.required, Validators.pattern(this.chars)],
      ],
      identification: [
        '',
        [
          Validators.required,
          Validators.pattern('[0-9]{1}[-]{1}[0-9]{4}[-]{1}[0-9]{4}'),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ],
      ],
      phone_number: [
        '',
        [
          Validators.required,
          Validators.pattern('[0-9]{4}[-]{0,1}[ ]{0,1}[0-9]{4}'),
        ],
      ],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  regisrtyUser() {
    let user: User = {
      name: this.userFG.controls['name'].value,
      second_name: this.userFG.controls['second_name'].value,
      last_name: this.userFG.controls['last_name'].value,
      identification: this.userFG.controls['identification'].value,
      email: this.userFG.controls['email'].value,
      phone_number: this.userFG.controls['phone_number'].value,
      password: this.userFG.controls['password'].value,
      user_type_id: 1,
      comunal_member: false
    };

    this.userService.createUser(user).subscribe(
      (data: any) => {
        if (data.status == 201) {
          this.dialogRef.close();
          this.generalService.showAlertDialog('Registro Éxitoso', 'Se le ha enviado un correo con de verificación', 'success');
        }
      }
    );
  }
}
