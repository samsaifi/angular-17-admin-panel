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
import { FlashMessageService } from '../../../services/flash-message.service';
@Component({
    selector: 'app-login',
    standalone: true,
    imports: [RouterLink, CommonModule, ReactiveFormsModule, FormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
})
export class LoginComponent {
    loginFrom: any = {};
    user: any = {};
    isChecked: boolean = false;
    errors: any = '';
    message: string | undefined;
    flashMessage: string | undefined;
    constructor(
        private authService: AuthService,
        private router: Router,
        private flashMessageService: FlashMessageService
    ) {}
    ngOnInit(): void {
        this.flashMessageService.getMessage().subscribe((message) => {
            this.flashMessage = message;
            // Automatically clear the message after a certain time (e.g., 3 seconds)
            setTimeout(() => {
                this.flashMessage = undefined;
            }, 3000);
        });
        const localstorage = this.authService.getLoginUserLocalStorage();
        this.user.email = localstorage.email
            ? localstorage.email
            : 'saddam1234321@gmail.com';
        this.user.password = localstorage.password
            ? localstorage.password
            : 12345678;
        this.loginFrom = new FormGroup({
            email: new FormControl(this.user.email, [
                Validators.required,
                Validators.min(4),
                Validators.email,
            ]),
            password: new FormControl(this.user.password, [
                Validators.required,
                Validators.min(8),
            ]),
        });
    }
    onLogin(): void {
        const user: any = {
            email: this.loginFrom.value.email,
            password: this.loginFrom.value.password,
        };
        this.handleRemember(user);
        this.authService.logInUser(user).subscribe(
            (res) => {
                const token = res.token;

                this.authService.setAuthToken(token);
                this.router.navigate(['/dashboard']);
            },
            (err) => {
                this.errors = err.error.error;
            }
        );
    }
    change = (isChecked: boolean): void => {
        this.isChecked = !isChecked;
    };
    handleRemember(user: any): void {
        if (this.isChecked) {
            this.authService.setLoginUserLocalStorage(user);
        }
    }

    getLoginUserFromLocalStorage(): void {
        this.authService.getLoginUserLocalStorage();
    }
}
