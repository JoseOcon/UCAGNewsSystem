import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetFG: FormGroup;
  hidePass: boolean = false;
  hideConfrimPass: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
  ) { 
    this.resetFG = this.formBuilder.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

  resetPassword(){
    
  }

}
