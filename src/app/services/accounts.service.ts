import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AccountsInterface } from '../interfaces/accountsinterface';
import { ACCOUNTS } from '../data/accounts';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  constructor() {}
  getAccounts(): Observable<AccountsInterface[]> {
    const accounts = of(ACCOUNTS);
    return accounts;
  }
  createAccount(account: any): Observable<AccountsInterface[]> {
    ACCOUNTS.push(account);
    return this.getAccounts();
  }
  findAccount(id: number): any[] {
    return ACCOUNTS.filter((account) => account.id === id);
  }
  deleteAccount(id: number): Observable<AccountsInterface[]> {
    return of(ACCOUNTS.filter((account) => account.id !== id));
  }
}
