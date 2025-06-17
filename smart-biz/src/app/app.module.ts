import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { EmployeeDashboardComponent } from './employee/employee-dashboard/employee-dashboard.component';
import { CustomerListComponent } from './admin/customers/customer-list/customer-list.component';
import { AddCustomerComponent } from './admin/customers/add-customer/add-customer.component';
import { ProductListComponent } from './admin/products/product-list/product-list.component';
import { AddProductComponent } from './admin/products/add-product/add-product.component';
import { TransactionListComponent } from './admin/transactions/transaction-list/transaction-list.component';
import { AddTransactionComponent } from './admin/transactions/add-transaction/add-transaction.component';
import { EmployeeAddCustomerComponent } from './employee/add-customer/add-customer.component';
import { EmployeeAddTransactionComponent } from './employee/add-transaction/add-transaction.component';
import { EmployeeViewCustomersComponent } from './employee/view-customers/view-customers.component';
import { EmployeeViewProductsComponent } from './employee/view-products/view-products.component';
import { NavbarComponent } from './shared/navbar/navbar.component';

import { ReportsComponent } from './admin/reports/reports.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminDashboardComponent,
    EmployeeDashboardComponent,
    CustomerListComponent,
    AddCustomerComponent,
    ProductListComponent,
    AddProductComponent,
    TransactionListComponent,
    AddTransactionComponent,
    EmployeeAddCustomerComponent,
    EmployeeAddTransactionComponent,
    EmployeeViewCustomersComponent,
    EmployeeViewProductsComponent,
    NavbarComponent,
    
    ReportsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }