import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-cover-page',
  templateUrl: './cover-page.component.html',
  styleUrls: ['./cover-page.component.css']
})
export class CoverPageComponent implements OnInit {

  constructor(
    public dialogService: MatDialog,
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
     
  }

  loginDialog() {
    this.dialogService.open(LoginComponent, {
      panelClass: "app-auth-dialog",
      disableClose: true,
    });
  }

  logOut(){
    this.authService.logout()
    //this.router.navigateByUrl('/all-news')
  }

}
