import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from "@angular/forms";
import { Api } from "../../providers/api/api";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Router, RouterModule, ActivatedRoute, ParamMap} from '@angular/router';
import { AuthService } from "../auth.service";
import { forEach } from '@angular/router/src/utils/collection';
import { iterateListLike } from '@angular/core/src/change_detection/change_detection_util';
import { isNgTemplate } from '@angular/compiler';
import { ToastrService } from '../toastr-service.service';
import { audit } from 'rxjs/operators';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
@Component({
  selector: 'app-booking-master',
  templateUrl: './booking-master.component.html',
  styleUrls: ['./booking-master.component.css']
})
export class BookingMasterComponent implements OnInit {

  msgs : Message[] = [];
  orderForm: FormGroup;
  submitted = false;
  items : FormArray;
  bookingArray : any = {};
  subbookingArray : any = [];
  cData = "";
  arrdata = {
    "CHECK_IN_DATE": "",
    "CHECK_OUT_DATE": null,
    "PER_SERVICE_WISE_SUPPLIER_NAME": null,
    "LEAD_PASSENGER": "",
    "NO_OF_NIGHTS": null,
    "NO_OF_ROOMS": null,
    "PAYMENT_SLABS": "NA",
    "PRODUCT_NAME": "",
    "ROOM_CATEGORY": "",
    "SERVICE_CATEGORY": "",
    "SERVICE_CITY": "",
    "COMPONENTS_WISE_NET_COST": "",
    "COMPONENTS_WISE_MARKUP": "",
    "COMPONENTS_WISE_SELLING_COST": null,
    "PER_SERVICE_SUPPLIER_CODE": "",
    "COMPONENT_WISE_SELLING_COST_CURRENCY": null,
    "COMPONENTS_WISE_NET_COST_CURRENCY": null,
    "ARRIVALDATE": null,
    "CITY": null,
    "TOUR_TRANSFER_COMPONENTS_WISE_SELLING_COST": null,
    "TOUR_TRANSFER_COMPONENTS_WISE_NET_COST": null
  };
  ardata = {
    "CHECK_IN_DATE": "",
    "CHECK_OUT_DATE": null,
    "PER_SERVICE_WISE_SUPPLIER_NAME": null,
    "LEAD_PASSENGER": "",
    "NO_OF_NIGHTS": null,
    "NO_OF_ROOMS": null,
    "PAYMENT_SLABS": "NA",
    "PRODUCT_NAME": "",
    "ROOM_CATEGORY": "",
    "SERVICE_CATEGORY": "",
    "SERVICE_CITY": "",
    "COMPONENTS_WISE_NET_COST": "",
    "COMPONENTS_WISE_MARKUP": "",
    "COMPONENTS_WISE_SELLING_COST": null,
    "PER_SERVICE_SUPPLIER_CODE": "",
    "COMPONENT_WISE_SELLING_COST_CURRENCY": null,
    "COMPONENTS_WISE_NET_COST_CURRENCY": null,
    "ARRIVALDATE": null,
    "CITY": null,
    "TOUR_TRANSFER_COMPONENTS_WISE_SELLING_COST": null,
    "TOUR_TRANSFER_COMPONENTS_WISE_NET_COST": null
  };

  index = 0;
  booking_Id = '';
  dataCur : any = {};
  constructor(public toastr: ToastrManager, private toastrService: ToastrService,private formBuilder: FormBuilder, public http: HttpClient, public api: Api, public router: Router, private auth: AuthService, public route: ActivatedRoute) { 
    this.currencyFunc();
    this.fetchData();
    this.addSubArray();
    this.validation();
  }
  showSuccess() {
      this.toastr.successToastr('This is form is saved.', 'Saved!');
  }

  showError() {
      this.toastr.errorToastr('You deleted a row.', 'Deleted!');
  }

  showWarning() {
      this.toastr.warningToastr('Requied fields are empty.', 'Required!');
  }

  showInfo() {
      this.toastr.infoToastr('New fields added.', 'Added!');
  }

  // showCustom() {
  //     this.toastr.customToastr(
  //     '<span style='color: green; font-size: 16px; text-align: center;'>Custom Toast</span>',
  //     null,
  //     { enableHTML: true }
  //     );
  // }

  showToast(position: any = 'top-left') {
      this.toastr.infoToastr('This is a toast.', 'Toast', {
          position: position
      });
  }
  // booking_Id = 'RED6127143';
  booking() {
    this.booking_Id = this.bookingArray.data.RA_REFERENCE;
    console.log(JSON.stringify(this.bookingArray));
    this.validation();
    this.api.editBookingData(this.booking_Id, this.bookingArray).subscribe(data => {
      console.log(this.bookingArray);
      // debugger;
      this.router.navigate(['/bookingmaster/local/' + this.booking_Id]);
      this.showSuccess();
    });
  }
  selectField(i: any) {
    // alert(i);
    this.index = i;
    // console.log(dynamicFormData);
  }

