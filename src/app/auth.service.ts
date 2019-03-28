import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public apiUrl: any;
  public head: any;
  constructor(public http: HttpClient) {
      let headers = new HttpHeaders({
          'Content-Type': 'application/json'

      });
      this.head ={ headers : headers};
      
      // this.headers.append('Content-Type', 'application/json');
      // this.apiUrl = 'https://redappletravel.realbooks.in';
      this.apiUrl = 'http://localhost:5000';
  }
}
