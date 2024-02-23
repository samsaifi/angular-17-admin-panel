import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    baseurl = 'http://localhost:3000/api/auth';
    private TOKEN_KEY: string = 'crm_user_token';
    private LOGIN_KEY: string = 'crm_user_login';
    constructor(private http: HttpClient, private router: Router) {}

    logInUser(data: any): Observable<any> {
        return this.http.post<any>(`${this.baseurl}/login`, data);
    }

    setAuthToken(token: string): void {
        localStorage.setItem(this.TOKEN_KEY, token);
    }
    setLoginUserLocalStorage(token: string): void {
        localStorage.setItem(this.LOGIN_KEY, token);
    }

    // Get the authentication token from localStorage
    getLoginUserLocalStorage(): any {
        return localStorage.getItem(this.LOGIN_KEY);
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
            .get<any>('http://localhost:3000/api/user/logout')
            .subscribe((response) => {
                console.log(response);
            });
        this.router.navigate(['/login']);
    }
}