  deleteItem(i: any): void {
    // console.log(this.bookingArray.data.su[this.subbookingArray.length + 1]);
    var length=this.bookingArray.data.dynamic.length;
   
    if (length>1) {
      this.bookingArray.data.dynamic.splice(i, 1);
    this.showError();
    }
    
  }

  addSubArray() {
    this.bookingArray["data"] = {};
    this.bookingArray["data"].dynamic = [];
    this.bookingArray["RA_REFERENCE"] = this.booking_Id;
    this.bookingArray["data"].RA_REFERENCE = this.booking_Id;
    this.bookingArray.data.dynamic.push(this.arrdata);
    // this.showSuccess(); 
  }
  currencyFunc() {
    this.api.getAllCurrency().subscribe(datacurreny=>{
    
    console.log(datacurreny);
    this.dataCur = datacurreny;
    });
  };
  fetchData() {
  this.route.paramMap.subscribe(params => {
    this.booking_Id = params.get('id');
    console.log(this.booking_Id);
    console.log(this.bookingArray);
    this.api.getBookingData(this.booking_Id).subscribe(formData => {
      console.log(JSON.stringify(formData));
      this.bookingArray = formData;
      // this.booking_Id = this.bookingArray.RA_REFERENCE;
     // this.subbookingArray = this.bookingArray.data.dynamic;
      });  
    });
  };
  add() {
    
    this.bookingArray.data.dynamic.push({});
    //this.bookingArray.data.dynamic = this.subbookingArray;
    console.log(this.subbookingArray);
    this.showInfo();
    // this.toastrService.Success("Added new fields!");
  }
  ngOnInit() {
    //   this.bookingArray.valueChanges.pipe().subscribe(formData => {
    //     this.api.editBookingData(this.booking_Id, formData).subscribe(data => {
    //       console.log(data);
    //       this.toastrService.Success("Saved!");
    //       this.router.navigate(['/bookingmaster/local/' + this.booking_Id]);
    //   });
    // });
  }
  validation() {
    if(this.bookingArray.data.FIRSTNAME == undefined) {
      return this.toastr.warningToastr('First Name is empty.', 'Required!');
    }
    else if(this.bookingArray.data.INVOICE_CURRENCY == undefined) {
      return this.toastr.warningToastr('Invoice Currency is empty.', 'Required!');
    }
    else if(this.bookingArray.data.INVOICE_NUMBER == undefined) {
      return this.toastr.warningToastr('Invoice Number is empty.', 'Required!');
    }
    else if(this.bookingArray.data.EXCHANGE_RATE == undefined) {
      return this.toastr.warningToastr('Exchange Rate is empty.', 'Required!');
    }
    else if(this.bookingArray.data.RA_FILE_HANDLER == undefined) {
      return this.toastr.warningToastr('Ra File Handler is empty.', 'Required!');
    }
    else if(this.bookingArray.data.INVOICE_DATE == undefined) {
      return this.toastr.warningToastr('Invoice Date is empty.', 'Required!');
    }
    else if(this.bookingArray.data.PAYMENT_DEADLINE == undefined) {
      return this.toastr.warningToastr('Payment Deadline is empty.', 'Required!');
    }
    else if(this.bookingArray.data.RA_REFERENCE == undefined) {
      return this.toastr.warningToastr('Ra Reference is empty.', 'Required!');
    }
    else if(this.bookingArray.data.RA_AGENT_CODE == undefined) {
      return this.toastr.warningToastr('Ra Agent Code is empty.', 'Required!');
    }
    else if(this.bookingArray.data.RA_STAND_ALONE == undefined) {
      return this.toastr.warningToastr('Stand Alone is empty.', 'Required!');
    }
    else if(this.bookingArray.data.FOREIGN_CURRENCY == undefined) {
      return this.toastr.warningToastr('Foreign Currency is empty.', 'Required!');
    }
    else if(this.bookingArray.data.SBU == undefined) {
      return this.toastr.warningToastr('SBU is empty.', 'Required!');
    }
    else if(this.bookingArray.data.SELLING_COST == undefined) {
      return this.toastr.warningToastr('Selling Cost is empty.', 'Required!');
    }

    else if(this.bookingArray.data.SUPPLIER_PAYMENT_DEADLINE == undefined) {
      return this.toastr.warningToastr('Supplier payment deadline is empty.', 'Required!');
    }
    else if(this.bookingArray.data.COMPONENTS_WISE_DISCOUNT_COMISSION == undefined) {
      return this.toastr.warningToastr('Component wise discount commission is empty.', 'Required!');
    }
    else if(this.bookingArray.data.COMPONENTS_WISE_CURRENCY == undefined) {
      return this.toastr.warningToastr('Component wise currency is empty.', 'Required!');
    }
    else if(this.bookingArray.data.SERVICE_COUNTRY == undefined) {
      return this.toastr.warningToastr('Service country is empty.', 'Required!');
    }
    else if(this.bookingArray.data.TAX_CALCULATION == undefined) {
      return this.toastr.warningToastr('Tax Calculation is empty.', 'Required!');
    }
  }

}
