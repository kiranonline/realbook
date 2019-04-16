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

  index = 0;
  booking_Id = '';
  dataCur : any = {};
  orderForm: FormGroup;
  submitted = false;
  items : FormArray;
  bookingArray : any = {};
  subbookingArray : any = [];
  cData = "";
  arrdata = {
    "CHECK_IN_DATE": null,
    "CHECK_OUT_DATE": null,
    "PER_SERVICE_WISE_SUPPLIER_NAME": null,
    "LEAD_PASSENGER": null,
    "NO_OF_NIGHTS": null,
    "NO_OF_ROOMS": null,
    "PAYMENT_SLABS": null,
    "PRODUCT_NAME": null,
    "ROOM_CATEGORY": null,
    "SERVICE_CATEGORY": null,
    "SERVICE_CITY": null,
    "COMPONENTS_WISE_NET_COST": null,
    "COMPONENTS_WISE_MARKUP": null,
    "COMPONENTS_WISE_SELLING_COST": null,
    "PER_SERVICE_SUPPLIER_CODE": null,
    "COMPONENTS_WISE_SELLING_COST_CURRENCY": null,
    "COMPONENTS_WISE_NET_COST_CURRENCY": null,
    "ARRIVALDATE": null,
    "CITY": null,
    "TOUR_TRANSFER_COMPONENTS_WISE_SELLING_COST": null,
    "TOUR_TRANSFER_COMPONENTS_WISE_NET_COST": null
  };
  ardata = {
    "CHECK_IN_DATE": null,
    "CHECK_OUT_DATE": null,
    "PER_SERVICE_WISE_SUPPLIER_NAME": null,
    "LEAD_PASSENGER": null,
    "NO_OF_NIGHTS": null,
    "NO_OF_ROOMS": null,
    "PAYMENT_SLABS": null,
    "PRODUCT_NAME": null,
    "ROOM_CATEGORY": null,
    "SERVICE_CATEGORY": null,
    "SERVICE_CITY": null,
    "COMPONENTS_WISE_NET_COST": null,
    "COMPONENTS_WISE_MARKUP": null,
    "COMPONENTS_WISE_SELLING_COST": null,
    "PER_SERVICE_SUPPLIER_CODE": null,
    "COMPONENTS_WISE_SELLING_COST_CURRENCY": null,
    "COMPONENTS_WISE_NET_COST_CURRENCY": null,
    "ARRIVALDATE": null,
    "CITY": null,
    "TOUR_TRANSFER_COMPONENTS_WISE_SELLING_COST": null,
    "TOUR_TRANSFER_COMPONENTS_WISE_NET_COST": null
  };

  constructor(public toastr: ToastrManager, private toastrService: ToastrService,private formBuilder: FormBuilder, public http: HttpClient, public api: Api, public router: Router, private auth: AuthService, public route: ActivatedRoute) { 
    this.currencyFunc();
    this.fetchData();
    this.addSubArray();
  }
  showSuccess() {
      this.toastr.successToastr('This form is saved.', 'Saved!');
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
    // console.log(JSON.stringify(this.bookingArray));
    if(this.bookingArray.data.RA_REFERENCE != null){
      this.validation();
    }
    else if(this.bookingArray.data.RA_REFERENCE == null)
    this.toastr.errorToastr('RA REFERENCE is empty', 'Can not save form!');
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
  ngOnChanges() {
  }
  validatesubs(){
    this.bookingArray.data.dynamic.forEach(i => {
    // alert("data" + JSON.stringify(i));
    if(i.SERVICE_CATEGORY == undefined) {
      this.toastr.warningToastr('Service Category is empty.', 'Required!');
    }
    else if(i.PRODUCT_NAME == undefined) {
      this.toastr.warningToastr('Product Name is empty.', 'Required!');
    }
    else if(i.PER_SERVICE_SUPPLIER_CODE == undefined) {
      this.toastr.warningToastr('Per Service Supplier Code is empty.', 'Required!');
    }
    else if(i.COMPONENTS_WISE_SELLING_COST == undefined) {
      this.toastr.warningToastr('Component Wise Selling Cost is empty.', 'Required!');
    }
    else if(i.COMPONENTS_WISE_SELLING_COST_CURRENCY == undefined) {
      this.toastr.warningToastr('Component Wise Selling Cost Currency is empty.', 'Required!');
    }
    else if(i.COMPONENTS_WISE_NET_COST == undefined) {
      this.toastr.warningToastr('Component Wise Net Cost is empty.', 'Required!');
    }
    else if(i.COMPONENTS_WISE_MARKUP == undefined) {
      this.toastr.warningToastr('Component Wise Markup is empty.', 'Required!');
    }
    //Hotel
    else if(i.CHECK_IN_DATE == undefined && i.SERVICE_CATEGORY == 'Hotel') {
      this.toastr.warningToastr('Checkin Date is empty.', 'Required!');
    }
    else if(i.CHECK_OUT_DATE == undefined && i.SERVICE_CATEGORY == 'Hotel') {
      this.toastr.warningToastr('Checkout Date is empty.', 'Required!');
    }
    else if(i.NO_OF_NIGHTS == undefined && i.SERVICE_CATEGORY == 'Hotel') {
      this.toastr.warningToastr('No. of nights is empty.', 'Required!');
    }
    else if(i.NO_OF_ROOMS == undefined && i.SERVICE_CATEGORY == 'Hotel') {
      this.toastr.warningToastr('No. of Rooms is empty.', 'Required!');
    }
    //Tour
    else if(i.TOUR_TRANSFER_COMPONENTS_WISE_SELLING_COST == undefined && i.SERVICE_CATEGORY == 'Tour') {
      this.toastr.warningToastr('Tour Transfer Component Wise Selling Cost is empty.', 'Required!');
      }
    else if(i.TOUR_TRANSFER_COMPONENTS_WISE_NET_COST == undefined && i.SERVICE_CATEGORY == 'Tour') {
      this.toastr.warningToastr('Tour Transfer Component Wise Selling Cost is empty.', 'Required!');
      }
      else {
        
        this.api.editBookingData(this.booking_Id, this.bookingArray).subscribe(data => {
          console.log(this.bookingArray);
          this.router.navigate(['/bookingmaster/local/' + this.booking_Id]);
          this.showSuccess();
        });

      }
    });
  }
  validation() {
    if(this.bookingArray.data.RA_REFERENCE == undefined) {
      this.toastr.warningToastr('Ra Reference is empty.', 'Required!');
    }
    else if(this.bookingArray.data.INVOICE_CURRENCY == undefined) {
      this.toastr.warningToastr('Invoice Currency is empty.', 'Required!');
    }
    else if(this.bookingArray.data.EXCHANGE_RATE == undefined) {
      this.toastr.warningToastr('Exchange Rate is empty.', 'Required!');
    }
    else if(this.bookingArray.data.RA_FILE_HANDLER == undefined) {
      this.toastr.warningToastr('Ra File Handler is empty.', 'Required!');
    }
    else if(this.bookingArray.data.INVOICE_DATE == undefined) {
      this.toastr.warningToastr('Invoice Date is empty.', 'Required!');
    }
    else if(this.bookingArray.data.RA_AGENT_CODE == undefined) {
      this.toastr.warningToastr('Ra Agent Code is empty.', 'Required!');
    }
    else if(this.bookingArray.data.FOREIGN_CURRENCY == undefined) {
      this.toastr.warningToastr('Foreign Currency is empty.', 'Required!');
    }
    else if(this.bookingArray.data.COMPONENTS_WISE_CURRENCY == undefined) {
      this.toastr.warningToastr('Components wise currency is empty.', 'Required!');
    }
    else if(this.bookingArray.data.SERVICE_COUNTRY == undefined) {
      this.toastr.warningToastr('Service country is empty.', 'Required!');
    }
    else if(this.bookingArray.data.TOTAL_IN_AMOUNTS == undefined) {
      this.toastr.warningToastr('Total in amounts is empty.', 'Required!');
    }
    else if(this.bookingArray.data.OVER_ALL_PROFIT == undefined) {
      this.toastr.warningToastr('Overall profit is empty.', 'Required!');
    }
    else {
      this.validatesubs();
    }
  }

}
