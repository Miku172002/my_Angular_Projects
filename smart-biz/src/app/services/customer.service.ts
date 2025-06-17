import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customers: Customer[] = [
    { id: 1, name: 'Rajesh Kumar', mobile: '9876543210', address: 'Bhubaneswar' },
    { id: 2, name: 'Sunita Sahu', mobile: '8887654321', address: 'Cuttack' },
    { id: 3, name: 'Akash Das', mobile: '9090909090', address: 'Puri' },
    { id: 4, name: 'Neha Mishra', mobile: '7878787878', address: 'Rourkela' },
    { id: 5, name: 'Manas Ranjan', mobile: '7676767676', address: 'Balasore' }
  ];

  constructor() {}

  getCustomers(): Customer[] {
    return this.customers;
  }

  getCustomerById(id: number): Customer | undefined {
    return this.customers.find(c => c.id === id);
  }

  addCustomer(customer: Omit<Customer, 'id'>): Customer {
    const newCustomer = {
      id: this.generateId(),
      ...customer
    };
    this.customers.push(newCustomer);
    return newCustomer;
  }

  updateCustomer(id: number, customer: Partial<Customer>): Customer | undefined {
    const index = this.customers.findIndex(c => c.id === id);
    if (index !== -1) {
      this.customers[index] = { ...this.customers[index], ...customer };
      return this.customers[index];
    }
    return undefined;
  }

  deleteCustomer(id: number): boolean {
    const index = this.customers.findIndex(c => c.id === id);
    if (index !== -1) {
      this.customers.splice(index, 1);
      return true;
    }
    return false;
  }

  private generateId(): number {
    return this.customers.length > 0 
      ? Math.max(...this.customers.map(c => c.id)) + 1 
      : 1;
  }
}