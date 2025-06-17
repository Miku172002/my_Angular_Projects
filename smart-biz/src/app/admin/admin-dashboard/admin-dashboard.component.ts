import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { ProductService } from '../../services/product.service';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  stats = {
    customers: 0,
    products: 0,
    sales: 0,
    outstanding: 0
  };

  recentTransactions: any[] = [];
  lowStockProducts: any[] = [];

  constructor(
    private customerService: CustomerService,
    private productService: ProductService,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    // Main statistics
    this.stats = {
      customers: this.customerService.getCustomers().length,
      products: this.productService.getProducts().length,
      sales: this.transactionService.getTotalSales(),
      outstanding: this.transactionService.getOutstandingPayments()
    };

    // Recent transactions (last 5)
    this.recentTransactions = this.transactionService.getTransactions()
      .slice(-5)
      .reverse();

    // Low stock products (< 10 quantity)
    this.lowStockProducts = this.productService.getProducts()
      .filter(p => p.stockQuantity < 10)
      .slice(0, 3);
  }

  getProductName(id: number): string {
    return this.productService.getProductById(id)?.itemName || 'Unknown';
  }
}