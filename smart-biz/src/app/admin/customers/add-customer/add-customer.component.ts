import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';
import { Router } from '@angular/router';
import { Customer } from '../../../models/customer.model';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  customer: Omit<Customer, 'id'> = {
    name: '',
    mobile: '',
    address: ''
  };

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) { }

  ngOnInit(): void {}

  onSubmit(): void {
    this.customerService.addCustomer(this.customer);
    this.router.navigate(['/admin/customers']);
  }
}