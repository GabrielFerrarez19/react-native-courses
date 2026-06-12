import { TransctionCategory } from "@/shared/interfaces/https/transaction-category-response";
import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";
import * as transactionService from "@/shared/services/dt-money/transaction.service";
import { CreateTransactionInterface } from "@/shared/interfaces/https/create-transaction-resquest";
import {
  TotalTransactions,
  Transaction,
} from "@/shared/interfaces/transaction";

export type TransactionContextType = {
  fetchCategories: () => Promise<void>;
  createTransaction: (params: CreateTransactionInterface) => Promise<void>;
  fetchTransactions: () => Promise<void>;
  categories: TransctionCategory[];
  totalTransaction: TotalTransactions;
  transactions: Transaction[];
};

export const TransactionContext = createContext({} as TransactionContextType);

export const TransactionContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [categories, setCategories] = useState<TransctionCategory[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalTransaction, setTotalTransaction] = useState<TotalTransactions>({
    expense: 0,
    revenue: 0,
    total: 0,
  });
  console.log(transactions);

  const fetchCategories = async () => {
    const categoriesResposne =
      await transactionService.getTransctionCategories();
    setCategories(categoriesResposne);
  };

  const createTransaction = async (params: CreateTransactionInterface) => {
    await transactionService.createTransaction(params);
  };

  const fetchTransactions = useCallback(async () => {
    const transactionsResposne = await transactionService.getTransactions({
      page: 1,
      perPage: 10,
    });

    setTransactions(transactionsResposne.data);
    setTotalTransaction(transactionsResposne.totalTransactions);
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        categories,
        totalTransaction,
        transactions,
        fetchCategories,
        createTransaction,
        fetchTransactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => {
  return useContext(TransactionContext);
};
