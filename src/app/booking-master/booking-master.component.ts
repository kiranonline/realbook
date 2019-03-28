import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Api } from "../../providers/api/api";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Router, RouterModule, ActivatedRoute, ParamMap} from '@angular/router';
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-booking-master',
  templateUrl: './booking-master.component.html',
  styleUrls: ['./booking-master.component.css']
})
export class BookingMasterComponent implements OnInit {


  SBU = "";
  CHECK_IN_DATE = "";
  CHECK_OUT_DATE = "";
  EXCHANGE_RATE = "";
  RA_FILE_HANDLER = "";
  PER_SERVICE_WISE_SUPPLIER_NAME = "";
  RA_AGENT_CODE = "";
  INVOICE_NUMBER = "";
  INVOICE_CURRENCY = "";
  INVOICE_DATE = "";
  LEAD_PASSENGER = "";
  NO_OF_NIGHTS = "";
  NO_OF_ROOMS = "";
  BOOKING_NOTES = "";
  PAYMENT_DEADLINE = "";
  PAYMENT_SLABS = "";
  PRODUCT_NAME = "";
  RA_REFERENCE = "";
  ROOM_CATEGORY = "";
  SERVICE_CATEGORY = "";
  SERVICE_CITY = "";
  SERVICE_COUNTRY = "";
  STAND_ALONE = "";
  TAX_CALCULATION = "";
  TOTAL_TAX_CALCULATION = "";
  TOTAL_IN_AMOUNTS = "";
  FOREIGN_CURRENCY = "";
  SUPPLIER_PAYMENT_DEADLINE = "";
  COMPONENTS_WISE_NET_COST = "";
  COMPONENTS_WISE_MARKUP = "";
  COMPONENTS_WISE_SELLING_COST = "";
  COMPONENTS_WISE_DISCOUNT_COMISSION = "";
  OVER_ALL_DISCOUNT = "";
  OVER_ALL_PROFIT = "";
  OVER_ALL_LOSS = "";
  COMPONENTS_WISE_CURRENCY = "";
  PER_SERVICE_SUPPLIER_CODE = "";


  booking() {
    console.log();
    this.api.editBookingData(
      this.SBU,
      this.CHECK_IN_DATE,
      this.CHECK_OUT_DATE,
      this.EXCHANGE_RATE,
      this.RA_FILE_HANDLER,
      this.PER_SERVICE_WISE_SUPPLIER_NAME,
      this.RA_AGENT_CODE,
      this.INVOICE_NUMBER,
      this.INVOICE_CURRENCY,
      this.INVOICE_DATE,
      this.LEAD_PASSENGER,
      this.NO_OF_NIGHTS,
      this.NO_OF_ROOMS,
      this.BOOKING_NOTES,
      this.PAYMENT_DEADLINE,
      this.PAYMENT_SLABS,
      this.PRODUCT_NAME,
      this.RA_REFERENCE,
      this.ROOM_CATEGORY,
      this.SERVICE_CATEGORY,
      this.SERVICE_CITY,
      this.SERVICE_COUNTRY,
      this.STAND_ALONE,
      this.TAX_CALCULATION,
      this.TOTAL_TAX_CALCULATION,
      this.TOTAL_IN_AMOUNTS,
      this.FOREIGN_CURRENCY,
      this.SUPPLIER_PAYMENT_DEADLINE,
      this.COMPONENTS_WISE_NET_COST,
      this.COMPONENTS_WISE_MARKUP,
      this.COMPONENTS_WISE_SELLING_COST,
      this.COMPONENTS_WISE_DISCOUNT_COMISSION,
      this.OVER_ALL_DISCOUNT,
      this.OVER_ALL_PROFIT,
      this.OVER_ALL_LOSS,
      this.COMPONENTS_WISE_CURRENCY,
      this.PER_SERVICE_SUPPLIER_CODE
    ).subscribe(bookingData => {
      console.log(bookingData);
      // this.router.navigate(['/user/admin/' + loginData]);
    });
  }
  subFormArray : any[] = [];

  removeField(i: any, event: Event) {
    let clickedItem = event.srcElement;
    this.subFormArray.splice(i,1);
    console.log(this.subFormArray);
  }

  index = 0;

  selectField(i: any) {
    this.index = i;
    // console.log(dynamicFormData);
  }

  addSubArray(i: any,event: Event) {
    let clickedItem = event.srcElement;
    this.subFormArray.push(i, event);
  }
  // This function is triggered whenever
  // a form field is sorted or repositioned
  // sortField(i: any, event: any){
  //   let tempField = this.subFormArray[event];
  //   this.subFormArray.splice(event,1);
  //   this.subFormArray.splice(i,0,tempField);
  //   this.selectField(i);
  // }

  constructor( public http: HttpClient, public api: Api, public router: Router, private auth: AuthService, public route: ActivatedRoute) { }
  // booking_Id = 'RED6127143';
  bookingArray : any[] = [];
  ngOnInit() {
    this.api.getBookingData().subscribe(formData => {
      console.log(formData);
      // this.bookingArray = JSON.parse(data);
    });
    // this.route.paramMap.subscribe(params => {
    //   // this.booking_Id = params.get('id');
    //   // console.log(this.booking_Id);
      
    // });
    
  }
}
