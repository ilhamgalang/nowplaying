import { Injectable } from '@angular/core';
import swal from 'sweetalert2';

@Injectable()
export class AlertPopupService {

constructor() { }

alertMessage(mtype: any, mtitle: any) {
    const toast = swal['mixin']({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000
    });
    toast({
      type: mtype,
      title: mtitle
    });
  }

  alertMessageNull(mtype: any, mtitle: any) {
    const toast = swal['mixin']({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      animation: false,
      timer: 500
    });
    toast({
      type: mtype,
      title: mtitle
    });
  }

}
