export interface Transaction {
  id: number;
  customerId: number;
  productId: number;
  quantity: number;
  amount: number;
  date: Date;
  paymentStatus: 'Paid' | 'Pending';
}

// Add this new interface for the form model
export interface TransactionForm {
  customerId: number | null;
  productId: number | null;
  quantity: number;
  amount: number;
  paymentStatus: 'Paid' | 'Pending';
}