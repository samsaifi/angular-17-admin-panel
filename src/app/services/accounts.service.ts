import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { AccountsInterface } from '../interfaces/accountsinterface';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class AccountsService {
    baseurl = 'http://localhost:3000/api/';
    constructor(private http: HttpClient, private auth: AuthService) {}

    getAccounts(): Observable<AccountsInterface[]> {
        const headers = this.auth.getTokenHeaders();
        // console.log(headers);

        return this.http.get<AccountsInterface[]>(
            `${this.baseurl}/accounts/get`,
            { headers }
        );
    }
    createAccount(account: any): Observable<AccountsInterface[]> {
        // console.log(account);
        this.http
            .post<AccountsInterface[]>(`${this.baseurl}accounts/add`, account)
            .subscribe((data) => {
                console.log(data);
            });

        return this.getAccounts();
    }
    updateAccount(account: any, id: any): Observable<AccountsInterface[]> {
        this.http
            .put<AccountsInterface[]>(
                `${this.baseurl}accounts/update/${id}`,
                account
            )
            .subscribe((data) => {
                console.log(data);
            });

        return this.getAccounts();
    }
    findAccount(id: any): Observable<AccountsInterface[]> {
        return this.http.get<AccountsInterface[]>(
            `${this.baseurl}/accounts/find/${id}`
        );
    }
    deleteAccount(id: number): Observable<AccountsInterface[]> {
        const body = {
            _id: id,
        };
        this.http
            .delete<AccountsInterface[]>(`${this.baseurl}accounts/delete/`, {
                body,
            })
            .subscribe((data) => {
                console.log(id, data);
            });
        // console.log(`${this.baseurl}/accounts/delete/${id}`);

        return this.getAccounts();
    }
}
