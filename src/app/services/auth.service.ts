import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   baseurl = "http://localhost:3000/api/auth";

  constructor(private http: HttpClient) { }
  login(data:any)   {
    return this.http.post(`${this.baseurl}/login`, {data});
  }
}
