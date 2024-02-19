import { Component } from '@angular/core';
import { AccountsInterface } from '../../interfaces/accountsinterface';
import { AccountsService } from '../../services/accounts.service';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-account-create',
  standalone: true,
  imports: [],
  templateUrl: './account-create.component.html',
  styleUrl: './account-create.component.css'
})
export class AccountCreateComponent {
  name: string = 'sam saifi';
  email: string = '';
  role: string = '';
  constructor( private accountService: AccountsService,  ) { }


    onSubmit( ){
    }
}
