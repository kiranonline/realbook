import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from "./auth.service";
import { Api } from '../providers/api/api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookingMasterComponent } from './booking-master/booking-master.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ToastrService } from './toastr-service.service';
import { from } from 'rxjs';
// import { Select2Module } from 'ng2-select2';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ToastrModule } from 'ng6-toastr-notifications';

@NgModule({
  declarations: [
    AppComponent,
    BookingMasterComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ToastrModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot()
    // Select2Module
  ],
  providers: [Api, AuthService, ToastrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
