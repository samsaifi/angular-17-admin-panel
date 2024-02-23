import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlashMessageService } from '../../../services/flash-message.service';
import { AccountsService } from '../../../services/accounts.service';

@Component({
    selector: 'app-account-edit',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './account-edit.component.html',
    styleUrl: './account-edit.component.css',
})
export class AccountEditComponent {
    editAccountForm: any = {};
    editAccount: any = [];

    constructor(
        private accountService: AccountsService,
        private router: Router,
        private flashMessageService: FlashMessageService,
        private route: ActivatedRoute
    ) {}
    ngOnInit(): void {
        this.editAccountForm = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.min(4)]),
            email: new FormControl('', [
                Validators.required,
                Validators.min(4),
            ]),
            role: new FormControl('', [Validators.required, Validators.min(4)]),
        });
        this.getAccount();
    }

    getAccount() {
        const paramid = this.route.snapshot.paramMap.get('rowid');
        this.accountService.findAccount(paramid).subscribe((res) => {
            this.editAccountForm.name = res[0].name;
            this.editAccountForm.email = res[0].email;
            this.editAccountForm.role = res[0].role;
        });
    }
    onSubmit() {
        const paramid = this.route.snapshot.paramMap.get('rowid');
        this.accountService.updateAccount(this.editAccountForm.value, paramid);
        this.flashMessageService.showMessage('Account edited successfully!');
        this.router.navigate(['/accounts/list']);
    }
}
