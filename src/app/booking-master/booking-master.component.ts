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

@Component({
  selector: 'app-booking-master',
  templateUrl: './booking-master.component.html',
  styleUrls: ['./booking-master.component.css']
})
export class BookingMasterComponent implements OnInit {

  orderForm: FormGroup;
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

  index = 0;
  booking_Id = '';
  dataCur : any = {};
  constructor(private toastrService: ToastrService,private formBuilder: FormBuilder, public http: HttpClient, public api: Api, public router: Router, private auth: AuthService, public route: ActivatedRoute) { 
    this.currencyFunc();
    this.fetchData();
    this.add(0);
  }
  // booking_Id = 'RED6127143';
  booking() {
    this.booking_Id = this.bookingArray.data.RA_REFERENCE;
    console.log(JSON.stringify(this.bookingArray));
    this.api.editBookingData(this.booking_Id, this.bookingArray).subscribe(data => {
      console.log(this.bookingArray);
      // debugger;
      this.router.navigate(['/bookingmaster/local/' + this.booking_Id]);
      this.toastrService.Success("Saved!");
    });
  }
  selectField(i: any) {
    // alert(i);
    this.index = i;
    // console.log(dynamicFormData);
  }

  deleteItem(i: any): void {
    // console.log(this.bookingArray.data.su[this.subbookingArray.length + 1]);
    this.bookingArray.data.dynamic.splice(i, 1);
    this.toastrService.Warning("Deleted field!");
  }

  addSubArray(i) {
    this.bookingArray.data.dynamic.push(this.arrdata);
    //this.bookingArray.data.dynamic = this.subbookingArray;
    console.log(this.subbookingArray);

    // this.toastrService.Success("Added new fields!");
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
  add(i) {
    if(i == 0){
    this.bookingArray["data"] = {};
    this.bookingArray["data"].dynamic = [];
    this.bookingArray["RA_REFERENCE"] = this.booking_Id;
    this.bookingArray["data"].RA_REFERENCE = this.booking_Id;
    this.bookingArray["data"].dynamic[0] = this.arrdata;
    // alert(this.subbookingArray.length)
    console.log(this.bookingArray);
    }
    else{
      this.addSubArray(i);
    }
  }
  ngOnInit() {

    // this.orderForm = this.formBuilder.group({
    //   items: this.formBuilder.array([this.createItem()])
    // });
    //   this.bookingArray.valueChanges.pipe().subscribe(formData => {
    //     this.api.editBookingData(this.booking_Id, formData).subscribe(data => {
    //       console.log(data);
    //       this.toastrService.Success("Saved!");
    //       this.router.navigate(['/bookingmaster/local/' + this.booking_Id]);
    //   });
    // });
    
    
  }
}
