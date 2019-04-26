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
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
// import { Select2OptionData } from 'ng2-select2';
@Component({
  selector: 'app-booking-master',
  templateUrl: './booking-master.component.html',
  styleUrls: ['./booking-master.component.css']
})
export class BookingMasterComponent implements OnInit {
  selectedItems : any = [];
  index = 0;
  booking_Id = null;
  dataCur : any = {};
  suppliers : any = [];
  supname : any = [];
  orderForm: FormGroup;
  submitted = false;
  items : FormArray;
  bookingArray : any = {};
  subbookingArray : any = [];
  //cData = null;
  sData = null;
  sellingcost = null;
  tax = null;
  discount = null;
  serviceSup = null;
  dropdownSettings = {};
  mdata = {
    "FIRSTNAME" : null,
    "INVOICE_CURRENCY" : null,
    "INVOICE_NUMBER" : null,
    "EXCHANGE_RATE" : null,
    "INVOICE_DATE" : null,
    "PAYMENT_DEADLINE" : null,
    "RA_REFERENCE" : null,
    "STAND_ALONE" : null,
    "TOTAL_TAX_CALCULATION" : null,
    "TOTAL_IN_AMOUNTS" : null,
    "RA_AGENT_CODE" : null,
    "SELLINGCOST" : null,
    "BOOKING_NOTES" : null,
    "OVER_ALL_DISCOUNT" : null,
    "OVER_ALL_PROFIT" : null,
    "OVER_ALL_LOSS" : null,
    "LEAD_PASSENGER" : null
  };

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

  constructor(public toastr: ToastrManager, private toastrService: ToastrService,private formBuilder: FormBuilder, public http: HttpClient, public api: Api, public router: Router, private auth: AuthService, public route: ActivatedRoute) { 
    this.addSubArray();
    
  }

