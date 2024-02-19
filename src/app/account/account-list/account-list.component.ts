import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { AccountsInterface } from '../../interfaces/accountsinterface';
import { AccountsService } from '../../services/accounts.service';
import { CommonModule } from '@angular/common';
import { FlashMessageService } from '../../services/flash-message.service';
@Component({
  selector: 'app-account-list',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: './account-list.component.html',
  styleUrl: './account-list.component.css',
})
export class AccountListComponent {
  accounts: AccountsInterface[] = [];
  constructor(
    private accountService: AccountsService,
    private flashMessageService: FlashMessageService
  ) {}
  // ngOnInit(): void {
  //   this.getAccounts();
  // }

  ngOnInit(): void {
    this.getAccounts();
  }

  getAccounts() {
    this.accountService.getAccounts().subscribe((res) => (this.accounts = res));
  }

  handleClick(id: number) {
    this.accountService
      .deleteAccount(id)
      .subscribe((accounts) => (this.accounts = accounts));
    this.flashMessageService.showMessage('Account successfully deleted');
    // this.accounts = this.accounts.filter((account) => account.id !== id);
  }
}
