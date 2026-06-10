import { TransctionCategory } from "@/shared/interfaces/https/transaction-category-response";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import * as transactionService from "@/shared/services/dt-money/transaction.service";

export type TransactionContextType = {
  fetchCategories: () => Promise<void>;
  categories: TransctionCategory[];
};

export const TransactionContext = createContext({} as TransactionContextType);

export const TransactionContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [categories, setCategories] = useState<TransctionCategory[]>([]);
  console.log(categories);

  const fetchCategories = async () => {
    const categoriesResposne =
      await transactionService.getTransctionCategories();
    setCategories(categoriesResposne);
  };
  return (
    <TransactionContext.Provider value={{ categories, fetchCategories }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => {
  return useContext(TransactionContext);
};
