import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { CustomerService } from '../../services/customer.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  reportData: any = {};
  dateRange = {
    start: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    end: new Date()
  };
  isLoading = true;

  constructor(
    private transactionService: TransactionService,
    private customerService: CustomerService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.generateReport();
  }

  getProductName(productId: number): string {
    const product = this.productService.getProductById(productId);
    return product ? product.itemName : 'Unknown Product';
  }

  generateReport(): void {
    this.isLoading = true;
    
    const transactions = this.transactionService.getTransactions()
      .filter(t => 
        new Date(t.date) >= new Date(this.dateRange.start) && 
        new Date(t.date) <= new Date(this.dateRange.end)
      );
    
    const customers = this.customerService.getCustomers();
    const products = this.productService.getProducts();

    this.reportData = {
      totalSales: this.transactionService.getTotalSales(),
      outstandingPayments: this.transactionService.getOutstandingPayments(),
      totalCustomers: customers.length,
      totalProducts: products.length,
      recentTransactions: transactions.slice(0, 10),
      salesByProduct: this.getSalesByProduct(transactions, products),
      salesTrend: this.getSalesTrend(transactions)
    };

    this.isLoading = false;
  }

  private getSalesByProduct(transactions: any[], products: any[]): any[] {
    const productSales: any = {};
    
    transactions.forEach(t => {
      const product = products.find(p => p.id === t.productId);
      if (product) {
        if (!productSales[product.id]) {
          productSales[product.id] = {
            productId: product.id,
            productName: product.itemName,
            totalSales: 0,
            quantitySold: 0
          };
        }
        productSales[product.id].totalSales += t.amount;
        productSales[product.id].quantitySold += t.quantity;
      }
    });

    return Object.values(productSales);
  }

  private getSalesTrend(transactions: any[]): any[] {
    const dailySales: any = {};
    
    transactions.forEach(t => {
      const dateStr = new Date(t.date).toISOString().split('T')[0];
      if (!dailySales[dateStr]) {
        dailySales[dateStr] = {
          date: dateStr,
          totalSales: 0,
          count: 0
        };
      }
      dailySales[dateStr].totalSales += t.amount;
      dailySales[dateStr].count++;
    });

    return Object.values(dailySales).sort((a: any, b: any) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }
}