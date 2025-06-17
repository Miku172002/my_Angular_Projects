import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-employee-view-customers',
  templateUrl: './view-customers.component.html',
  styleUrls: ['./view-customers.component.css']
})
export class EmployeeViewCustomersComponent implements OnInit {
  customers: Customer[] = [];
  searchText = '';
  isLoading = true;

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customers = this.customerService.getCustomers();
    this.isLoading = false;
  }

  get filteredCustomers(): Customer[] {
    return this.customers.filter(customer =>
      customer.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      customer.mobile.includes(this.searchText)
    );
  }
}