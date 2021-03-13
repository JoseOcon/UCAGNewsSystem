import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainViewComponent } from './components/main-view/main-view.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { VerifyAccountComponent } from './components/verify-account/verify-account.component';

const routes: Routes = [
  {
    path: 'main',
    component: MainViewComponent,
  },
  {
    path: 'reset-password',
    children: [
      {
        path: ':user-id',
        component: ResetPasswordComponent,
      },
    ],
  },
  {
    path: 'authentification',
    children: [
      {
        path: ':user-id',
        component: VerifyAccountComponent,
      },
    ],
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
