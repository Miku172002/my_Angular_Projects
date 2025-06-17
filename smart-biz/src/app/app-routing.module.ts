import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
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
import { ReportsComponent } from './admin/reports/reports.component'; // Add this import

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  
  // Admin routes
  { 
    path: 'admin', 
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'customers', component: CustomerListComponent },
      { path: 'customers/add', component: AddCustomerComponent },
      { path: 'customers/edit/:id', component: AddCustomerComponent },
      { path: 'products', component: ProductListComponent },
      { path: 'products/add', component: AddProductComponent },
      { path: 'products/edit/:id', component: AddProductComponent },
      { path: 'transactions', component: TransactionListComponent },
      { path: 'transactions/add', component: AddTransactionComponent },
      { path: 'reports', component: ReportsComponent } // Add this new route
    ]
  },
  
  // Employee routes
  { 
    path: 'employee', 
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: EmployeeDashboardComponent },
      { path: 'add-customer', component: EmployeeAddCustomerComponent },
      { path: 'add-transaction', component: EmployeeAddTransactionComponent },
      { path: 'view-customers', component: EmployeeViewCustomersComponent },
      { path: 'view-products', component: EmployeeViewProductsComponent }
    ]
  },
  
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }