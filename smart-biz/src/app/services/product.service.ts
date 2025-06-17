import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    { id: 1, itemName: 'Rice Bag 25kg', price: 1200, stockQuantity: 10 },
    { id: 2, itemName: 'Cooking Oil 1L', price: 160, stockQuantity: 30 },
    { id: 3, itemName: 'Toothpaste', price: 55, stockQuantity: 50 },
    { id: 4, itemName: 'Washing Powder', price: 85, stockQuantity: 20 },
    { id: 5, itemName: 'Notebook (200pg)', price: 35, stockQuantity: 100 },
    { id: 6, itemName: 'Ball Pen', price: 10, stockQuantity: 500 },
    { id: 7, itemName: 'Detergent Bar', price: 20, stockQuantity: 40 },
    { id: 8, itemName: 'Milk Packet 500ml', price: 28, stockQuantity: 60 }
  ];
  private readonly storageKey = 'smart-biz-products'; // Added this line

  getProducts(): Product[] {
    return this.products.slice();
  }

  getProductById(id: number): Product | undefined {
  console.log('Looking for product ID:', id, 'in:', this.products);
  const product = this.products.find(p => p.id === id);
  console.log('Found:', product);
  return product;
}
  getProductsLowStock(threshold: number = 10): Product[] {
    return this.products
      .filter(p => p.stockQuantity < threshold)
      .map(p => ({...p}));
  }

  addProduct(product: Omit<Product, 'id'>): Product {
    if (product.price < 0) throw new Error('Price cannot be negative');
    
    const nameExists = this.products.some(p => 
      p.itemName.toLowerCase() === product.itemName.toLowerCase()
    );
    if (nameExists) throw new Error('Product already exists');

    const newProduct: Product = {
      id: this.generateId(),
      ...product
    };
    
    this.products.push(newProduct);
    this.saveToStorage();
    return {...newProduct};
  }

  updateProduct(id: number, updates: Partial<Product>): Product {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Product not found');

    if (updates.price !== undefined && updates.price < 0) {
      throw new Error('Price cannot be negative');
    }

    if (updates.stockQuantity !== undefined && updates.stockQuantity < 0) {
      throw new Error('Stock cannot be negative');
    }

    const updatedProduct = { 
      ...this.products[index], 
      ...updates
    };

    updatedProduct.id = id;
    this.products[index] = updatedProduct;
    this.saveToStorage();
    return {...updatedProduct};
  }

  deleteProduct(id: number): void {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Product not found');

    this.products.splice(index, 1);
    this.saveToStorage();
  }

  reduceStock(productId: number, quantity: number): void {
    const product = this.products.find(p => p.id === productId);
    if (!product) throw new Error('Product not found');
    if (product.stockQuantity < quantity) {
      throw new Error('Insufficient stock');
    }

    product.stockQuantity -= quantity;
    this.saveToStorage();
  }

  private generateId(): number {
    return this.products.length > 0 
      ? Math.max(...this.products.map(p => p.id)) + 1 
      : 1;
  }

  private saveToStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.products));
  }
}