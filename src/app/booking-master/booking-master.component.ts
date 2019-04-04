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
import swal from 'sweetalert';

@Component({
  selector: 'app-booking-master',
  templateUrl: './booking-master.component.html',
  styleUrls: ['./booking-master.component.css']
})
export class BookingMasterComponent implements OnInit {

  orderForm: FormGroup;
  items : FormArray;
  btnTitle:any = 'Invoice Currency';
  selectedValue(i){
    console.log(i);
    this.btnTitle = i;
  }
  booking() {
    swal("Saved!");
    this.api.editBookingData(this.booking_Id, this.bookingArray).subscribe(data => {
      console.log(data);
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

  add(i: any) : void {
    // alert(this.subbookingArray.length)
    this.subbookingArray.push(this.subbookingArray[i]);
    console.log(this.bookingArray);
  }
  
  totalAmount(amount: any) : void {
    // this.bookingArray.TOTAL_IN_AMOUNTS = this.bookingArray.TOTAL_IN_AMOUNTS + amount;
    console.log("amount" + amount);
  }

  deleteItem(i: any): void {
    // console.log(this.bookingArray.data.su[this.subbookingArray.length + 1]);
    this.bookingArray.data.dynamic.splice(i, 1);
  }

  addSubArray(i: any) {
    // let clickedItem = event.srcElement;
    this.bookingArray.data.dynamic.push(this.subbookingArray);
    console.log(this.bookingArray);
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
  constructor(private formBuilder: FormBuilder, public http: HttpClient, public api: Api, public router: Router, private auth: AuthService, public route: ActivatedRoute) { }
  // booking_Id = 'RED6127143';
  bookingArray : any = [];
  subbookingArray : any = {};
  ngOnInit() {

    // this.orderForm = this.formBuilder.group({
    //   items: this.formBuilder.array([this.createItem()])
    // });

    this.route.paramMap.subscribe(params => {
      this.booking_Id = params.get('id');
      console.log(this.booking_Id);
      this.api.getBookingData(this.booking_Id).subscribe(formData => {
        console.log(JSON.stringify(formData));
        this.bookingArray = formData;
        this.booking_Id = this.bookingArray.data.RA_REFERENCE;
        // this.subbookingArray = this.bookingArray.data.dynamic;
      });  
    });
    
  }
}
