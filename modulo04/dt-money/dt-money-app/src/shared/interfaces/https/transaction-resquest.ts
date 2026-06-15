export interface CreateTransactionInterface {
  description: string;
  typeId: number;
  categoryId: number;
  value: number;
}

export interface UpdateTransactionInterface {
  id: number;
  description: string;
  typeId: number;
  categoryId: number;
  value: number;
}
