import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { jwtDecode } from 'jwt-decode';

@Component({
    selector: 'app-nav',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './nav.component.html',
    styleUrl: './nav.component.css',
})
export class NavComponent {
    constructor(private auth: AuthService) {
        this.extractUserFromToken();
    }
    user: any = {};
    menu: Boolean = false;
    ngOninit(): void {
        this.extractUserFromToken();
    }
    extractUserFromToken(): void {
        const token = this.auth.getAuthToken();
        this.user = jwtDecode(token);
    }
    logout(): void {
        this.auth.logout();
    }
    toggleMenu(): void {
        this.menu = !this.menu;
    }
}
