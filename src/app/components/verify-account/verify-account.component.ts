import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.css'],
})
export class VerifyAccountComponent implements OnInit {

  verified: boolean = false;
  url = environment.SERVER_URL

  constructor(
    private router: Router,
    private auhtService: AuthService,
    private generalService: GeneralService
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        let user_id = +event.url.split('/authentification/')[1];
        this.auhtService.verifyUser(user_id).subscribe((data: any) => {
          if (data.status == 204) {
            this.generalService
              .showAlertDialog(
                'Su cuenta ha sido verificada con éxito',
                '',
                'success'
              )
            this.verified = true;
          }
        });
      });
  }

  ngOnInit(): void {}
}
