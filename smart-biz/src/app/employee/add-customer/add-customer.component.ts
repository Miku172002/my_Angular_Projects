import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-employee-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class EmployeeAddCustomerComponent {
  customer: Omit<Customer, 'id'> = {
    name: '',
    mobile: '',
    address: ''
  };
  isSubmitting = false;
  errorMessage = '';

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) { }

  onSubmit(): void {
    this.errorMessage = '';
    
    // Basic validation
    if (!this.customer.name.trim()) {
      this.errorMessage = 'Name is required';
      return;
    }

    if (!this.customer.mobile.trim()) {
      this.errorMessage = 'Mobile number is required';
      return;
    }

    this.isSubmitting = true;

    try {
      this.customerService.addCustomer(this.customer);
      this.router.navigate(['/employee/view-customers']);
    } catch (error) {
      this.errorMessage = 'Failed to add customer. Please try again.';
      this.isSubmitting = false;
    }
  }
}