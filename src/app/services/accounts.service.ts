import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { AccountsInterface } from '../interfaces/accountsinterface';
import { ACCOUNTS } from '../data/accounts';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  baseurl = "http://localhost:3000/api/";
  constructor(private http: HttpClient) {}
  getAccounts(): Observable<AccountsInterface[]> {
    return this.http.get<AccountsInterface[]>(`${this.baseurl}/accounts/get`);
  }
  createAccount(account: any): Observable<AccountsInterface[]> {
    ACCOUNTS.push(account);
    return this.getAccounts();
  }
  findAccount(id: number): any[] {
    return ACCOUNTS.filter((account) => account._id === id);
  }
  deleteAccount(id: number): Observable<AccountsInterface[]> {
    const body = {
      _id: id
    };
   this.http.delete<AccountsInterface[]>(`${this.baseurl}accounts/delete/`, {body}).subscribe((data) => {
       console.log(id, data);
   });
  // console.log(`${this.baseurl}/accounts/delete/${id}`);

    return this.getAccounts();
  }
}
