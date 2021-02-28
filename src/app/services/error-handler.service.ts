import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService implements HttpInterceptor {

  constructor(
    private generalService: GeneralService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    // const headers = new HttpHeaders({
    //   'token-usuario': ''
    // });

    // const reqClone = req.clone({
    //   headers
    // });


    const reqClone = req.clone()

    return next.handle(reqClone).pipe(
      catchError((err: HttpErrorResponse) => {
        let errorCode = err.error.err.code

        if(errorCode  == "ERR01"){
          console.log('Error:'+  err.error.err.message)
          this.generalService.showMessage('¡Ha ocurrido un error en la solictud!', 'error')
        }else if(errorCode == "ERR02"){
          console.log('Error:'+  err.error.err.message)
          this.generalService.showMessage('¡Ha ocurrido un error en la solictud!', 'error')
        }else if(errorCode == "ERR03"){
          console.log('Error:'+  err.error.err.message)
          this.generalService.showMessage('¡Ha ocurrido un error en la solictud!', 'error')
        }else if(errorCode == "ERR31"){
          this.generalService.showMessage('La cédula ingresada ya ha sido registrada', 'error')
        }else if(errorCode == "ERR32"){
          this.generalService.showMessage('El correo ingresado ya ha sido registrado', 'error')
        }else if(errorCode == "ERR33"){
          this.generalService.showMessage('El usuario o contraseña no son correctas', 'error')
        }else if(errorCode == "ERR34"){
          this.generalService.showMessage('El correo ingresado no exite', 'error')
        }else if(errorCode == "ERR35"){
          this.generalService.showMessage('No se ha enviado la solicitud de cambio de contraseña', 'error')
        }else if(errorCode == "ERR36"){
          this.generalService.showMessage('El correo ingresado no ha sido verificado aún', 'error')
        }else if(errorCode == "42703"){
          console.log('Error:'+  err.error.err.message)
          this.generalService.showMessage('¡Ha ocurrido un error en la solictud!', 'error')
        }else if(errorCode == "42883"){
          console.log('Error:'+  err.error.err.message)
          this.generalService.showMessage('¡Ha ocurrido un error en la solictud!', 'error')
        }else if(errorCode == "53300"){
          console.log('Error:'+  err.error.err.message)
          this.generalService.showMessage('¡Ha ocurrido un error en la solictud!', 'error')
        }else if(errorCode == "'23505"){
          console.log('Error:'+  err.error.err.message)
          this.generalService.showMessage('¡Ha ocurrido un error en la solictud!', 'error')
        }else{
         console.log("UNHANDLED ERROR") 
        }
        return throwError(err);
      })
    );
  }

  


}
