import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.css'],
})
export class RegistryComponent implements OnInit {
  public userFG: FormGroup;
  hidePass:boolean = false;
  hideConfrimPass:boolean = false;

  constructor( 
    public dialogRef: MatDialogRef<RegistryComponent>,
    public formBuilder: FormBuilder
  ) { 
    this.userFG = this.formBuilder.group({
      name: ['', Validators.required], 
      second_name: [''],
      last_name: ['', Validators.required],
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


  regisrtyUser(){

  }
}
