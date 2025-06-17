import { Component } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Router } from '@angular/router';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  product: Omit<Product, 'id'> = {
    itemName: '',
    price: 0,
    stockQuantity: 0
  };

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  onSubmit(): void {
    this.productService.addProduct(this.product);
    this.router.navigate(['/admin/products']);
  }
}