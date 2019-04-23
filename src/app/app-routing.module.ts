import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingMasterComponent } from './booking-master/booking-master.component';

const routes: Routes = [
  // { path: '', redirectTo: '/bookingmaster/local', pathMatch: 'full' },
  { path: 'local/:booking/:id', component: BookingMasterComponent },
  { path: 'local/:booking', component: BookingMasterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
