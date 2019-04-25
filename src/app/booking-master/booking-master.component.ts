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
  suppliers : any = {};
  orderForm: FormGroup;
  submitted = false;
  items : FormArray;
  bookingArray : any = {};
  subbookingArray : any = [];
  cData = "";
  sData = "";
  sellingcost = null;
  tax = null;
  discount = null;
  arrdata = {
    "CHECK_IN_DATE": null,//2
    "CHECK_OUT_DATE": null,//2
    "RA_FILE_HANDLER" : null,//2
    "PER_SERVICE_WISE_SUPPLIER_NAME": null,//1
    //"LEAD_PASSENGER": null,
    "NO_OF_NIGHTS": null,//2
    "NO_OF_ROOMS": null,//2
    "PAYMENT_SLABS": null,//2
    "PRODUCT_NAME": null,//1
    "ROOM_CATEGORY": null,//2
    "SERVICE_COUNTRY" : null,//1
    "SERVICE_CATEGORY": null,//1
    "SERVICE_CITY": null,//2
    "TAX_CALCULATION": null,//2
    "FOREIGN_CURRENCY":null,//2
    "SUPPLIER_PAYMENT_DEADLINE": null,//2
    "COMPONENTS_WISE_NET_COST": null,//2
    "COMPONENTS_WISE_MARKUP": null,//2
    "COMPONENTS_WISE_SELLING_COST": null,//1
    "COMPONENTS_WISE_DISCOUNT_COMMISSION": null,//2
    "COMPONENTS_WISE_CURRENCY" : null,//2
    "PER_SERVICE_SUPPLIER_CODE": null,//1
    // "COMPONENTS_WISE_SELLING_COST_CURRENCY": null,
    "COMPONENTS_WISE_NET_COST_CURRENCY": null,//2
    "ARRIVALDATE": null,//2
    "CITY": null,//2
    "TOUR_TRANSFER_COMPONENTS_WISE_SELLING_COST": null,//2
    "TOUR_TRANSFER_COMPONENTS_WISE_NET_COST": null,//2
    "ismanual": 1
  };
  ardata = {
    "CHECK_IN_DATE": null,
    "CHECK_OUT_DATE": null,
    "RA_FILE_HANDLER" : null,
    "PER_SERVICE_WISE_SUPPLIER_NAME": null,
    //"LEAD_PASSENGER": null,
    "NO_OF_NIGHTS": null,
    "NO_OF_ROOMS": null,
    "PAYMENT_SLABS": null,
    "PRODUCT_NAME": null,
    "ROOM_CATEGORY": null,
    "SERVICE_COUNTRY" : null,
    "SERVICE_CATEGORY": null,
    "SERVICE_CITY": null,
    "TAX_CALCULATION": null,
    "FOREIGN_CURRENCY":null,
    "SUPPLIER_PAYMENT_DEADLINE": null,
    "COMPONENTS_WISE_NET_COST": null,
    "COMPONENTS_WISE_MARKUP": null,
    "COMPONENTS_WISE_SELLING_COST": null,
    "COMPONENTS_WISE_DISCOUNT_COMMISSION": null,
    "COMPONENTS_WISE_CURRENCY" : null,
    "PER_SERVICE_SUPPLIER_CODE": null,
    // "COMPONENTS_WISE_SELLING_COST_CURRENCY": null,
    "COMPONENTS_WISE_NET_COST_CURRENCY": null,
    "ARRIVALDATE": null,
    "CITY": null,
    "TOUR_TRANSFER_COMPONENTS_WISE_SELLING_COST": null,
    "TOUR_TRANSFER_COMPONENTS_WISE_NET_COST": null,
    "ismanual": 1
  };

  constructor(public toastr: ToastrManager, private toastrService: ToastrService,private formBuilder: FormBuilder, public http: HttpClient, public api: Api, public router: Router, private auth: AuthService, public route: ActivatedRoute) { 
    this.currencyFunc();
    this.supplier();
    this.fetchData();
    this.addSubArray();

    //need to move this 3 function to somewhere
    
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

  supplier() {
    this.api.getAllSupplier().subscribe(sup => {
      this.suppliers = sup;
      // console.log(this.suppliers);
    });
  }
  currencyFunc() {
    this.api.getAllCurrency().subscribe(datacurreny=>{
    
    // console.log(datacurreny);
    this.dataCur = datacurreny;
    });
  };
  fetchData() {
  this.route.paramMap.subscribe(params => {
    this.booking_Id = params.get('id');
    // console.log(this.booking_Id);
    // console.log(this.bookingArray);
    this.api.getBookingData(this.booking_Id).subscribe(formData => {
      // console.log(JSON.stringify(formData));
      this.bookingArray = formData;
      // this.booking_Id = this.bookingArray.RA_REFERENCE;
      // this.subbookingArray = this.bookingArray.data.dynamic;
      });  
    });
  };
  add() {
    
    this.bookingArray.data.dynamic.push({});
    //this.bookingArray.data.dynamic = this.subbookingArray;
    // console.log(this.subbookingArray);
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
  taxCal() {
    this.bookingArray.data.dynamic.forEach(tax => {
      if (tax.TAX_CALCULATION) {
        var temp = parseFloat(tax.TAX_CALCULATION);
        this.tax = this.tax + temp;
      }
      console.log("tax : " + this.tax);
    });
    
  }
  discountCal() {
    console.log("i am called")
    this.bookingArray.data.dynamic.forEach(disc => {
      if (disc.COMPONENTS_WISE_DISCOUNT_COMISSION) {
        var temp = parseFloat(disc.COMPONENTS_WISE_DISCOUNT_COMISSION);
        this.discount = this.discount + temp;
      }
      console.log("discount : " + this.discount);
    });
    
  }
  sellCal() {
    // console.log(this.bookingArray.data.dynamic);
    this.bookingArray.data.dynamic.forEach(sell => {
      if (sell.COMPONENTS_WISE_SELLING_COST){
        var temp = parseFloat(sell.COMPONENTS_WISE_SELLING_COST);
        this.sellingcost = this.sellingcost + temp;
      }
      console.log("sell cost : " + this.sellingcost);
    });
  }

  validateCAl() {
    this.tax = null;
    this.discount = null;
    this.sellingcost = null;
    this.taxCal();
    this.discountCal();
    this.sellCal();
    console.log(`aaaa ${this.discount} and ${this.bookingArray.data.OVER_ALL_DISCOUNT}`)
    if (this.sellingcost != this.bookingArray.data.SELLINGCOST) {
      console.log(this.sellingcost + ' <-Sell Total-> ' + this.bookingArray.data.SELLINGCOST);
      // this.sellingcost = null;
      this.toastr.warningToastr('Total Selling Cost is wrong', 'Wrong Calculation!');
    }
    else if (this.discount != this.bookingArray.data.OVER_ALL_DISCOUNT) {
      // this.discount = null;
      console.log(`aaaa ${this.discount} and ${this.bookingArray.data.OVER_ALL_DISCOUNT}`)
      this.toastr.warningToastr('Total Discount is wrong', 'Wrong Calculation');
    }

    else if(this.tax != this.bookingArray.data.TOTAL_TAX_CALCULATION) {
      // this.tax = null;
      this.toastr.warningToastr('Total Tax Calculation is wrong', 'Wrong Calculation!');
    }

    else this.validatesubs();
  }
  validatesubs(){
    this.bookingArray.data.dynamic.forEach(i => {
    // alert("data" + JSON.stringify(i));
    if(i.SERVICE_CATEGORY == undefined) {//
      this.toastr.warningToastr('Service Category is empty.', 'Required!');
    }
    else if(i.PRODUCT_NAME == undefined) {//
      this.toastr.warningToastr('Product Name is empty.', 'Required!');
    }
    // else if(i.RA_FILE_HANDLER == undefined) {
    //   this.toastr.warningToastr('Ra File Handler is empty.', 'Required!');
    // }
    // else if(i.FOREIGN_CURRENCY == undefined) {
    //   this.toastr.warningToastr('Foreign Currency is empty.', 'Required!');
    // }

    else if(i.PER_SERVICE_SUPPLIER_CODE == undefined) {//
      this.toastr.warningToastr('Per Service Supplier Code is empty.', 'Required!');
    }
    else if(i.COMPONENTS_WISE_SELLING_COST == undefined) {//
      this.toastr.warningToastr('Component Wise Selling Cost is empty.', 'Required!');
    }
    else if(i.PER_SERVICE_WISE_SUPPLIER_NAME == undefined) {//
      this.toastr.warningToastr('Per Service Wise Supplier Name is empty.', 'Required!');
    }
    // else if(i.COMPONENTS_WISE_NET_COST == undefined) {
    //   this.toastr.warningToastr('Component Wise Net Cost is empty.', 'Required!');
    // }
    // else if(i.COMPONENTS_WISE_MARKUP == undefined) {
    //   this.toastr.warningToastr('Component Wise Markup is empty.', 'Required!');
    // }

    // else if(i.COMPONENTS_WISE_CURRENCY == undefined) {
    //   this.toastr.warningToastr('Components wise currency is empty.', 'Required!');
    // }

    else if(i.SERVICE_COUNTRY == undefined) {//
      this.toastr.warningToastr('Service country is empty.', 'Required!');
    }
    // //Hotel
    // else if(i.CHECK_IN_DATE == undefined && i.SERVICE_CATEGORY == 'Hotel') {
    //   this.toastr.warningToastr('Checkin Date is empty.', 'Required!');
    // }
    // else if(i.CHECK_OUT_DATE == undefined && i.SERVICE_CATEGORY == 'Hotel') {
    //   this.toastr.warningToastr('Checkout Date is empty.', 'Required!');
    // }
    // else if(i.NO_OF_NIGHTS == undefined && i.SERVICE_CATEGORY == 'Hotel') {
    //   this.toastr.warningToastr('No. of nights is empty.', 'Required!');
    // }
    // else if(i.NO_OF_ROOMS == undefined && i.SERVICE_CATEGORY == 'Hotel') {
    //   this.toastr.warningToastr('No. of Rooms is empty.', 'Required!');
    // }
    // //Tour
    // else if(i.TOUR_TRANSFER_COMPONENTS_WISE_SELLING_COST == undefined && i.SERVICE_CATEGORY == 'Tour') {
    //   this.toastr.warningToastr('Tour Transfer Component Wise Selling Cost is empty.', 'Required!');
    //   }
    // else if(i.TOUR_TRANSFER_COMPONENTS_WISE_NET_COST == undefined && i.SERVICE_CATEGORY == 'Tour') {
    //   this.toastr.warningToastr('Tour Transfer Component Wise Selling Cost is empty.', 'Required!');
    //   }
      else {
        this.api.editBookingData(this.booking_Id, this.bookingArray).subscribe(data => {
          // console.log(this.bookingArray);
          this.router.navigate(['/local/booking/' + this.booking_Id]);
          this.showSuccess();
        });

      }
    });
  }
  validation() {
    console.log("I am inn");
    if(!this.bookingArray.data.RA_REFERENCE) {//
      this.toastr.warningToastr('Ra Reference is empty.', 'Required!');
    }
    else if(!this.bookingArray.data.INVOICE_CURRENCY) {//
      this.toastr.warningToastr('Invoice Currency is empty.', 'Required!');
    }
    else if(this.bookingArray.data.OVER_ALL_PROFIT == this.bookingArray.data.OVER_ALL_LOSS) {
      this.toastr.warningToastr('Overall profit and overall loss cannot be same', 'Same Fields!')
    }
    // else if(this.bookingArray.data.EXCHANGE_RATE == undefined) {
    //   this.toastr.warningToastr('Exchange Rate is empty.', 'Required!');
    // }
    
    // else if(this.bookingArray.data.INVOICE_DATE == undefined) {
    //   this.toastr.warningToastr('Invoice Date is empty.', 'Required!');
    // }
    else if(!this.bookingArray.data.RA_AGENT_CODE) {//
      this.toastr.warningToastr('Ra Agent Code is empty.', 'Required!');
    }
    else if(!(this.bookingArray.data.OVER_ALL_PROFIT && this.bookingArray.data.OVER_ALL_LOSS)) {//
      this.toastr.warningToastr('can not have profit and loss at the same time', 'Wrong!!');
    }
    // else if(this.bookingArray.data.TOTAL_IN_AMOUNTS == undefined) {
    //   this.toastr.warningToastr('Total in amounts is empty.', 'Required!');
    // }
    // else if(this.bookingArray.data.OVER_ALL_PROFIT == undefined) {
    //   this.toastr.warningToastr('Overall profit is empty.', 'Required!');
    // }
    else {
      this.validateCAl();
    }
  }

}
