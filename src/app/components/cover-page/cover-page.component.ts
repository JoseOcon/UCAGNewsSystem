import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-cover-page',
  templateUrl: './cover-page.component.html',
  styleUrls: ['./cover-page.component.css'],
})
export class CoverPageComponent implements OnInit {
  showMenu: boolean = true;
  currentRoute: any = '';

  constructor(
    public dialogService: MatDialog,
    public authService: AuthService,
    private router: Router
  ) {
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute = event.url
        console.log(this.currentRoute);
        if (
          this.currentRoute.indexOf('/authentification') !== -1 ||
          this.currentRoute.indexOf('/reset-password') !== -1 
        ) {
          this.showMenu = false;
        }
      });
  }

  ngOnInit(): void {
    
  }

  loginDialog() {
    this.dialogService.open(LoginComponent, {
      panelClass: 'app-auth-dialog',
      disableClose: true,
    });
  }

  logOut() {
    this.authService.logout();
    this.router.navigateByUrl('/main')
  }
}
