import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { delay } from 'q';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  bool: boolean;

  constructor() {}

  async showMessage(title: any, icon: any, timer?: number, center?: string) {
    await delay(300);
    const Toast = Swal.mixin({
      toast: true,
      showConfirmButton: false,
      position: center != undefined ? 'center' : 'top-end',
      timer: timer != undefined ? timer : 3000,
    });
    Toast.fire({ title: title, icon: icon });
  }

  showAlertDialog(title: any, text: any, icon: any){
    Swal.fire({
      title,
      icon,
      text,
    })
  }
  
  async showAtuhDialog(title: any, timer: any) {
    await Swal.fire({
      title: title,
      icon: 'warning',
      html:
        'Pulse el boton para renovar la sesión <br>Tiempo restante: <b></b> seg.',
      timer: timer,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Renovar Sesión',
      onOpen: () => {
        timer = setInterval(() => {
          const content = Swal.getContent();
          if (content) {
            const b: any = content.querySelector('b');
            if (b) {
              b.textContent = Math.trunc(Swal.getTimerLeft() / 1000);
            }
          }
        }, 100);
      },
      onClose: () => {
        clearInterval(timer);
      },
    }).then((result) => {
      this.bool = result.value;
    });
    return this.bool;
  }

  async editDeleteMessage(title: any) {
    await Swal.fire({
      title: title,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Si, continuar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true,
    }).then((result) => {
      this.bool = result.value;
    });
    return this.bool;
  }
}
