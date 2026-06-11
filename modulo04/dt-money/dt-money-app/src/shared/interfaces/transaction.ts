export interface TransactionType {
  id: number;
  name: string;
}

export interface TransactionCategory {
  id: number;
  name: string;
}

export interface Transaction {
  id: number;
  value: number;
  description: string;
  categoryId: number;
  typeId: number;
  type: TransactionType;
  category: TransactionCategory;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null; // Geralmente campos de deleção lógica podem ser nulos
}

export interface TotalTransactions {
  revenue: number;
  expense: number;
  total: number;
}
