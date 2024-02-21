import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { AccountsInterface } from '../../interfaces/accountsinterface';
import { AccountsService } from '../../services/accounts.service';
import { CommonModule } from '@angular/common';
import { FlashMessageService } from '../../services/flash-message.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-account-list',
    standalone: true,
    imports: [RouterLink, RouterOutlet, CommonModule, FormsModule],
    templateUrl: './account-list.component.html',
    styleUrl: './account-list.component.css',
})
export class AccountListComponent {
    accounts: AccountsInterface[] = [];
    private accountService = inject(AccountsService);
    constructor(private flashMessageService: FlashMessageService) {}

    ngOnInit(): void {
        this.getAccounts();
    }
    getAccounts() {
        this.accountService
            .getAccounts()
            .subscribe((res) => (this.accounts = res));
    }

    handleClick(id: number) {
        this.accountService
            .deleteAccount(id)
            .subscribe((accounts) => (this.accounts = accounts));
        this.flashMessageService.showMessage('Account successfully deleted');
        // this.accounts = this.accounts.filter((account) => account.id !== id);
    }
}
