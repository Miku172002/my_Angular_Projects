import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';
import { Router } from '@angular/router';
import { Customer } from '../../../models/customer.model';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
  searchText: string = '';

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customers = this.customerService.getCustomers();
  }

  editCustomer(id: number): void {
    this.router.navigate(['/admin/customers/edit', id]);
  }

  deleteCustomer(id: number): void {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.customerService.deleteCustomer(id);
      this.loadCustomers();
    }
  }

  get filteredCustomers(): Customer[] {
    return this.customers.filter(customer =>
      customer.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      customer.mobile.includes(this.searchText)
    );
  }
}