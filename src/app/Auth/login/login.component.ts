import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [RouterLink, CommonModule,ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
})
export class LoginComponent {
    loginFrom: any = {};
    user:any = {};
    errors:any = "";
    constructor(private authService: AuthService){}
    ngOnInit(): void {
        this.loginFrom = new FormGroup({
            email: new FormControl('', [
                Validators.required,
                Validators.min(4),
                Validators.email,
            ]),
            password: new FormControl('', [Validators.required, Validators.min(8)]),
        });
    }
    onLogin = () =>{
        this.authService.login(this.loginFrom.value).subscribe((data) => {
            console.log(data);
          },(error)=>{
             console.log(error.status);
             console.log(error.error.error);
             this.errors = error.error.error;

          });
        return false;

    }
}
