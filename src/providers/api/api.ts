import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../../app/auth.service";

@Injectable()
export class Api {
    public apiUrl: any;
    public head: any;
    public bookingData = [];
    constructor(public auth: AuthService, public http: HttpClient) {
        // console.log(this.auth.getAccessToken());
        // let headers = new HttpHeaders({
        //     'Content-Type': 'application/json',
        //     'Authorization': 'Bearer ' + this.auth.getAccessToken()

        // });
        // this.head = { headers : headers };
        // this.headers.append('Content-Type', 'application/json');
        this.apiUrl = 'http://localhost:5000';
        // this.apiUrl = 'https://redappletravel.realbooks.in';
        // var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
    }

    // userLogin(email, password) {
    //     let ldata = {
    //         "email" : email,
    //         "password" : password
    //     }
    //     return this.http.post<any>(this.apiUrl + '/api/iiest_api/login.php', ldata, this.head);
    // }
     
    public editBookingData(
        SBU,
        CHECK_IN_DATE,
        CHECK_OUT_DATE,
        EXCHANGE_RATE,
        RA_FILE_HANDLER,
        PER_SERVICE_WISE_SUPPLIER_NAME,
        RA_AGENT_CODE,
        INVOICE_NUMBER,
        INVOICE_CURRENCY,
        INVOICE_DATE,
        LEAD_PASSENGER,
        NO_OF_NIGHTS,
        NO_OF_ROOMS,
        BOOKING_NOTES,
        PAYMENT_DEADLINE,
        PAYMENT_SLABS,
        PRODUCT_NAME,
        RA_REFERENCE,
        ROOM_CATEGORY,
        SERVICE_CATEGORY,
        SERVICE_CITY,
        SERVICE_COUNTRY,
        STAND_ALONE,
        TAX_CALCULATION,
        TOTAL_TAX_CALCULATION,
        TOTAL_IN_AMOUNTS,
        FOREIGN_CURRENCY,
        SUPPLIER_PAYMENT_DEADLINE,
        COMPONENTS_WISE_NET_COST,
        COMPONENTS_WISE_MARKUP,
        COMPONENTS_WISE_SELLING_COST,
        COMPONENTS_WISE_DISCOUNT_COMISSION,
        OVER_ALL_DISCOUNT,
        OVER_ALL_PROFIT,
        OVER_ALL_LOSS,
        COMPONENTS_WISE_CURRENCY,
        PER_SERVICE_SUPPLIER_CODE
    ) {
        let bookingid = 'RED1152510';
        let ldata = {
            data: [{
            "SBU": SBU,
            "CHECK_IN_DATE": CHECK_IN_DATE,
            "CHECK_OUT_DATE": CHECK_OUT_DATE,
            "EXCHANGE_RATE": EXCHANGE_RATE,
            "RA_FILE_HANDLER": RA_FILE_HANDLER,
            "PER_SERVICE_WISE_SUPPLIER_NAME": PER_SERVICE_WISE_SUPPLIER_NAME,
            "RA_AGENT_CODE": RA_AGENT_CODE,
            "INVOICE_NUMBER": INVOICE_NUMBER,
            "INVOICE_CURRENCY": INVOICE_CURRENCY,
            "INVOICE_DATE": INVOICE_DATE,
            "LEAD_PASSENGER": LEAD_PASSENGER,
            "NO_OF_NIGHTS": NO_OF_NIGHTS,
            "NO_OF_ROOMS": NO_OF_ROOMS,
            "BOOKING_NOTES": BOOKING_NOTES,
            "PAYMENT_DEADLINE": PAYMENT_DEADLINE,
            "PAYMENT_SLABS": PAYMENT_SLABS,
            "PRODUCT_NAME": PRODUCT_NAME,
            "RA_REFERENCE": RA_REFERENCE,
            "ROOM_CATEGORY": ROOM_CATEGORY,
            "SERVICE_CATEGORY": SERVICE_CATEGORY,
            "SERVICE_CITY": SERVICE_CITY,
            "SERVICE_COUNTRY": SERVICE_COUNTRY,
            "STAND_ALONE": STAND_ALONE,
            "TAX_CALCULATION": TAX_CALCULATION,
            "TOTAL_TAX_CALCULATION": TOTAL_TAX_CALCULATION,
            "TOTAL_IN_AMOUNTS": TOTAL_IN_AMOUNTS,
            "FOREIGN_CURRENCY": FOREIGN_CURRENCY,
            "SUPPLIER_PAYMENT_DEADLINE": SUPPLIER_PAYMENT_DEADLINE,
            "COMPONENTS_WISE_NET_COST": COMPONENTS_WISE_NET_COST,
            "COMPONENTS_WISE_MARKUP": COMPONENTS_WISE_MARKUP,
            "COMPONENTS_WISE_SELLING_COST": COMPONENTS_WISE_SELLING_COST,
            "COMPONENTS_WISE_DISCOUNT_COMISSION": COMPONENTS_WISE_DISCOUNT_COMISSION,
            "OVER_ALL_DISCOUNT": OVER_ALL_DISCOUNT,
            "OVER_ALL_PROFIT": OVER_ALL_PROFIT,
            "OVER_ALL_LOSS": OVER_ALL_LOSS,
            "COMPONENTS_WISE_CURRENCY": COMPONENTS_WISE_CURRENCY,
            "PER_SERVICE_SUPPLIER_CODE": PER_SERVICE_SUPPLIER_CODE
        }]
    }
        return this.http.post<any>(this.apiUrl + '/bookingmaster/local/' + bookingid, ldata);
    }
    
    public getBookingData() {
        let bookingid = 'RED1152510';
        console.log(this.apiUrl);
        return this.http.get(this.apiUrl + '/bookingmaster/local/' + bookingid);
    }
}