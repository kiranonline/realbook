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
  booking() {
    this.api.editBookingData(this.booking_Id, this.bookingArray).subscribe(data => {
      console.log(data);
      this.toastrService.Success("Saved!");
      this.router.navigate(['/bookingmaster/local/' + this.booking_Id]);
    });
  }

  removeField(i: any, event: Event) {
    let clickedItem = event.srcElement;
    this.subbookingArray.splice(i,1);
    // console.log(this.subFormArray);
  }

  index = 0;

  selectField(i: any) {
    // alert(i);
    this.index = i;
    // console.log(dynamicFormData);
  }

  add() : void {
    // alert(this.subbookingArray.length)
    this.bookingArray.data.dynamic.push(this.subbookingArray = {
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
    });
    console.log(this.bookingArray);
    this.toastrService.Success("Added new fields!");
  }
  
  totalAmount(amount: any) : void {
    // this.bookingArray.TOTAL_IN_AMOUNTS = this.bookingArray.TOTAL_IN_AMOUNTS + amount;
    console.log("amount" + amount);
  }

  deleteItem(i: any): void {
    // console.log(this.bookingArray.data.su[this.subbookingArray.length + 1]);
    this.bookingArray.data.dynamic.splice(i, 1);
    this.toastrService.Warning("Deleted field!");
  }

  addSubArray(i: any) {
    // let clickedItem = event.srcElement;
    this.bookingArray.data.dynamic.push(this.subbookingArray);
    console.log(this.bookingArray);

    this.toastrService.Success("Added new fields!");
  }
  // This function is triggered whenever
  // a form field is sorted or repositioned
  // sortField(i: any, event: any){
  //   let tempField = this.subFormArray[event];
  //   this.subFormArray.splice(event,1);
  //   this.subFormArray.splice(i,0,tempField);
  //   this.selectField(i);
  // }
  booking_Id = '';
  dataCur : any = {};
  constructor(private toastrService: ToastrService,private formBuilder: FormBuilder, public http: HttpClient, public api: Api, public router: Router, private auth: AuthService, public route: ActivatedRoute) { }
  // booking_Id = 'RED6127143';
  bookingArray : any = [];
  subbookingArray : any = {};
  cData = "CURRENCY";

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
    this.api.getAllCurrency().subscribe(datacurreny=>{
      console.log(datacurreny);
      this.dataCur = datacurreny;
    });
    this.route.paramMap.subscribe(params => {
      this.booking_Id = params.get('id');
      console.log(this.booking_Id);
      console.log(this.bookingArray);
      this.api.getBookingData(this.booking_Id).subscribe(formData => {
        console.log(JSON.stringify(formData));
        this.bookingArray = formData;
        this.booking_Id = this.bookingArray.data.RA_REFERENCE;
        // this.subbookingArray = this.bookingArray.data.dynamic;
      });  
    });
    
  }
}
