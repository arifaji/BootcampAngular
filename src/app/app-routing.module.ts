import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerListComponent } from './customer/list/customer-list.component';
import { HomeComponent } from './home/home.component';
import { CustomerCreateComponent } from './customer/create/customer-create.component';
import { AccountListComponent } from './account/list/account-list.component';
import { AccountCreateComponent } from './account/create/account-create.component';
import { TransactionListComponent } from './transaction/list/transaction-list.component';
import { TransactionCreateComponent } from './transaction/create/transaction-create.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'customer',component:CustomerListComponent},
  {path:'customercreate',component:CustomerCreateComponent},
  {path:'account',component:AccountListComponent},
  {path:'accountcreate',component:AccountCreateComponent},
  {path:'transactionlist',component:TransactionListComponent},
  {path:'transactioncreate',component:TransactionCreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
