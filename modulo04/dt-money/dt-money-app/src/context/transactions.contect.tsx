import { TransctionCategory } from "@/shared/interfaces/https/transaction-category-response";
import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import * as transactionService from "@/shared/services/dt-money/transaction.service";
import {
  CreateTransactionInterface,
  UpdateTransactionInterface,
} from "@/shared/interfaces/https/transaction-resquest";
import {
  TotalTransactions,
  Transaction,
} from "@/shared/interfaces/transaction";
import { Filters, Pagination } from "@/shared/interfaces/https/get-transaction";

interface Loadings {
  initial: boolean;
  refresh: boolean;
  loadMore: boolean;
}

interface handleLoagingParams {
  key: keyof Loadings;
  value: boolean;
}

interface HandleFiltersParams {
  key: keyof Filters;
  value: Date | Boolean | number;
}

export type TransactionContextType = {
  fetchCategories: () => Promise<void>;
  createTransaction: (params: CreateTransactionInterface) => Promise<void>;
  fetchTransactions: (params: number) => Promise<void>;
  updateTransactions: (params: UpdateTransactionInterface) => Promise<void>;
  refreshTransactions: () => Promise<void>;
  loadMoreTransaction: () => Promise<void>;
  handleLoadings: (params: handleLoagingParams) => void;
  setSearchText: (params: string) => void;
  handleFilters: (params: HandleFiltersParams) => void;
  handleCategoryFilter: (categoryId: number) => void;
  resetFilter: () => Promise<void>;
  categories: TransctionCategory[];
  totalTransaction: TotalTransactions;
  transactions: Transaction[];
  loadings: Loadings;
  pagination: Pagination;
  searchText: string;
  filters: Filters;
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
  const [searchText, setSearchText] = useState("");

  const [filters, setFilters] = useState<Filters>({
    categoryIds: {},
    typeId: undefined,
    from: undefined,
    to: undefined,
  });

  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    perPage: 15,
    totalRows: 0,
    totalPages: 0,
  });

  const [loadings, setLoadings] = useState<Loadings>({
    initial: false,
    refresh: false,
    loadMore: false,
  });

  const categoryIds = useMemo(() => {
    return Object.entries(filters.categoryIds)
      .filter(([_, value]) => value)
      .map(([key]) => Number(key));
  }, [filters.categoryIds]);

  const handleLoadings = ({ key, value }: handleLoagingParams) => {
    setLoadings((prev) => ({ ...prev, [key]: value }));
  };

  const fetchCategories = async () => {
    const categoriesResposne =
      await transactionService.getTransctionCategories();
    setCategories(categoriesResposne);
  };

  const createTransaction = async (params: CreateTransactionInterface) => {
    await transactionService.createTransaction(params);
    await refreshTransactions();
  };

  const fetchTransactions = useCallback(
    async (page = 1) => {
      const transactionsResposne = await transactionService.getTransactions({
        page: page,
        perPage: pagination.perPage,
        searchText,
        ...filters,
        categoryIds,
      });

      if (page === 1) {
        setTransactions(transactionsResposne.data);
      } else {
        setTransactions((prev) => [...prev, ...transactionsResposne.data]);
      }

      setTotalTransaction(transactionsResposne.totalTransactions);
      setPagination({
        ...pagination,
        page,
        totalRows: transactionsResposne.totalRows,
        totalPages: transactionsResposne.totalPages,
      });
    },
    [pagination, searchText, filters, categoryIds],
  );

  const updateTransactions = async (params: UpdateTransactionInterface) => {
    await transactionService.updateTransaction(params);
    await refreshTransactions();
  };

  const refreshTransactions = useCallback(async () => {
    const { page, perPage } = pagination;

    const transactionsResposne = await transactionService.getTransactions({
      page: 1,
      perPage: page * perPage,
      ...filters,
      categoryIds,
    });

    setTransactions(transactionsResposne.data);
    setTotalTransaction(transactionsResposne.totalTransactions);
    setPagination({
      ...pagination,
      totalPages: transactionsResposne.totalPages,
      totalRows: transactionsResposne.totalRows,
    });
  }, [pagination, filters, categoryIds]);

  const loadMoreTransaction = useCallback(async () => {
    if (loadings.loadMore || pagination.page >= pagination.totalPages) return;
    fetchTransactions(pagination.page + 1);
  }, [loadings.loadMore, pagination]);

  const handleFilters = (params: HandleFiltersParams) => {
    setFilters((prev) => ({ ...prev, [params.key]: params.value }));
  };

  const handleCategoryFilter = (categoryId: number) => {
    setFilters((prev) => ({
      ...prev,
      categoryIds: {
        ...prev.categoryIds,
        [categoryId]: !Boolean(prev.categoryIds[categoryId]),
      },
    }));
  };

  const resetFilter = useCallback(async () => {
    setFilters({
      categoryIds: {},
      from: undefined,
      to: undefined,
      typeId: undefined,
    });
    setSearchText("");
    const transactionsResposne = await transactionService.getTransactions({
      page: 1,
      perPage: pagination.perPage,
      searchText: "",
      categoryIds: [],
    });

    setTransactions(transactionsResposne.data);
    setTotalTransaction(transactionsResposne.totalTransactions);
    setPagination({
      ...pagination,
      page: 1,
      totalPages: transactionsResposne.totalPages,
      totalRows: transactionsResposne.totalRows,
    });
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        categories,
        totalTransaction,
        transactions,
        loadings,
        pagination,
        searchText,
        filters,
        fetchCategories,
        createTransaction,
        fetchTransactions,
        updateTransactions,
        refreshTransactions,
        loadMoreTransaction,
        handleLoadings,
        setSearchText,
        handleFilters,
        handleCategoryFilter,
        resetFilter,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => {
  return useContext(TransactionContext);
};
