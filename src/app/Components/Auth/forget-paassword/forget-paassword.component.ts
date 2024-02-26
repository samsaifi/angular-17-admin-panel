import { FlashMessageService } from './../../../services/flash-message.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-forget-paassword',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, FormsModule, RouterLink],
    templateUrl: './forget-paassword.component.html',
    styleUrl: './forget-paassword.component.css',
})
export class ForgetPaasswordComponent {
    forgetPasswordFrom: any = {};
    _id: String = '';
    newPasswordFrom: any = {};
    isEmailValid: boolean = false;
    isConfirmPasswordDirty = false;
    forgetPasswordErrors: any = '';
    constructor(
        private router: Router,
        private auth: AuthService,
        private flashMsg: FlashMessageService
    ) {}

    ngOnInit() {
        this.forgetPasswordFrom = new FormGroup({
            email: new FormControl('', [
                Validators.required,
                Validators.email,
                Validators.minLength(4),
                Validators.maxLength(50),
            ]),
        });
        this.newPasswordFrom = new FormGroup({
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(50),
            ]),
            cpassword: new FormControl('', [
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(50),
            ]),
        });
    }
    onForgetPassword(): void {
        this.auth.forgetPassword(this.forgetPasswordFrom.value).subscribe(
            (res) => {
                // console.log(res);
                this.isEmailValid = true;
                this._id = res.user._id;
                console.log(res.user._id);
            },
            (err) => {
                // console.log(err);
                this.forgetPasswordErrors = err.statusText;
            }
        );
    }
    onSetNewPassword(): void {
        const { password } = this.newPasswordFrom.value;

        const data = { password, _id: this._id };
        this.auth.setNewPassword(data).subscribe(
            (res) => {
                // console.log(res);
                if (res.status === true) {
                    this.flashMsg.showMessage(
                        'User  Password Successfully updated'
                    );
                    this.router.navigate(['/login']);
                }
            },
            (err) => {
                // console.log(err);
                this.forgetPasswordErrors = err.statusText;
            }
        );
    }
    checkPasswords(): void {
        let password = this.newPasswordFrom.get('password').value;
        let cpassword = this.newPasswordFrom.get('cpassword').value;
        if (password !== cpassword) {
            this.isConfirmPasswordDirty = false;
        } else {
            this.isConfirmPasswordDirty = true;
        }
        console.log(password, cpassword);
    }
    copypassword(event: any): void {
        this.newPasswordFrom.get('cpassword').value =
            this.newPasswordFrom.get('password').value;
        this.checkPasswords();
    }
}
