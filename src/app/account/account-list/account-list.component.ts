import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { AccountsInterface } from '../../interfaces/accountsinterface';
import { AccountsService } from '../../services/accounts.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-account-list',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule, HttpClientModule],
  templateUrl: './account-list.component.html',
  styleUrl: './account-list.component.css',
})
export class AccountListComponent {
  accounts: AccountsInterface[] = [];
  constructor(
    private accountService: AccountsService
  ) {

  }
  // ngOnInit(): void {
  //   this.getAccounts();
  // }

  ngOnInit(): void {
    this.getAccounts();
  }

  getAccounts() {
    this.accountService
      .getAccounts()
      .subscribe(res => (this.accounts = res));
  }

  handleClick(id: number) {
    this.accountService
      .deleteAccount(id)
      .subscribe((accounts) => (this.accounts = accounts));

    // this.accounts = this.accounts.filter((account) => account.id !== id);
  }
}
