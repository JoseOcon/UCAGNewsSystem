import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoverPageComponent } from './components/cover-page/cover-page.component';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { RegistryComponent } from './components/registry/registry.component';
import { CompareValidatorDirective } from './shared/compare-validator.directive';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { MainViewComponent } from './components/main-view/main-view.component';
import { VerifyAccountComponent } from './components/verify-account/verify-account.component';
import { ErrorHandlerService } from './services/error-handler.service';

@NgModule({
  declarations: [
    AppComponent,
    CoverPageComponent,
    LoginComponent,
    RegistryComponent,
    CompareValidatorDirective,
    ResetPasswordComponent,
    MainViewComponent,
    VerifyAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule
  ],
  entryComponents: [LoginComponent, RegistryComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
