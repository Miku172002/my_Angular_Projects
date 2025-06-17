import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private transactions: Transaction[] = [];

  constructor() { }

  addTransaction(transaction: Omit<Transaction, 'id'>): Transaction {
    const newTransaction: Transaction = {
      id: this.generateId(),
      ...transaction
    };
    this.transactions.push(newTransaction);
    this.saveToLocalStorage();
    return newTransaction;
  }

 getTransactions(): Transaction[] {
  const saved = localStorage.getItem('transactions');
  if (saved) {
    const parsed = JSON.parse(saved);
    // Convert string dates back to Date objects
    return parsed.map((t: any) => ({
      ...t,
      date: new Date(t.date)
    }));
  }
  return this.transactions;
}

  private generateId(): number {
    return this.transactions.length > 0 
      ? Math.max(...this.transactions.map(t => t.id)) + 1 
      : 1;
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('transactions', JSON.stringify(this.transactions));
  }

  getTotalSales(): number {
    return this.getTransactions().reduce((sum, t) => sum + t.amount, 0);
  }

  getOutstandingPayments(): number {
    return this.getTransactions()
      .filter(t => t.paymentStatus === 'Pending')
      .reduce((sum, t) => sum + t.amount, 0);
  }
}