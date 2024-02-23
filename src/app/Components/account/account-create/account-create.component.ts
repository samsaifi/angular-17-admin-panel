import { Component, Injectable } from '@angular/core';
import {
    FormArray,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AccountsService } from '../../../services/accounts.service';
import { FlashMessageService } from '../../../services/flash-message.service';

@Component({
    selector: 'app-account-create',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './account-create.component.html',
    styleUrl: './account-create.component.css',
})
@Injectable()
export class AccountCreateComponent {
    accountForm: any = {};
    constructor(
        private accountService: AccountsService,
        private router: Router,
        private flashMessageService: FlashMessageService
    ) {}
    ngOnInit(): void {
        this.accountForm = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.min(4)]),
            email: new FormControl('', [
                Validators.required,
                Validators.min(4),
                Validators.email,
            ]),
            role: new FormControl('', [Validators.required, Validators.min(4)]),
        });
    }

    onSubmit() {
        this.accountService.createAccount(this.accountForm.value);
        this.flashMessageService.showMessage('Account submitted successfully!');
        this.router.navigate(['/accounts/list']);
    }
}
