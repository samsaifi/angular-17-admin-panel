import { Routes } from '@angular/router';
import { LeadListComponent } from './lead-list/lead-list.component';
import { LeadCreateComponent } from './lead-create/lead-create.component';
import { OpportunityListComponent } from './opportunity-list/opportunity-list.component';
import { OpportunityCreateComponent } from './opportunity-create/opportunity-create.component';
import { ContactCreateComponent } from './contact-create/contact-create.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AccountComponent } from './account/account.component';
import { AccountListComponent } from './account/account-list/account-list.component';
import { AccountCreateComponent } from './account/account-create/account-create.component';
import { AccountEditComponent } from './account/account-edit/account-edit.component';
import { AccountViewComponent } from './account/account-view/account-view.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashbordComponent },
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
        path: 'edit/:id', // child route path
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

  { path: 'leads', component: LeadListComponent },
  { path: 'add-lead', component: LeadCreateComponent },
  { path: 'opportunities', component: OpportunityListComponent },
  { path: 'add-opportunity', component: OpportunityCreateComponent },
  { path: 'contacts', component: ContactListComponent },
  { path: 'add-contact', component: ContactCreateComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];
