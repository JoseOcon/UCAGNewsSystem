import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainViewComponent } from './components/main-view/main-view.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { VerifyAccountComponent } from './components/verify-account/verify-account.component';

const routes: Routes = [
  {
    path: 'home',
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
    path: 'verify-account',
    children: [
      {
        path: ':user-id',
        component: VerifyAccountComponent,
      },
    ],
  },
  {
    path: '',
    redirectTo: 'all-news',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
