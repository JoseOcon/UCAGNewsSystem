import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';
import { UserService } from 'src/app/services/user.service';

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
  loading: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public userService: UserService,
    public generalService: GeneralService
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

    this.setData();
  }

  setData() {
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

  async disableControls() {
    await this.setData();
    this.userFG.controls['name'].disable();
    this.userFG.controls['second_name'].disable();
    this.userFG.controls['last_name'].disable();
    this.userFG.controls['identification'].disable();
    this.userFG.controls['email'].disable();
    this.userFG.controls['phone_number'].disable();
  }

  editUser() {
    this.loading = true;
    let user: User = {
      user_id: this.user.user_id,
      name: this.userFG.controls['name'].value,
      second_name: this.userFG.controls['second_name'].value,
      last_name: this.userFG.controls['last_name'].value,
      identification: this.userFG.controls['identification'].value,
      email: this.userFG.controls['email'].value,
      phone_number: this.userFG.controls['phone_number'].value,
      active: this.user.active,
      comunal_member: this.user.comunal_member,
      user_type_id: this.user.user_type_id,
      verified: this.user.verified,
      //imgURL: this.user.imgURL
    };

    this.userService.editUser(user).subscribe({
      next: (data: any) => {
        if (data.status == 204) {
          this.authService.setUserInLocalStorage(user);
          this.user = user;
          this.setData();
          this.loading = false;
          this.generalService.showMessage(
            '¡Se ha actualizado con éxito!',
            'success'
          );
        } else {
          this.loading = false;
        }
      },
      error: (err: HttpErrorResponse) => {
        this.loading = true;
      },
    });
  }

  isDifferent(): boolean {
    let name = this.userFG.controls['name'].value;
    let second_name = this.userFG.controls['second_name'].value;
    let last_name = this.userFG.controls['last_name'].value;
    let identification = this.userFG.controls['identification'].value;
    let email = this.userFG.controls['email'].value;
    let phone_number = this.userFG.controls['phone_number'].value;

    if (
      this.user.name != name ||
      (this.user.second_name != undefined &&
        this.user.second_name != second_name) ||
      this.user.last_name != last_name ||
      this.user.identification != identification ||
      this.user.email != email ||
      this.user.phone_number != phone_number
    ) {
      return true;
    }

    return false;
  }
}
