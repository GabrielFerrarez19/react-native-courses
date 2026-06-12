import { dtMoneyApi } from "@/shared/api/dt-money";
import { CreateTransactionInterface } from "@/shared/interfaces/https/create-transaction-resquest";
import {
  GetTransactionsParams,
  GetTransactionsResponse,
} from "@/shared/interfaces/https/get-transaction";
import { TransctionCategory } from "@/shared/interfaces/https/transaction-category-response";
import qs from "qs";

export const getTransctionCategories = async (): Promise<
  TransctionCategory[]
> => {
  const { data } = await dtMoneyApi.get<TransctionCategory[]>(
    "/transaction/categories",
  );
  return data;
};

export const createTransaction = async (params: CreateTransactionInterface) => {
  await dtMoneyApi.post("/transaction", params);
};

export const getTransactions = async (
  params: GetTransactionsParams,
): Promise<GetTransactionsResponse> => {
  const { data } = await dtMoneyApi.get<GetTransactionsResponse>(
    "/transaction",
    {
      params,
      paramsSerializer: (p) => qs.stringify(p, { arrayFormat: "repeat" }),
    },
  );
  return data;
};

export const deleteTransaction = async (id: number) => {
  await dtMoneyApi.delete(`/transaction/${id}`);
};
