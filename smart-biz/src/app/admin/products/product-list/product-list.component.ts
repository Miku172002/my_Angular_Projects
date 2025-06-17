import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Router } from '@angular/router';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  searchText: string = '';

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.products = this.productService.getProducts();
  }

  editProduct(id: number): void {
    this.router.navigate(['/admin/products/edit', id]);
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id);
      this.loadProducts();
    }
  }

  get filteredProducts(): Product[] {
    return this.products.filter(product =>
      product.itemName.toLowerCase().includes(this.searchText.toLowerCase()) ||
      product.id.toString().includes(this.searchText)
    );
  }
}