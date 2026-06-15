import { AppHeader } from "@/components/AppHeader";
import { ScrollView, View } from "react-native";
import { SummaryTransactionCard } from "./SummaryTransactionCard";
import { TransactionsType } from "@/shared/enums/transaction-types";
import { useTransactionContext } from "@/context/transactions.contect";
import { FilterInput } from "@/components/FilterInput";

export const ListHeader = () => {
  const { totalTransaction } = useTransactionContext();
  return (
    <>
      <AppHeader />
      <View className="h-[150px] w-full">
        <View className="h-[50] bg-background-primary" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="absolute pl-6 h-[141]"
        >
          <SummaryTransactionCard
            type={TransactionsType.EXPENSE}
            amount={totalTransaction.expense}
          />
          <SummaryTransactionCard
            type={TransactionsType.REVENUE}
            amount={totalTransaction.revenue}
          />
          <SummaryTransactionCard
            type={"total"}
            amount={totalTransaction.total}
          />
        </ScrollView>
      </View>
      <FilterInput />
    </>
  );
};
