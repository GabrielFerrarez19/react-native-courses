import { dtMoneyApi } from "@/shared/api/dt-money";
import { TransctionCategory } from "@/shared/interfaces/https/transaction-category-response";

export const getTransctionCategories = async (): Promise<
  TransctionCategory[]
> => {
  const { data } = await dtMoneyApi.get<TransctionCategory[]>(
    "/transaction/categories",
  );
  return data;
};
