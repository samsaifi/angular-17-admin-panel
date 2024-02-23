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
    constructor(private authService: AuthService, private router: Router) {}
    ngOnInit(): void {
        this.user.email = 'saddam1234321@gmail.com';
        this.user.password = 12345678;
        this.loginFrom = new FormGroup({
            email: new FormControl('', [
                Validators.required,
                Validators.min(4),
                Validators.email,
            ]),
            password: new FormControl('', [
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
