import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlashMessageService } from '../../../services/flash-message.service';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [RouterLink, CommonModule, ReactiveFormsModule, FormsModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
})
export class RegisterComponent {
    registerForm: any = {};
    isChecked: boolean = false;
    isConfirmPasswordDirty = false;
    registerFormError: any = '';
    constructor(
        private router: Router,
        private auth: AuthService,
        private flashMessageService: FlashMessageService
    ) {}

    ngOnInit(): void {
        this.registerForm = new FormGroup({
            name: new FormControl('', [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(50),
            ]),
            email: new FormControl('', [
                Validators.required,
                Validators.email,
                Validators.minLength(4),
                Validators.maxLength(50),
            ]),
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
            policy: new FormControl('', []),
        });
    }

    onRegister(): void {
        if (this.isConfirmPasswordDirty) {
            const { name, email, password } = this.registerForm.value;
            const data: any = {
                name,
                email,
                password,
                status: false,
            };
            this.auth.registerUser(data).subscribe(
                (res) => {
                    // console.log(res);
                    this.flashMessageService.showMessage(
                        'User successfully! Successfully Created. Use your credentials here'
                    );
                    this.router.navigate(['/login']);
                },
                (err) => {
                    // console.log(err);
                    this.registerFormError = err.error.error;
                    return false;
                }
            );
        } else {
            this.registerFormError = `Password Does't match`;
        }
    }

    onBlur(event: any): void {
        let trimValue = event.target.value.trim();
        if (trimValue === '' || trimValue.length === 0) {
            this.registerFormError = `Can't be empty `;
        }
    }

    checkPasswords(): void {
        let password = this.registerForm.get('password').value;
        let cpassword = this.registerForm.get('cpassword').value;
        if (password !== cpassword) {
            this.isConfirmPasswordDirty = false;
        } else {
            this.isConfirmPasswordDirty = true;
        }
        console.log(password, cpassword);
    }
    copypassword(event: any): void {
        this.registerForm.get('cpassword').value =
            this.registerForm.get('password').value;
        this.checkPasswords();
    }
}
