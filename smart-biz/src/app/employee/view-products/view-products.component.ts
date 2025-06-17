import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-employee-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class EmployeeViewProductsComponent implements OnInit {
  products: Product[] = [];
  searchText = '';
  isLoading = true;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.products = this.productService.getProducts();
    this.isLoading = false;
  }

  get filteredProducts(): Product[] {
    return this.products.filter(product =>
      product.itemName.toLowerCase().includes(this.searchText.toLowerCase()) ||
      product.id.toString().includes(this.searchText)
    );
  }

  getStockStatus(stock: number): string {
    if (stock < 5) return 'danger';
    if (stock < 10) return 'warning';
    return 'success';
  }
}