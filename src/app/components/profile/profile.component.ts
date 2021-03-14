import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public userFG: FormGroup;
  chars: string =
    "(^[a-zA-Z0-9á-úÁ-Ú|`´üÿÜŸýÝ'¿?¡!<>~|/])([a-zA-Z0-9á-úÁ-Ú | -_'`´üÿÜŸýÝ,;:.¿?¡!<>~|/{'}])*$";

  user: any;
  editMode: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService
  ) {
    this.userFG = this.formBuilder.group({
      name: [
        { value: '', disabled: true },
        [Validators.required, Validators.pattern(this.chars)],
      ],
      second_name: [
        { value: '', disabled: true },
        Validators.pattern(this.chars),
      ],
      last_name: [
        { value: '', disabled: true },
        [Validators.required, Validators.pattern(this.chars)],
      ],
      identification: [
        { value: '', disabled: true },
        [Validators.required, Validators.pattern('[0-9]{9}')],
      ],
      email: [
        { value: '', disabled: true },
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ],
      ],
      phone_number: [
        { value: '', disabled: true },
        [
          Validators.required,
          Validators.pattern('[0-9]{4}[-]{0,1}[ ]{0,1}[0-9]{4}'),
        ],
      ],
    });
  }

  ngOnInit(): void {
    this.user = this.authService.getUser();

    this.userFG.controls['name'].setValue(this.user.name);
    this.user.second_name != undefined
      ? this.userFG.controls['second_name'].setValue(this.user.second_name)
      : null;
    this.userFG.controls['last_name'].setValue(this.user.last_name);
    this.userFG.controls['identification'].setValue(this.user.identification);
    this.userFG.controls['email'].setValue(this.user.email);
    this.userFG.controls['phone_number'].setValue(this.user.phone_number);
  }

  switchForm() {
    this.editMode = !this.editMode;

    this.editMode ? this.enableControls() : this.disableControls();
  }

  enableControls() {
    this.userFG.controls['name'].enable();
    this.userFG.controls['second_name'].enable();
    this.userFG.controls['last_name'].enable();
    this.userFG.controls['identification'].enable();
    this.userFG.controls['email'].enable();
    this.userFG.controls['phone_number'].enable();
  }

  disableControls() {
    this.userFG.controls['name'].disable();
    this.userFG.controls['second_name'].disable();
    this.userFG.controls['last_name'].disable();
    this.userFG.controls['identification'].disable();
    this.userFG.controls['email'].disable();
    this.userFG.controls['phone_number'].disable();
  }

  editUser(){
    let user: User = {
      user_id: this.user.user_id,
      name: this.userFG.controls['name'].value,
      second_name: this.userFG.controls['second_name'].value,
      last_name: this.userFG.controls['last_name'].value,
      identification: this.userFG.controls['identification'].value,
      email: this.userFG.controls['email'].value,
      phone_number: this.userFG.controls['phone_number'].value,
    }

    console.log(user)
  }
}
