import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../../services/transaction.service';
import { CustomerService } from '../../../services/customer.service';
import { ProductService } from '../../../services/product.service';
import { Transaction } from '../../../models/transaction.model';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {
  transactions: Transaction[] = [];
  customers: { [key: number]: string } = {};
  products: { [key: number]: string } = {};

  constructor(
    private transactionService: TransactionService,
    private customerService: CustomerService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.loadTransactions();
    this.loadCustomerNames();
    this.loadProductNames();
  }

  loadTransactions(): void {
    this.transactions = this.transactionService.getTransactions();
  }

  loadCustomerNames(): void {
    this.customerService.getCustomers().forEach(customer => {
      this.customers[customer.id] = customer.name;
    });
  }

  loadProductNames(): void {
    this.productService.getProducts().forEach(product => {
      this.products[product.id] = product.itemName;
    });
  }

  getCustomerName(customerId: number): string {
    return this.customers[customerId] || 'Unknown Customer';
  }

  getProductName(productId: number): string {
    return this.products[productId] || 'Unknown Product';
  }

  getTotalSales(): number {
    return this.transactionService.getTotalSales();
  }
}