  ngOnInit() {
    this.supplier();
    this.currencyFunc();
    this.fetchData()
    
    
  }
  onItemSelect(item: any,i:any) {
    console.log(item);
    this.suppliers.forEach((data,i)=>{
      if(data.supplier_id==item.supplier_id){
        this.bookingArray.data.dynamic[i].PER_SERVICE_WISE_SUPPLIER_NAME=data.supplier_display_name;
        this.bookingArray.data.dynamic[i].PER_SERVICE_SUPPLIER_CODE=data.supplier_id;
        console.log(this.bookingArray.data.dynamic[i].PER_SERVICE_WISE_SUPPLIER_NAME);
      }
    })
    
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  booking() {
    console.log(JSON.stringify(this.bookingArray));
    this.booking_Id = this.bookingArray.data.RA_REFERENCE;
    //this.serviceSupplier();
    this.validation();
    // if(this.bookingArray.data.RA_REFERENCE != null){
      
    // }
    // else if(this.bookingArray.data.RA_REFERENCE == null)
    // this.toastr.errorToastr('RA REFERENCE is empty', 'Can not save form!');
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
    //this.bookingArray["data"] = {};
    this.bookingArray.data = {};
    this.bookingArray.data.dynamic = [];
    this.bookingArray.RA_REFERENCE = null;
    // this.bookingArray.data.RA_REFERENCE = null;
    this.bookingArray.data = {... this.bookingArray.data, ...this.mdata};
    this.bookingArray.data.dynamic.push(this.arrdata);
    console.log(this.bookingArray);
    // this.showSuccess(); 
  }
  
  supplier() {
    this.api.getAllSupplier().subscribe(sup => {
      
      this.suppliers = sup['supplier'].map((data,i)=>{
        return({
          ...data,
          display:data.supplier_id+"-"+data.supplier_display_name
        })
      })
      console.log(this.suppliers);
      this.dropdownSettings = {
        singleSelection: true,
        idField: 'supplier_id',
        textField: 'display',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 3,
        allowSearchFilter: true,
        closeDropDownOnSelection:true
      };
    
    });
  }
 
  /*serviceSupplier() {
    this.suppliers.supplier.forEach(res => {
      if(res == this.bookingArray.data.PER_SERVICE_WISE_SUPPLIER_NAME){
        this.bookingArray.data.PER_SERVICE_SUPPLIER_CODE = res.supplier_id;
      }
    });
  }*/

  currencyFunc() {
    this.api.getAllCurrency().subscribe(datacurreny=>{
    
    console.log(datacurreny);
    this.dataCur = datacurreny;
    });
  };
  fetchData() {
    this.route.paramMap.subscribe(params => {
      this.booking_Id = params.get('id');
        if(this.booking_Id){
          this.api.getBookingData(this.booking_Id).subscribe(formData => {
            // console.log(JSON.stringify(formData));
            this.bookingArray = formData;
            this.bookingArray.data.dynamic.forEach((d,j)=>{
              console.log(d.PER_SERVICE_SUPPLIER_CODE);
              this.selectedItems.push({
                supplier_id:d.PER_SERVICE_SUPPLIER_CODE,
                display:d.PER_SERVICE_SUPPLIER_CODE+"-"+d.PER_SERVICE_WISE_SUPPLIER_NAME
              })
            });
            this.selectedItems.shift()
            console.log(this.selectedItems);
            // this.booking_Id = this.bookingArray.RA_REFERENCE;
            // this.subbookingArray = this.bookingArray.data.dynamic;
          });
        }
        // console.log(this.bookingArray);
    });
  }
  add() {
    
    this.bookingArray.data.dynamic.push({});
    //this.bookingArray.data.dynamic = this.subbookingArray;
    // console.log(this.subbookingArray);
    this.showInfo();
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
    // console.log(`aaaa ${this.discount} and ${this.bookingArray.data.OVER_ALL_DISCOUNT}`)
    if (this.sellingcost != this.bookingArray.data.SELLINGCOST) {
      console.log(this.sellingcost + ' <-Sell Total-> ' + this.bookingArray.data.SELLINGCOST);
      // this.sellingcost = null;
      this.toastr.warningToastr('Total Selling Cost is wrong', 'Wrong Calculation!');
    }
    else if (this.discount != this.bookingArray.data.OVER_ALL_DISCOUNT) {
      // this.discount = null;
      // console.log(`aaaa ${this.discount} and ${this.bookingArray.data.OVER_ALL_DISCOUNT}`)
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
   

    else if(i.PER_SERVICE_SUPPLIER_CODE == undefined) {//
      this.toastr.warningToastr('Per Service Supplier Code is empty.', 'Required!');
    }
    else if(i.COMPONENTS_WISE_SELLING_COST == undefined) {//
      this.toastr.warningToastr('Component Wise Selling Cost is empty.', 'Required!');
    }
    else if(i.PER_SERVICE_WISE_SUPPLIER_NAME == undefined) {//
      this.toastr.warningToastr('Per Service Wise Supplier Name is empty.', 'Required!');
    }
    

    else if(i.SERVICE_COUNTRY == undefined) {//
      this.toastr.warningToastr('Service country is empty.', 'Required!');
    }
    
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
    console.log("I am in");
    if(!this.bookingArray.data.RA_REFERENCE) {//
      this.toastr.warningToastr('Ra Reference is empty.', 'Required!');
    }
    else if(!this.bookingArray.data.INVOICE_CURRENCY) {//
      this.toastr.warningToastr('Invoice Currency is empty.', 'Required!');
    }
  
    else if(!this.bookingArray.data.RA_AGENT_CODE) {//
      this.toastr.warningToastr('Ra Agent Code is empty.', 'Required!');
    }
    else if((this.bookingArray.data.OVER_ALL_LOSS && this.bookingArray.data.OVER_ALL_PROFIT) && ((this.bookingArray.data.OVER_ALL_LOSS && this.bookingArray.data.OVER_ALL_PROFIT) != undefined)) {//
      this.toastr.warningToastr('Can not have profit and loss at the same time', 'Wrong!!');
    }
    
    else {
      this.validateCAl();
    }
  }

}
