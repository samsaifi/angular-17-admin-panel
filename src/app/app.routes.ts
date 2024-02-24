import { Routes } from '@angular/router';
import { LoginComponent } from './Components/Auth/login/login.component';
import { RegisterComponent } from './Components/Auth/register/register.component';
import { authGuard } from './Middleware/auth.guard';
import { DashbordComponent } from './Components/dashbord/dashbord.component';
import { AccountComponent } from './Components/account/account.component';
import { AccountListComponent } from './Components/account/account-list/account-list.component';
import { AccountCreateComponent } from './Components/account/account-create/account-create.component';
import { AccountEditComponent } from './Components/account/account-edit/account-edit.component';
import { AccountViewComponent } from './Components/account/account-view/account-view.component';
import { TestMycodeComponent } from './Components/layout/test-mycode/test-mycode.component';
import { LeadListComponent } from './Components/lead/lead-list/lead-list.component';
import { LeadCreateComponent } from './Components/lead/lead-create/lead-create.component';
import { OpportunityListComponent } from './Components/opportunity/opportunity-list/opportunity-list.component';
import { OpportunityCreateComponent } from './Components/opportunity/opportunity-create/opportunity-create.component';
import { ContactListComponent } from './Components/contact/contact-list/contact-list.component';
import { ContactCreateComponent } from './Components/contact/contact-create/contact-create.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { LayoutwithsibarComponent } from './Components/layout/layoutwithsibar/layoutwithsibar.component';
import { ForgetPaasswordComponent } from './Components/Auth/forget-paassword/forget-paassword.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: 'forget-password',
        component: ForgetPaasswordComponent,
    },

    {
        path: '',
        canActivate: [authGuard],
        component: LayoutwithsibarComponent,
        children: [
            {
                path: 'dashboard',
                component: DashbordComponent,
                canActivate: [authGuard],
            },
            {
                path: 'accounts',
                component: AccountComponent,
                children: [
                    {
                        path: 'list', // child route path
                        component: AccountListComponent,
                    },
                    {
                        path: 'add', // child route path
                        component: AccountCreateComponent,
                    },
                    {
                        path: 'edit/:rowid', // child route path
                        component: AccountEditComponent,
                    },
                    {
                        path: 'view', // child route path
                        component: AccountViewComponent,
                    },
                    {
                        path: '',
                        redirectTo: 'list',
                        pathMatch: 'full',
                    },
                ],
            },
            { path: 'test', component: TestMycodeComponent },
            { path: 'leads', component: LeadListComponent },
            { path: 'add-lead', component: LeadCreateComponent },
            { path: 'opportunities', component: OpportunityListComponent },
            { path: 'add-opportunity', component: OpportunityCreateComponent },
            { path: 'contacts', component: ContactListComponent },
            { path: 'add-contact', component: ContactCreateComponent },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: '**', component: PageNotFoundComponent },
        ],
    },
];
