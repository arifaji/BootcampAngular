import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';
import { CustomerListComponent } from './customer/list/customer-list.component';
import { HomeComponent } from './home/home.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'
import { CustomerCreateComponent } from './customer/create/customer-create.component';
import { CustomerUpdateComponent } from './customer/update/customer-update.component';
import { AccountListComponent } from './account/list/account-list.component';
import { AccountCreateComponent } from './account/create/account-create.component';
import { ComboCustomerComponent } from './shared/component/customer/combo-customer.component';
import { AccountUpdateComponent } from './account/update/account-update.component';
import { AccountSelectComponent } from './account/select/account-select.component';
import { TransactionListComponent } from './transaction/list/transaction-list.component';
import { TransactionUpdateComponent } from './transaction/update/transaction-update.component';
import { TransactionCreateComponent } from './transaction/create/transaction-create.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerListComponent,
    HomeComponent,
    CustomerCreateComponent,
    CustomerUpdateComponent,
    AccountListComponent,
    AccountCreateComponent,
    ComboCustomerComponent,
    AccountUpdateComponent,
    AccountSelectComponent,
    TransactionListComponent,
    TransactionUpdateComponent,
    TransactionCreateComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UiModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
