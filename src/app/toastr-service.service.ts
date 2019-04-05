import { Injectable } from '@angular/core';
declare var toastr : any;
@Injectable({
  providedIn: 'root'
})
export class ToastrService {

  constructor() {
    this.setting()
   }

  Success(title:string, meassage?:string){
    toastr.success(title, meassage);
  }
  Warning(title:string, meassage?:string){
    toastr.warning(title, meassage);
  }
  Error(title:string, meassage?:string){
    toastr.error(title, meassage);
  }
  Info(meassage?:string){
    toastr.info(meassage);
  }
  setting(){
    toastr.options = {
      "closeButton": false,
      "debug": false,
      "newestOnTop": false,
      "progressBar": false,
      "positionClass": "toast-top-right",
      "preventDuplicates": false,
      "onclick": null,
      "showDuration": "300",
      "hideDuration": "1000",
      "timeOut": "5000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    }
  }
}
