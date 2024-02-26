import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    baseurl = 'http://localhost:3000/api';
    private TOKEN_KEY: string = 'crm_user_token';
    private LOGIN_EMIAIL_KEY: string = 'crm_user_email';
    private LOGIN_PASSWORD_KEY: string = 'crm_user_password';
    constructor(private http: HttpClient, private router: Router) {}

    logInUser(data: any): Observable<any> {
        return this.http.post<any>(`${this.baseurl}/auth/login`, data);
    }
    registerUser(data: any): Observable<any> {
        return this.http.post<any>(`${this.baseurl}/auth/register`, data);
    }
    setAuthToken(token: string): void {
        localStorage.setItem(this.TOKEN_KEY, token);
    }
    setLoginUserLocalStorage(user: any): void {
        this.removeLoginUserLocalStorage();
        localStorage.setItem(this.LOGIN_EMIAIL_KEY, user.email);
        localStorage.setItem(this.LOGIN_PASSWORD_KEY, user.password);
    }

    // Get the authentication token from localStorage
    getLoginUserLocalStorage(): any {
        const user: any = {
            email: localStorage.getItem(this.LOGIN_EMIAIL_KEY),
            password: localStorage.getItem(this.LOGIN_PASSWORD_KEY),
        };
        return user;
    }
    removeLoginUserLocalStorage(): void {
        localStorage.removeItem(this.LOGIN_EMIAIL_KEY);
        localStorage.removeItem(this.LOGIN_PASSWORD_KEY);
    }

    getAuthToken(): any {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    // Remove the authentication token from localStorage
    removeAuthToken(): void {
        localStorage.removeItem(this.TOKEN_KEY);
    }

    getTokenHeaders(): any {
        const token = this.getAuthToken();
        return { Authorization: `Bearer ${token}` };
    }
    logout(): void {
        this.removeAuthToken();
        this.http
            .get<any>(`${this.baseurl}/user/logout`)
            .subscribe((response) => {
                console.log(response);
            });
        this.router.navigate(['/login']);
    }
    forgetPassword(data: any): Observable<any> {
        console.log(data);
        return this.http.post<any>(
            `${this.baseurl}/auth/forget-password`,
            data
        );
    }
    setNewPassword(data: any): Observable<any> {
        return this.http.post<any>(
            `${this.baseurl}/auth/save-new-password`,
            data
        );
    }
}
