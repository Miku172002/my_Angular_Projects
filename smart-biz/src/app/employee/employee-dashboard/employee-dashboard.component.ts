 import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { CustomerService } from '../../services/customer.service';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  username: string;
  recentTransactions: any[] = [];
  isLoading = true;

  constructor(
    private transactionService: TransactionService,
    private customerService: CustomerService,
    private productService: ProductService,
    private authService: AuthService
  ) {
    const user = this.authService.getCurrentUser();
    this.username = user?.username || '';
  }

  ngOnInit(): void {
    this.loadRecentActivity();
  }

  loadRecentActivity(): void {
    const transactions = this.transactionService.getTransactions();
    const customers = this.customerService.getCustomers();
    const products = this.productService.getProducts();

    this.recentTransactions = transactions
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5)
      .map(transaction => {
        const customer = customers.find(c => c.id === transaction.customerId);
        const product = products.find(p => p.id === transaction.productId);
        
        return {
          ...transaction,
          customerName: customer ? customer.name : 'Deleted Customer',
          productName: product ? product.itemName : 'Deleted Product'
        };
      });

    this.isLoading = false;
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}   