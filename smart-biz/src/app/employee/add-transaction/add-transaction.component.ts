import { Component,OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { CustomerService } from '../../services/customer.service';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css']
})
export class EmployeeAddTransactionComponent implements OnInit {

  // Initialize with default values
  transaction = {
    customerId: null as number|null,
    productId: null as number|null,
    quantity: 1,
    amount: 0,
    paymentStatus: 'Paid' as 'Paid'|'Pending'
  };
  
  // Price display values
  unitPrice = 0;
  totalAmount = 0;
  
  customers = this.customerService.getCustomers();
  products = this.productService.getProducts();
  selectedProduct: any = null;
  isSubmitting = false;
  errorMessage = '';

  constructor(
    private transactionService: TransactionService,
    private customerService: CustomerService,
    private productService: ProductService,
    private router: Router
  ) {}

   ngOnInit(): void {
  try {
    this.products = this.productService.getProducts();
    console.log('Products loaded:', this.products);
  } catch (error) {
    console.error('Error loading products:', error);
    this.errorMessage = 'Failed to load products';
  }
}
  onProductChange(): void {
    console.log('Current productId:', this.transaction.productId, typeof this.transaction.productId);
    
    if (this.transaction.productId) {
      // Ensure we pass a number
      const product = this.productService.getProductById(Number(this.transaction.productId));
      console.log('Product found:', product);
      
      this.unitPrice = product ? product.price : 0;
      this.calculateTotal();
    } else {
      this.unitPrice = 0;
      this.totalAmount = 0;
    }
  }
  // When quantity changes
  onQuantityChange(): void {
    this.calculateTotal();
  }

  // Calculate total amount
  calculateTotal(): void {
    this.totalAmount = this.unitPrice * this.transaction.quantity;
    this.transaction.amount = this.totalAmount; // Update transaction object
  }

  onSubmit(): void {
    this.errorMessage = '';
    
    // Validation
    if (!this.transaction.customerId || !this.transaction.productId) {
      this.errorMessage = 'Please select both customer and product';
      return;
    }

    if (this.transaction.quantity <= 0) {
      this.errorMessage = 'Quantity must be at least 1';
      return;
    }

    this.isSubmitting = true;

    try {
      this.transactionService.addTransaction({
        customerId: this.transaction.customerId!,
        productId: this.transaction.productId!,
        quantity: this.transaction.quantity,
        amount: this.totalAmount,
        paymentStatus: this.transaction.paymentStatus,
        date: new Date()
      });
      
      this.router.navigate(['/employee/dashboard']);
    } catch (error) {
      this.errorMessage = 'Failed to record sale. Please try again.';
      this.isSubmitting = false;
    }
  }
}